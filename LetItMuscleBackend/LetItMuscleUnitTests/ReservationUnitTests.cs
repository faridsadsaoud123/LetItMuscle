using Moq;
using NUnit.Framework;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.UseCases.Reservation.Annuler;
using System.Threading.Tasks;
using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Exceptions.ReservationExceptions;


namespace LetItMuscleUnitTests;

 [TestFixture]
    public class ReservationUnitTests
    {
        private Mock<IRepositoryFactory> _mockRepositoryFactory;
        private Mock<IReservationRepository> _mockReservationRepository;
        private AnnulerReservationUseCase _annulerReservationUseCase;

        [SetUp] 
        public void Setup()
        {
            _mockRepositoryFactory = new Mock<IRepositoryFactory>();
            _mockReservationRepository = new Mock<IReservationRepository>();

            // On configure le mock pour retourner le bon repository
            _mockRepositoryFactory.Setup(repo => repo.ReservationRepository()).Returns(_mockReservationRepository.Object);

            // On initialise le UseCase avec la factory mockée
            _annulerReservationUseCase = new AnnulerReservationUseCase(_mockRepositoryFactory.Object);
        }

        // ✅ 1️⃣ Test : Annulation réussie d’une réservation existante
        [Test]
        public async Task ExecuteAsync_Should_Delete_Reservation_When_Reservation_Exists()
        {
            // Arrange
            long reservationId = 1;
            var reservation = new Reservation { Id = reservationId };

            _mockReservationRepository.Setup(repo => repo.FindAsync(reservationId)).ReturnsAsync(reservation);
            _mockReservationRepository.Setup(repo => repo.DeleteAsync(reservation)).Returns(Task.CompletedTask);
            _mockReservationRepository.Setup(repo => repo.SaveChangesAsync()).Returns(Task.CompletedTask);

            // Act
            await _annulerReservationUseCase.ExecuteAsync(reservationId);

            // Assert
            _mockReservationRepository.Verify(repo => repo.FindAsync(reservationId), Times.Once);
            _mockReservationRepository.Verify(repo => repo.DeleteAsync(reservation), Times.Once);
            _mockReservationRepository.Verify(repo => repo.SaveChangesAsync(), Times.Once);
        }

        // ❌ 2️⃣ Test : Lever une exception si la réservation n’existe pas
        [Test]
        public void ExecuteAsync_Should_Throw_ReservationNotFoundException_When_Reservation_Does_Not_Exist()
        {
            // Arrange
            long reservationId = 99; // ID inexistant
            _mockReservationRepository.Setup(repo => repo.FindAsync(reservationId)).ReturnsAsync((Reservation)null);

            // Act & Assert
            Assert.ThrowsAsync<ReservationNotFoundException>(async () => await _annulerReservationUseCase.ExecuteAsync(reservationId));

            _mockReservationRepository.Verify(repo => repo.FindAsync(reservationId), Times.Once);
            _mockReservationRepository.Verify(repo => repo.DeleteAsync(It.IsAny<Reservation>()), Times.Never);
            _mockReservationRepository.Verify(repo => repo.SaveChangesAsync(), Times.Never);
        }
    }