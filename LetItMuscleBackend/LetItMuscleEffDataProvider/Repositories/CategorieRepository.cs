using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Entities;
using LetItMuscleEffDataProvider.Data;
using Microsoft.EntityFrameworkCore;

namespace LetItMuscleEffDataProvider.Repositories;

public class CategorieRepository(LetItMuscleDbContext context) : Repository<Categorie>(context),ICategorieRepository
{
    public async Task<Categorie?> GetByIdAsync(long id)
    {
        return await context.Categories.FindAsync(id);
    }

    public async Task<IEnumerable<Categorie>> GetAllAsync()
    {
        return await context.Categories.ToListAsync();
    }

    public async Task<Categorie> AddAsync(Categorie categorie)
    {
        await context.Categories.AddAsync(categorie);
        await context.SaveChangesAsync();
        return categorie;
    }
}