using System.Linq.Expressions;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.UseCases.UtilisateursUseCase.Create;
using Moq;

namespace LetItMuscleUnitTests;

public class UtilisateurUnitTest
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public async Task CreerUtilisateurTest()
    {
        long id = 1;
        string nom = "John";
        string prenom = "Doe";
        string email = "john.doe@gmail.com";
        string password = "123456";
        string login = "john.doe@gmail.com";
        
        
        Utilisateur utilisateurSansId = new Utilisateur{nom = nom, prenom = prenom, email = email,};
        var mock = new Mock<IRepositoryFactory>();
        
        var reponseFindByCondition = new List <Utilisateur>();
        mock.Setup(repo=>repo.UtilisateurRepository().FindByConditionAsync(It.IsAny<Expression<Func<Utilisateur, bool>>>())).ReturnsAsync(reponseFindByCondition);
        
        Utilisateur utilisateurCree = new Utilisateur{Id = id,nom = nom, prenom = prenom, email = email};
        mock.Setup(repo => repo.UtilisateurRepository().CreateAsync(utilisateurSansId)).ReturnsAsync(utilisateurCree);
        var fauxUtilisateurRepository = mock.Object;
        CreateUtilisateurUseCase useCase = new CreateUtilisateurUseCase(fauxUtilisateurRepository);
        var utilisateurTest = await useCase.ExecuteAsync(utilisateurSansId);
        Assert.That(utilisateurTest.Id, Is.EqualTo(utilisateurCree.Id));
        Assert.That(utilisateurTest.nom, Is.EqualTo(utilisateurCree.nom));
        Assert.That(utilisateurTest.prenom, Is.EqualTo(utilisateurCree.prenom));
        Assert.That(utilisateurTest.email, Is.EqualTo(utilisateurCree.email));;
    }
}