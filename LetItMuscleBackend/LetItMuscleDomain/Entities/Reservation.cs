namespace LetItMuscleDomain.Entities;

public class Reservation
{
    public long Id { get; set; }
    public long UtilisateurId { get; set; }  // ID de l'utilisateur qui réserve
    public long CoursId { get; set; }        // ID du cours réservé
    public DateTime DateReservation { get; set; } = DateTime.UtcNow; // Date de la réservation

    // 🔗 Relations
    public Utilisateur Utilisateur { get; set; } = null!; // L'utilisateur qui a réservé
    public Cours Cours { get; set; } = null!;             // Le cours réservé

    public override string ToString()
    {
        return $"Reservation {Id} - Utilisateur {UtilisateurId} - Cours {CoursId} - Date {DateReservation}";
    }
}