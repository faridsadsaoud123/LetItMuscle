using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.Dtos;

public class ReservationDto
{
    public long Id { get; set; }
    public long UtilisateurId { get; set; } 
    public long CoursId { get; set; }
    public DateTime DateReservation { get; set; } = DateTime.UtcNow;

    public ReservationDto ToDto(Reservation reservation)
    {
        Id = reservation.Id;
        UtilisateurId = reservation.UtilisateurId;
        CoursId = reservation.CoursId;
        DateReservation = reservation.DateReservation;
        return this;
    }

    public Reservation ToDto()
    {
        return new Reservation { Id = this.Id, UtilisateurId = this.UtilisateurId, CoursId = this.CoursId, };
    }
}