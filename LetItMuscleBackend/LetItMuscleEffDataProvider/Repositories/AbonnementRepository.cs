using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Entities;
using LetItMuscleEffDataProvider.Data;
using Microsoft.EntityFrameworkCore;

namespace LetItMuscleEffDataProvider.Repositories;

public class AbonnementRepository(LetItMuscleDbContext context) : Repository<Abonnement>(context),IAbonnementRepository
{
    public async Task<List<Abonnement>> GetActiveAbonnementsAsync()
    {
        return await context.Abonnements
            .Where(a => a.StatusAbonnement == "Actif") // Filtrer les abonnements actifs
            .ToListAsync();
    }

    public  async Task<Abonnement?> GetByNomAsync(string nomAbonnement)
    {
        return await context.Abonnements
            .FirstOrDefaultAsync(a => a.NomAbonnement == nomAbonnement);
    }

    public async Task<bool> ExistsAsync(string nomAbonnement)
    {
        return await context.Abonnements
            .AnyAsync(a => a.NomAbonnement == nomAbonnement);
    }

    public async Task UpdateStatusAsync(long id, string nouveauStatus)
    {
        var abonnement = await context.Abonnements.FindAsync(id);
        if (abonnement != null)
        {
            abonnement.StatusAbonnement = nouveauStatus;
            await context.SaveChangesAsync();
        }
    }
    
    public async Task<List<Abonnement>> FindAllAsync()
    {
        return await context.Abonnements.ToListAsync();
    }
    public async Task<int> CountAsync()
    {
        return await context.Abonnements.CountAsync();
    }
}