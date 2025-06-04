using System.Threading.Tasks;
using LetItMuscleDomain.DataAdapters;
using Moq;
using NUnit.Framework;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.Exceptions.PiecesJointesExceptions;
using LetItMuscleDomain.UseCases.PiecesJointes;
using LetItMuscleDomain.UseCases.PiecesJointes.Ajouter;


namespace LetItMuscleUnitTests;

[TestFixture]
public class PiecesJointesUnitTests
{
    private Mock<IRepositoryFactory> _mockRepositoryFactory;
    private Mock<IMessageRepository> _mockMessageRepository;
    private Mock<IPieceJointeRepository> _mockPieceJointeRepository;
    private AjouterPieceJointeUseCase _ajouterPieceJointeUseCase;

    [SetUp]
    public void Setup()
    {
        _mockRepositoryFactory = new Mock<IRepositoryFactory>();
        _mockMessageRepository = new Mock<IMessageRepository>();
        _mockPieceJointeRepository = new Mock<IPieceJointeRepository>();

        _mockRepositoryFactory.Setup(repo => repo.MessageRepository()).Returns(_mockMessageRepository.Object);
        _mockRepositoryFactory.Setup(repo => repo.PieceJointeRepository()).Returns(_mockPieceJointeRepository.Object);

        _ajouterPieceJointeUseCase = new AjouterPieceJointeUseCase(_mockRepositoryFactory.Object);
    }

    // ✅ 1️⃣ Test : Ajouter une pièce jointe avec succès
    [Test]
    public async Task ExecuteAsync_Should_Add_PieceJointe_When_Valid_Input()
    {
        // Arrange
        long messageId = 1;
        string nomPiece = "image.png";
        var message = new Message { Id = messageId, Contenu = "Test message" };
        var pieceJointe = new PieceJointe { Id = 1, NomPiece = nomPiece };

        _mockMessageRepository.Setup(repo => repo.FindAsync(messageId)).ReturnsAsync(message);
        _mockPieceJointeRepository.Setup(repo => repo.CreateAsync(It.IsAny<PieceJointe>())).ReturnsAsync(pieceJointe);
        _mockPieceJointeRepository.Setup(repo => repo.SaveChangesAsync()).Returns(Task.CompletedTask);

        // Act
        var result = await _ajouterPieceJointeUseCase.ExecuteAsync(messageId, nomPiece);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.NomPiece, Is.EqualTo(nomPiece));
        _mockMessageRepository.Verify(repo => repo.FindAsync(messageId), Times.Once);
        _mockPieceJointeRepository.Verify(repo => repo.CreateAsync(It.IsAny<PieceJointe>()), Times.Once);
        _mockPieceJointeRepository.Verify(repo => repo.SaveChangesAsync(), Times.Once);
    }

    // ❌ 2️⃣ Test : Lancer une exception si le nom de la pièce jointe est vide
    [Test]
    public void ExecuteAsync_Should_Throw_InvalidPieceJointeException_When_NomPiece_Is_Empty()
    {
        // Arrange
        long messageId = 1;
        string nomPiece = "";

        // Act & Assert
        Assert.ThrowsAsync<InvalidPieceJointeException>(async () => await _ajouterPieceJointeUseCase.ExecuteAsync(messageId, nomPiece));
        _mockMessageRepository.Verify(repo => repo.FindAsync(It.IsAny<long>()), Times.Never);
        _mockPieceJointeRepository.Verify(repo => repo.CreateAsync(It.IsAny<PieceJointe>()), Times.Never);
    }

    // ❌ 3️⃣ Test : Lancer une exception si le message associé n'existe pas
    [Test]
    public void ExecuteAsync_Should_Throw_MessageNotFoundException_When_Message_Does_Not_Exist()
    {
        // Arrange
        long messageId = 99;
        string nomPiece = "image.png";

        _mockMessageRepository.Setup(repo => repo.FindAsync(messageId)).ReturnsAsync((Message)null);

        // Act & Assert
        Assert.ThrowsAsync<MessageNotFoundException>(async () => await _ajouterPieceJointeUseCase.ExecuteAsync(messageId, nomPiece));
        _mockPieceJointeRepository.Verify(repo => repo.CreateAsync(It.IsAny<PieceJointe>()), Times.Never);
    }
}