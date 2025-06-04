using Moq;
using NUnit.Framework;
using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;
using LetItMuscleApplication.UseCases.CategorieUseCases;
using LetItMuscleDomain.UseCases.Categorie.Create;
using System.Threading.Tasks;
using System.Collections.Generic;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Exceptions.CategorieExceptions;

namespace LetItMuscleUnitTests;

[TestFixture]
public class CategorieUnitTests
{
    private Mock<IRepositoryFactory> _mockRepositoryFactory;
    private Mock<ICategorieRepository> _mockCategorieRepository;
    private CreerCategorie _creerCategorieUseCase;
    private DeleteCategorieUseCase _deleteCategorieUseCase;
    private GetCategorieUseCase _getCategorieUseCase;

    [SetUp]
    public void Setup()
    {
        _mockCategorieRepository = new Mock<ICategorieRepository>();
        _mockRepositoryFactory = new Mock<IRepositoryFactory>();

        _mockRepositoryFactory
            .Setup(factory => factory.CategorieRepository())
            .Returns(_mockCategorieRepository.Object);

        _creerCategorieUseCase = new CreerCategorie(_mockRepositoryFactory.Object);
        _deleteCategorieUseCase = new DeleteCategorieUseCase(_mockRepositoryFactory.Object);
        _getCategorieUseCase = new GetCategorieUseCase(_mockRepositoryFactory.Object);
    }



    // Test : Création d'une catégorie valide
    [Test]
    public async Task ExecuteAsync_Should_Create_Categorie_When_Valid_Name_Provided()
    {
        // Arrange
        var nom = "Musculation";
        var categorieCree = new Categorie { Id = 1, NomCategorie = nom };

        _mockCategorieRepository.Setup(repo => repo.AddAsync(It.IsAny<Categorie>())).ReturnsAsync(categorieCree);

        // Act
        var result = await _creerCategorieUseCase.ExecuteAsync(nom);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Id, Is.EqualTo(1));
        Assert.That(result.NomCategorie, Is.EqualTo(nom));

        _mockCategorieRepository.Verify(repo => repo.AddAsync(It.IsAny<Categorie>()), Times.Once);
    }

    // Test : Tentative de création avec un nom vide
    [Test]
    public void ExecuteAsync_Should_Throw_NomCategorieInvalideException_When_Name_Is_Empty()
    {
        Assert.ThrowsAsync<NomCategorieInvalideException>(async () => 
            await _creerCategorieUseCase.ExecuteAsync(""));
    }

    // Test : Suppression d'une catégorie existante
    [Test]
    public async Task ExecuteAsync_Should_Delete_Categorie_When_Categorie_Exists()
    {
        // Arrange
        long categorieId = 1;
        var categorie = new Categorie { Id = categorieId, NomCategorie = "Fitness" };

        _mockCategorieRepository.Setup(repo => repo.GetByIdAsync(categorieId)).ReturnsAsync(categorie);
        _mockCategorieRepository.Setup(repo => repo.DeleteAsync(categorieId)).Returns(Task.CompletedTask);

        // Act
        await _deleteCategorieUseCase.ExecuteAsync(categorieId);

        // Assert
        _mockCategorieRepository.Verify(repo => repo.GetByIdAsync(categorieId), Times.Once);
        _mockCategorieRepository.Verify(repo => repo.DeleteAsync(categorieId), Times.Once);
    }

    // Test : Suppression d'une catégorie inexistante
    [Test]
    public void ExecuteAsync_Should_Throw_CategorieNotFoundException_When_Categorie_Does_Not_Exist()
    {
        long categorieId = 99;
        _mockCategorieRepository.Setup(repo => repo.GetByIdAsync(categorieId)).ReturnsAsync((Categorie)null);

        Assert.ThrowsAsync<CategorieNotFoundException>(async () => 
            await _deleteCategorieUseCase.ExecuteAsync(categorieId));

        _mockCategorieRepository.Verify(repo => repo.GetByIdAsync(categorieId), Times.Once);
    }

    // Test : Récupération de toutes les catégories existantes
    [Test]
    public async Task ExecuteAsync_Should_Return_All_Categories_When_Categories_Exist()
    {
        var categories = new List<Categorie>
        {
            new Categorie { Id = 1, NomCategorie = "Yoga" },
            new Categorie { Id = 2, NomCategorie = "Crossfit" }
        };

        _mockCategorieRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(categories);

        var result = await _getCategorieUseCase.ExecuteAsync();

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Count(), Is.EqualTo(2));
        Assert.That(result, Does.Contain(categories[0]));
        Assert.That(result, Does.Contain(categories[1]));

        _mockCategorieRepository.Verify(repo => repo.GetAllAsync(), Times.Once);
    }

    // Test : Récupération d'une liste vide si aucune catégorie n'existe
    [Test]
    public async Task ExecuteAsync_Should_Return_Empty_List_When_No_Categories_Exist()
    {
        _mockCategorieRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(new List<Categorie>());

        var result = await _getCategorieUseCase.ExecuteAsync();

        Assert.That(result, Is.Not.Null);
        Assert.That(result, Is.Empty);

        _mockCategorieRepository.Verify(repo => repo.GetAllAsync(), Times.Once);
    }
}
