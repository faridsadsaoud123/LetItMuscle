using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Entities;
using LetItMuscleEffDataProvider.Data;
using Microsoft.EntityFrameworkCore;

namespace LetItMuscleEffDataProvider.Repositories;

public class ReservationRepository(LetItMuscleDbContext context) : Repository<Reservation>(context),IReservationRepository
{
    public async Task<List<Reservation>> GetReservationsByUtilisateurIdAsync(long utilisateurId)
    {
        return await context.Reservations
            .Where(r => r.UtilisateurId == utilisateurId)
            .ToListAsync();
    }

    public async Task<List<Reservation>> GetReservationsByCoursIdAsync(long coursId)
    {
        return await context.Reservations
            .Where(r => r.CoursId == coursId)
            .ToListAsync();
    }

    public async Task<bool> ExistsAsync(long utilisateurId, long coursId)
    {
        return await context.Reservations
            .AnyAsync(r => r.UtilisateurId == utilisateurId && r.CoursId == coursId);
    }
}