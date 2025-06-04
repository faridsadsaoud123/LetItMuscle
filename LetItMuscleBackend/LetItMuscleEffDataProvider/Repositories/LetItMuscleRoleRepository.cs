using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Entities;
using LetItMuscleEffDataProvider.Data;
using LetItMuscleEffDataProvider.Entities;
using Microsoft.AspNetCore.Identity;

namespace LetItMuscleEffDataProvider.Repositories;

public class LetItMuscleRoleRepository(LetItMuscleDbContext letItMuscleDbContext, RoleManager<LetItMuscleRole> roleManager) : Repository<ILetItMuscleRole>(letItMuscleDbContext),ILetItMuscleRoleRepository
{
    public Task<ILetItMuscleRole?> GetByNomAsync(string nomRole)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ExistsAsync(string nomRole)
    {
        throw new NotImplementedException();
    }

    public async Task AddRoleAsync(string role)
    { 
        await roleManager.CreateAsync(new LetItMuscleRole(role));
    }
}