using System.Linq.Expressions;
using Moq;
using NUnit.Framework;
using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.UseCases.CoursUseCases;
using LetItMuscleDomain.UseCases.CoursUseCases.Delete;
using LetItMuscleDomain.UseCases.CoursUseCases.Get;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace LetItMuscleUnitTests;

[TestFixture]
public class CoursUnitTests
{
    private Mock<IRepositoryFactory> _mockRepositoryFactory;
    private Mock<ICoursRepository> _mockCoursRepository;
    private SupprimerCoursUseCase _supprimerCoursUseCase;
    private GetCoursUseCase _getCoursUseCase;
    private CreerCoursUseCase _creerCoursUseCase;

    [SetUp]
    public void Setup()
    {
        _mockRepositoryFactory = new Mock<IRepositoryFactory>();
        _mockCoursRepository = new Mock<ICoursRepository>();

        // Configuration du Mock
        _mockRepositoryFactory.Setup(repo => repo.CoursRepository()).Returns(_mockCoursRepository.Object);

        // Instanciation des UseCases
        _supprimerCoursUseCase = new SupprimerCoursUseCase(_mockRepositoryFactory.Object);
        _getCoursUseCase = new GetCoursUseCase(_mockRepositoryFactory.Object);
        _creerCoursUseCase = new CreerCoursUseCase(_mockRepositoryFactory.Object);
    }

    // Test : Supprimer un cours existant
    [Test]
    public async Task ExecuteAsync_Should_Delete_Cours_When_Cours_Exists()
    {
        long coursId = 1;
        var cours = new Cours { Id = coursId, Description = "Cours de Yoga", DateCours = DateTime.Now, NbrPlaces = 10 };

        _mockCoursRepository.Setup(repo => repo.FindAsync(coursId)).ReturnsAsync(cours);
        _mockCoursRepository.Setup(repo => repo.DeleteAsync(coursId)).Returns(Task.CompletedTask);
        _mockCoursRepository.Setup(repo => repo.SaveChangesAsync()).Returns(Task.CompletedTask);

        await _supprimerCoursUseCase.ExecuteAsync(coursId);

        _mockCoursRepository.Verify(repo => repo.FindAsync(coursId), Times.Once);
        _mockCoursRepository.Verify(repo => repo.DeleteAsync(coursId), Times.Once);
        _mockCoursRepository.Verify(repo => repo.SaveChangesAsync(), Times.Once);
    }

    // Test : Tenter de supprimer un cours inexistant
    [Test]
    public void SupprimerCours_ExecuteAsync_Should_Throw_CoursNotFoundException_When_Cours_Does_Not_Exist()
    {
        long coursId = 2;
        _mockCoursRepository.Setup(repo => repo.FindAsync(coursId)).ReturnsAsync((Cours)null);

        Assert.ThrowsAsync<CoursNotFoundException>(async () => await _supprimerCoursUseCase.ExecuteAsync(coursId));

        _mockCoursRepository.Verify(repo => repo.FindAsync(coursId), Times.Once);
        _mockCoursRepository.Verify(repo => repo.DeleteAsync(It.IsAny<long>()), Times.Never);
        _mockCoursRepository.Verify(repo => repo.SaveChangesAsync(), Times.Never);
    }

