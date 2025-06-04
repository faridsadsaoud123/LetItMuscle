using Moq;
using NUnit.Framework;
using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.UseCases.Message.Envoie;
using System.Threading.Tasks;
using LetItMuscleDomain.DataAdapters.Repository;

namespace LetItMuscleUnitTests;

[TestFixture]
public class MessageUnitTests
{
    private Mock<IRepositoryFactory> _mockRepositoryFactory;
    private Mock<IUtilisateurRepository> _mockUtilisateurRepository;
    private Mock<IMessageRepository> _mockMessageRepository;
    private EnvoyerMessageUseCase _envoyerMessageUseCase;

    [SetUp]
    public void Setup()
    {
        _mockRepositoryFactory = new Mock<IRepositoryFactory>();
        _mockUtilisateurRepository = new Mock<IUtilisateurRepository>();
        _mockMessageRepository = new Mock<IMessageRepository>();

        _mockRepositoryFactory.Setup(repo => repo.UtilisateurRepository()).Returns(_mockUtilisateurRepository.Object);
        _mockRepositoryFactory.Setup(repo => repo.MessageRepository()).Returns(_mockMessageRepository.Object);

        _envoyerMessageUseCase = new EnvoyerMessageUseCase(_mockRepositoryFactory.Object);
    }

    // ✅ 1️⃣ Test : Envoi de message valide entre un adhérent et un coach
    [Test]
    public async Task ExecuteAsync_Should_Send_Message_When_Valid_Data_Provided()
    {
        // Arrange
        long senderId = 1;
        long receiverId = 2;
        string contenu = "Bonjour Coach, j'ai une question.";

        var sender = new Utilisateur { Id = senderId, Role = "Adherent", AbonnementInscrit = new Abonnement() };
        var receiver = new Utilisateur { Id = receiverId, Role = "Coach" };
        
        _mockUtilisateurRepository.Setup(repo => repo.FindAsync(senderId)).ReturnsAsync(sender);
        _mockUtilisateurRepository.Setup(repo => repo.FindAsync(receiverId)).ReturnsAsync(receiver);
        _mockMessageRepository.Setup(repo => repo.CreateAsync(It.IsAny<Message>()))
            .ReturnsAsync((Message message) => message);

        // Act
        await _envoyerMessageUseCase.ExecuteAsync(senderId, receiverId, contenu);

        // Assert
        _mockUtilisateurRepository.Verify(repo => repo.FindAsync(senderId), Times.Once);
        _mockUtilisateurRepository.Verify(repo => repo.FindAsync(receiverId), Times.Once);
        _mockMessageRepository.Verify(repo => repo.CreateAsync(It.IsAny<Message>()), Times.Once);
    }

    // ❌ 2️⃣ Test : Tentative d'envoi d'un message vide
    [Test]
    public void ExecuteAsync_Should_Throw_MessageValidationException_When_Message_Is_Empty()
    {
        long senderId = 1;
        long receiverId = 2;
        string contenu = ""; // Message vide

        Assert.ThrowsAsync<MessageValidationException>(async () =>
            await _envoyerMessageUseCase.ExecuteAsync(senderId, receiverId, contenu));
    }

    // ❌ 3️⃣ Test : Tentative d'envoi par un expéditeur inexistant
    [Test]
    public void ExecuteAsync_Should_Throw_NotFoundException_When_Sender_Does_Not_Exist()
    {
        long senderId = 99;
        long receiverId = 2;
        string contenu = "Bonjour Coach !";

        _mockUtilisateurRepository.Setup(repo => repo.FindAsync(senderId)).ReturnsAsync((Utilisateur)null);

        Assert.ThrowsAsync<NotFoundException>(async () =>
            await _envoyerMessageUseCase.ExecuteAsync(senderId, receiverId, contenu));

        _mockUtilisateurRepository.Verify(repo => repo.FindAsync(senderId), Times.Once);
    }

    // ❌ 4️⃣ Test : Tentative d'envoi à un destinataire inexistant
    [Test]
    public void ExecuteAsync_Should_Throw_NotFoundException_When_Receiver_Does_Not_Exist()
    {
        long senderId = 1;
        long receiverId = 99;
        string contenu = "Bonjour !";

        var sender = new Utilisateur { Id = senderId, Role = "Adherent", AbonnementInscrit = new Abonnement() };
        _mockUtilisateurRepository.Setup(repo => repo.FindAsync(senderId)).ReturnsAsync(sender);
        _mockUtilisateurRepository.Setup(repo => repo.FindAsync(receiverId)).ReturnsAsync((Utilisateur)null);

        Assert.ThrowsAsync<NotFoundException>(async () =>
            await _envoyerMessageUseCase.ExecuteAsync(senderId, receiverId, contenu));

        _mockUtilisateurRepository.Verify(repo => repo.FindAsync(senderId), Times.Once);
        _mockUtilisateurRepository.Verify(repo => repo.FindAsync(receiverId), Times.Once);
    }

    // ❌ 5️⃣ Test : Tentative d'envoi par un utilisateur non abonné au coaching
    [Test]
    public void ExecuteAsync_Should_Throw_MessageValidationException_When_Sender_Has_No_Subscription()
    {
        long senderId = 1;
        long receiverId = 2;
        string contenu = "Bonjour Coach !";

        var sender = new Utilisateur { Id = senderId, Role = "Adherent", AbonnementInscrit = null }; // Pas d'abonnement
        var receiver = new Utilisateur { Id = receiverId, Role = "Coach" };

        _mockUtilisateurRepository.Setup(repo => repo.FindAsync(senderId)).ReturnsAsync(sender);
        _mockUtilisateurRepository.Setup(repo => repo.FindAsync(receiverId)).ReturnsAsync(receiver);

        Assert.ThrowsAsync<MessageValidationException>(async () =>
            await _envoyerMessageUseCase.ExecuteAsync(senderId, receiverId, contenu));

        _mockUtilisateurRepository.Verify(repo => repo.FindAsync(senderId), Times.Once);
        _mockUtilisateurRepository.Verify(repo => repo.FindAsync(receiverId), Times.Once);
    }

    // ❌ 6️⃣ Test : Tentative d'envoi à un destinataire qui n'est pas un coach
    [Test]
    public void ExecuteAsync_Should_Throw_MessageValidationException_When_Receiver_Is_Not_A_Coach()
    {
        long senderId = 1;
        long receiverId = 3;
        string contenu = "Salut !";

        var sender = new Utilisateur { Id = senderId, Role = "Adherent", AbonnementInscrit = new Abonnement() };
        var receiver = new Utilisateur { Id = receiverId, Role = "Adherent" }; // Pas un coach

        _mockUtilisateurRepository.Setup(repo => repo.FindAsync(senderId)).ReturnsAsync(sender);
        _mockUtilisateurRepository.Setup(repo => repo.FindAsync(receiverId)).ReturnsAsync(receiver);

        Assert.ThrowsAsync<MessageValidationException>(async () =>
            await _envoyerMessageUseCase.ExecuteAsync(senderId, receiverId, contenu));

        _mockUtilisateurRepository.Verify(repo => repo.FindAsync(senderId), Times.Once);
        _mockUtilisateurRepository.Verify(repo => repo.FindAsync(receiverId), Times.Once);
    }
}
