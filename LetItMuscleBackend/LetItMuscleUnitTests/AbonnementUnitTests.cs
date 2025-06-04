using System.Linq.Expressions;
using Moq;
using NUnit.Framework;
using System.Threading.Tasks;
using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions.AbonnementExceptions;
using LetItMuscleDomain.UseCases.Abonnement.Create;
using LetItMuscleDomain.UseCases.Abonnement.Delete;

namespace LetItMuscleUnitTests
{
    [TestFixture]
    public class AbonnementUnitTests
    {
        private Mock<IAbonnementRepository> _abonnementRepositoryMock;
        private SupprimerAbonnementUseCase _useCase;

        [SetUp]
        public void Setup()
        {
            // Création du mock pour IAbonnementRepository
            _abonnementRepositoryMock = new Mock<IAbonnementRepository>();

            // Injection du mock dans le UseCase
            _useCase = new SupprimerAbonnementUseCase(_abonnementRepositoryMock.Object);
        }

        [Test]
        public async Task SupprimerAbonnement_AbonnementExiste_EtAucunAdherent_SupprimeAbonnement()
        {
            // Arrange
            long abonnementId = 1;
            var abonnement = new Abonnement { Id = abonnementId, UtilisateursInscrits = new List<Utilisateur>() };

            // Simulation de la récupération de l’abonnement
            _abonnementRepositoryMock.Setup(repo => repo.FindAsync(abonnementId))
                .ReturnsAsync(abonnement);

            // Simulation de la suppression
            _abonnementRepositoryMock.Setup(repo => repo.DeleteAsync(abonnementId)).Returns(Task.CompletedTask);
            _abonnementRepositoryMock.Setup(repo => repo.SaveChangesAsync()).Returns(Task.CompletedTask);

            // Act
            await _useCase.ExecuteAsync(abonnementId);

            // Assert
            _abonnementRepositoryMock.Verify(repo => repo.FindAsync(abonnementId), Times.Once);
            _abonnementRepositoryMock.Verify(repo => repo.DeleteAsync(abonnementId), Times.Once);
            _abonnementRepositoryMock.Verify(repo => repo.SaveChangesAsync(), Times.Once);
        }

        [Test]
        public async Task CreerAbonnementUseCase()
        {
            long id = 1;
            string NomAbonnement = "abonnement 1";
            double tarif = 49;
            string duree = "un an";
            int nbrAdherent = 40;
            string StatusAbonnement = "actif";
            
            Abonnement abonnementSansId = new  Abonnement{NomAbonnement = NomAbonnement,tarif = tarif,duree = duree,nbrAdherent = nbrAdherent,StatusAbonnement = StatusAbonnement};
            
            var mock = new Mock<IRepositoryFactory>();
            
            
            var reponseFindByCondition = new List <Abonnement>();
            
            mock.Setup(repo=>repo.AbonnementRepository().FindByConditionAsync(It.IsAny<Expression<Func<Abonnement, bool>>>())).ReturnsAsync(reponseFindByCondition);

            Abonnement abonnementCree = new Abonnement { Id=id,NomAbonnement = NomAbonnement,tarif = tarif,duree = duree,nbrAdherent = nbrAdherent ,StatusAbonnement = StatusAbonnement};

            mock.Setup(repo => repo.AbonnementRepository().CreateAsync(abonnementSansId)).ReturnsAsync(abonnementCree);
            var fauxAbonnementsRepository = mock.Object;
            CreateAbonnementUseCase useCase = new CreateAbonnementUseCase(fauxAbonnementsRepository);
            var abonnementTest = await useCase.ExecuteAsync(abonnementSansId);
            // Vérification du résultat
            Assert.That(abonnementTest.Id, Is.EqualTo(abonnementCree.Id));
            Assert.That(abonnementTest.NomAbonnement, Is.EqualTo(abonnementCree.NomAbonnement));
            Assert.That(abonnementTest.tarif, Is.EqualTo(abonnementCree.tarif));
            Assert.That(abonnementTest.duree, Is.EqualTo(abonnementCree.duree));
            Assert.That(abonnementTest.nbrAdherent, Is.EqualTo(abonnementCree.nbrAdherent));
        }
        [Test]
        public void SupprimerAbonnement_AbonnementNexistePas_ThrowAbonnementNotFoundException()
        {
            // Arrange
            long abonnementId = 99;

            // Simulation d'un abonnement inexistant
            _abonnementRepositoryMock.Setup(repo => repo.FindAsync(abonnementId))
                .ReturnsAsync((Abonnement)null);

            // Act & Assert
            var exception = Assert.ThrowsAsync<AbonnementNotFoundException>(() => _useCase.ExecuteAsync(abonnementId));
            Assert.That(exception.Message, Is.EqualTo($"L’abonnement avec l’ID {abonnementId} n’existe pas."));

            _abonnementRepositoryMock.Verify(repo => repo.DeleteAsync(It.IsAny<long>()), Times.Never);
        }

        [Test]
        public void SupprimerAbonnement_AbonnementAvecAdherents_ThrowAbonnementNonVideException()
        {
            // Arrange
            long abonnementId = 2;
            var abonnement = new Abonnement
            {
                Id = abonnementId,
                UtilisateursInscrits = new List<Utilisateur> { new Utilisateur { Id = 1, nom = "Jean" } }
            };

            // Simulation d'un abonnement existant avec adhérents inscrits
            _abonnementRepositoryMock.Setup(repo => repo.FindAsync(abonnementId))
                .ReturnsAsync(abonnement);

            // Act & Assert
            var exception = Assert.ThrowsAsync<AbonnementNonVideException>(() => _useCase.ExecuteAsync(abonnementId));
            Assert.That(exception.Message, Is.EqualTo("Impossible de supprimer un abonnement ayant encore des adhérents inscrits."));

            _abonnementRepositoryMock.Verify(repo => repo.DeleteAsync(It.IsAny<long>()), Times.Never);
        }
    }
}
