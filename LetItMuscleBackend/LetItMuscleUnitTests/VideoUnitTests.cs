﻿using System;

using System.Linq.Expressions;

using System.Threading.Tasks;

using LetItMuscleDomain.DataAdapters.Repository;

using LetItMuscleDomain.Entities;

using LetItMuscleDomain.UseCases.VideoUseCases.Create;

using LetItMuscleDomain.Exceptions;

using Moq;

using NUnit.Framework;




namespace LetItMuscleUnitTests;




public class VideoUnitTests

{

    [SetUp]

    public void Setup()

    {

    }




    [Test]

    public async Task CreerVideoTest()

    {

        long id = 1;

        string nom = "Entraînement intensif";

        string description = "Une séance complète de HIIT";

        DateTime dateAjout = DateTime.UtcNow;




        Video videoSansId = new Video { NomVideo = nom, Description = description, DateAjout = dateAjout };

        var mock = new Mock<IRepositoryFactory>();




        var reponseFindByCondition = new List<Video>();

        mock.Setup(repo => repo.VideoRepository().FindByConditionAsync(It.IsAny<Expression<Func<Video, bool>>>()))

            .ReturnsAsync(reponseFindByCondition);




        Video videoCree = new Video { Id = id, NomVideo = nom, Description = description, DateAjout = dateAjout };

        mock.Setup(repo => repo.VideoRepository().CreateAsync(videoSansId)).ReturnsAsync(videoCree);




        var fauxVideoRepository = mock.Object;

        CreateVideoUseCase useCase = new CreateVideoUseCase(fauxVideoRepository);

        var videoTest = await useCase.ExecuteAsync(videoSansId);




        Assert.That(videoTest.Id, Is.EqualTo(videoCree.Id));

        Assert.That(videoTest.NomVideo, Is.EqualTo(videoCree.NomVideo));

        Assert.That(videoTest.Description, Is.EqualTo(videoCree.Description));

        Assert.That(videoTest.DateAjout, Is.EqualTo(videoCree.DateAjout));

    }




    [Test]

    public void CreerVideoInvalideTest()

    {

        var mock = new Mock<IRepositoryFactory>();

        var fauxVideoRepository = mock.Object;

        CreateVideoUseCase useCase = new CreateVideoUseCase(fauxVideoRepository);




        Assert.ThrowsAsync<ArgumentNullException>(async () => await useCase.ExecuteAsync(null));

    }

}