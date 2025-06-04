using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.Exceptions.ReservationExceptions;

namespace LetItMuscleDomain.UseCases.Reservation.Annuler;

public class AnnulerReservationUseCase
{
    private readonly IRepositoryFactory _repositoryFactory;

    public AnnulerReservationUseCase(IRepositoryFactory repositoryFactory)
    {
        _repositoryFactory = repositoryFactory;
    }

    public async Task ExecuteAsync(long reservationId)
    {
        // 1️⃣ Vérifier si la réservation existe
        var reservation = await _repositoryFactory.ReservationRepository().FindAsync(reservationId);
        if (reservation == null)
            throw new ReservationNotFoundException($"La réservation avec l'ID {reservationId} n'existe pas.");

        // 2️⃣ Supprimer la réservation
        await _repositoryFactory.ReservationRepository().DeleteAsync(reservation);

        // 3️⃣ Sauvegarder les modifications
        await _repositoryFactory.ReservationRepository().SaveChangesAsync();
    }
}