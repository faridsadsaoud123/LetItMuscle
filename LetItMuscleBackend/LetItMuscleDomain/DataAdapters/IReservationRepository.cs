using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.DataAdapters;

public interface IReservationRepository : IRepository<Reservation>
{
    // Récupérer toutes les réservations d'un utilisateur
    Task<List<Reservation>> GetReservationsByUtilisateurIdAsync(long utilisateurId);

    // Récupérer toutes les réservations d'un cours
    Task<List<Reservation>> GetReservationsByCoursIdAsync(long coursId);

    // Vérifier si un utilisateur a déjà réservé un cours
    Task<bool> ExistsAsync(long utilisateurId, long coursId);
}