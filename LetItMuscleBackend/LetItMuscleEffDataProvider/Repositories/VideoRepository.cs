using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Entities;
using LetItMuscleEffDataProvider.Data;
using Microsoft.EntityFrameworkCore;

namespace LetItMuscleEffDataProvider.Repositories;

public class VideoRepository(LetItMuscleDbContext context) : Repository<Video>(context),IVideoRepository
{
    public async Task<Video?> GetByNomAsync(string nomVideo)
    {
        return await context.Videos
            .FirstOrDefaultAsync(v => v.NomVideo == nomVideo);
    }
    public async Task<bool> ExistsAsync(string nomVideo)
    {
        return await context.Videos
            .AnyAsync(v => v.NomVideo == nomVideo);
    }

    public async Task<List<Video>> GetByCategorieAsync(long idCategorie)
    {
        return await context.Videos
            .Where(v => v.Categorie.Id == idCategorie)
            .ToListAsync();
    }
    public async Task<List<Video>> GetRecentVideosAsync(int limit)
    {
        return await context.Videos
            .OrderByDescending(v => v.DateAjout) // Trier par date d'ajout (du plus récent au plus ancien)
            .Take(limit) // Limiter le nombre de résultats
            .ToListAsync();
    }
    public async Task<int> CountAsync()
    {
        return await context.Utilisateurs.CountAsync();
    }
   
}