    // Test : Récupérer un cours existant par ID
    [Test]
    public async Task ExecuteAsync_Should_Return_Cours_When_Cours_Exists()
    {
        long coursId = 1;
        var cours = new Cours { Id = coursId, Description = "Cours de Yoga", DateCours = DateTime.Now, NbrPlaces = 15 };

        _mockCoursRepository.Setup(repo => repo.FindAsync(coursId)).ReturnsAsync(cours);

        var result = await _getCoursUseCase.ExecuteAsync(coursId);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Id, Is.EqualTo(coursId));
        Assert.That(result.Description, Is.EqualTo("Cours de Yoga"));
        _mockCoursRepository.Verify(repo => repo.FindAsync(coursId), Times.Once);
    }

    // Test : Récupérer un cours inexistant
    [Test]
    public void GetCours_ExecuteAsync_Should_Throw_CoursNotFoundException_When_Cours_Does_Not_Exist()
    {
        long coursId = 99;
        _mockCoursRepository.Setup(repo => repo.FindAsync(coursId)).ReturnsAsync((Cours)null);

        Assert.ThrowsAsync<CoursNotFoundException>(async () => await _getCoursUseCase.ExecuteAsync(coursId));

        _mockCoursRepository.Verify(repo => repo.FindAsync(coursId), Times.Once);
    }

    // Test : Récupérer tous les cours
    [Test]
    public async Task ExecuteAsync_Should_Return_All_Courses_When_Courses_Exist()
    {
        var coursList = new List<Cours>
        {
            new Cours { Id = 1, Description = "Cours de Yoga", DateCours = DateTime.Now, NbrPlaces = 15 },
            new Cours { Id = 2, Description = "Cours de Boxe", DateCours = DateTime.Now, NbrPlaces = 10 }
        };

        _mockCoursRepository.Setup(repo => repo.FindAllAsync()).ReturnsAsync(coursList);

        var result = await _getCoursUseCase.ExecuteAsync();

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Count, Is.EqualTo(2));
        Assert.That(result[0].Description, Is.EqualTo("Cours de Yoga"));
        Assert.That(result[1].Description, Is.EqualTo("Cours de Boxe"));
        _mockCoursRepository.Verify(repo => repo.FindAllAsync(), Times.Once);
    }

    // Test : Récupérer une liste vide quand aucun cours n'existe
    [Test]
    public async Task ExecuteAsync_Should_Return_Empty_List_When_No_Courses_Exist()
    {
        _mockCoursRepository.Setup(repo => repo.FindAllAsync()).ReturnsAsync(new List<Cours>());

        var result = await _getCoursUseCase.ExecuteAsync();

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Count, Is.EqualTo(0));
        _mockCoursRepository.Verify(repo => repo.FindAllAsync(), Times.Once);
    }

    // Test : Créer un cours avec des données valides
    [Test]
    public async Task ExecuteAsync_Should_Create_Cours_When_Valid_Data_Provided()
    {
        var description = "Cours de Musculation";
        var dateCours = DateTime.Now.AddDays(1);
        var nbrPlaces = 20;
        long coachId = 1;
        long categoryId = 2;

        var coursCree = new Cours { Id = 10, Description = description, DateCours = dateCours, NbrPlaces = nbrPlaces, coachId = coachId, categoryId = categoryId };

        _mockCoursRepository.Setup(repo => repo.AddAsync(It.IsAny<Cours>())).ReturnsAsync(coursCree);

        var result = await _creerCoursUseCase.ExecuteAsync(description, dateCours, nbrPlaces, coachId, categoryId);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Id, Is.EqualTo(10));
        Assert.That(result.Description, Is.EqualTo(description));
        Assert.That(result.DateCours, Is.EqualTo(dateCours));
        Assert.That(result.NbrPlaces, Is.EqualTo(nbrPlaces));
        Assert.That(result.coachId, Is.EqualTo(coachId));
        Assert.That(result.categoryId, Is.EqualTo(categoryId));

        _mockCoursRepository.Verify(repo => repo.AddAsync(It.IsAny<Cours>()), Times.Once);
    }


    // Test : Tenter de créer un cours avec des données invalides
    [Test]
    public void ExecuteAsync_Should_Throw_InvalidCoursException_When_Data_Is_Invalid()
    {
        long coachId = 1;
        long categoryId = 2;

        Assert.ThrowsAsync<InvalidCoursException>(async () => 
            await _creerCoursUseCase.ExecuteAsync("", DateTime.Now.AddDays(1), 20, coachId, categoryId));

        Assert.ThrowsAsync<InvalidCoursException>(async () => 
            await _creerCoursUseCase.ExecuteAsync("Cours", DateTime.Now.AddDays(1), -5, coachId, categoryId));
    }

}
