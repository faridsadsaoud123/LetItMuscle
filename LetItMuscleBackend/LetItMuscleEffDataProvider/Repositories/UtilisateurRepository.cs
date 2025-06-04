using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Entities;
using LetItMuscleEffDataProvider.Data;
using Microsoft.EntityFrameworkCore;

namespace LetItMuscleEffDataProvider.Repositories;

public class UtilisateurRepository(LetItMuscleDbContext context) : Repository<Utilisateur>(context),IUtilisateurRepository
{
    public async Task<Utilisateur?> GetByEmailAsync(string email)
    {
        return await context.Utilisateurs
            .FirstOrDefaultAsync(u => u.email == email);
    }

   
    public async Task<List<Utilisateur>> GetAbonnesAsync()
    {
        return await context.Utilisateurs
            .Where(u => u.AbonnementInscrit != null) // Vérifie que l'utilisateur a un abonnement
            .ToListAsync();
    }

    public async Task<Utilisateur?> GetWithAbonnementAsync(long id)
    {
        return await context.Utilisateurs
            .Include(u => u.AbonnementInscrit) // Inclut les informations de l'abonnement
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<Utilisateur?> FindUtilisateurByIdAsync(long utilisateurId)
    {
        return await context.Utilisateurs.FindAsync(utilisateurId);
    }
    public async Task<int> CountAsync()
    {
        return await context.Utilisateurs.CountAsync();
    }

}