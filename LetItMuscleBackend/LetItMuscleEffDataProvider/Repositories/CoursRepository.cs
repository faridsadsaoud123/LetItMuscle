using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Entities;
using LetItMuscleEffDataProvider.Data;
using Microsoft.EntityFrameworkCore;

namespace LetItMuscleEffDataProvider.Repositories;

// Dépôt pour la gestion des cours collectifs
public class CoursRepository(LetItMuscleDbContext context) : Repository<Cours>(context), ICoursRepository
{
    // Ajoute un nouveau cours dans la base de données
    public async Task<Cours> AddAsync(Cours cours)
    {
        await context.Cours.AddAsync(cours);
        await context.SaveChangesAsync();
        return cours;
    }

    // Inscrit un adhérent à un cours donné et décrémente le nombre de places disponibles
    public async Task<Cours?> AddAdherentAsync(long coursId, long adherentId)
    {
        var cours = await context.Cours
            .Include(c => c.adherentsInscrits) // Inclut la liste des adhérents déjà inscrits
            .FirstOrDefaultAsync(c => c.Id == coursId);

        if (cours == null) return null;

        var adherent = await context.Utilisateurs.FindAsync(adherentId);
        if (adherent == null) return null;

        cours.adherentsInscrits.Add(adherent);
        cours.NbrPlaces--; // Mise à jour du nombre de places disponibles
        await context.SaveChangesAsync();

        return cours;
    }

    // Inscrit plusieurs adhérents à un cours (utile pour des ajouts en masse)
    public async Task<Cours?> AddAdherentAsync(long coursId, long[] utilisateurIds)
    {
        var cours = await context.Cours
            .Include(c => c.adherentsInscrits)
            .FirstOrDefaultAsync(c => c.Id == coursId);

        if (cours == null) return null;

        var adherents = await context.Utilisateurs
            .Where(u => utilisateurIds.Contains(u.Id))
            .ToListAsync();

        if (adherents.Count == 0) return null;

        foreach (var adherent in adherents)
        {
            if (!cours.adherentsInscrits.Contains(adherent))
            {
                cours.adherentsInscrits.Add(adherent);
                // On pourrait aussi décrémenter les places ici si nécessaire
            }
        }

        await context.SaveChangesAsync();
        return cours;
    }

    // Retourne le nombre total de cours enregistrés
    public async Task<int> CountAsync()
    {
        return await context.Cours.CountAsync();
    }

    // Récupère la liste des cours réservés par un adhérent (avec coach et catégorie chargés)
    public async Task<List<Cours>> GetCoursReservesParAdherentAsync(long adherentId)
    {
        return await context.Cours
            .Include(c => c.Coach)
            .Include(c => c.categorie)
            .Where(c => c.adherentsInscrits.Any(a => a.Id == adherentId))
            .ToListAsync();
    }
    public async Task<Cours?> FindByIdWithAdherentsAsync(long coursId)
    {
        return await context.Cours
            .Include(c => c.adherentsInscrits)
            .FirstOrDefaultAsync(c => c.Id == coursId);
    }

}
