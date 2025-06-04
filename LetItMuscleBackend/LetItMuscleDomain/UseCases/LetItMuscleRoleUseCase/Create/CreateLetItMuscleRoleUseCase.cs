using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.UseCases.Roles.Create;

public class CreateLetItMuscleRoleUseCase(IRepositoryFactory factory)
{  /*
    public async Task<ILetItMuscleRole> ExecuteAsync(string role)
    {
        await CheckBusinessRules(role);
        ILetItMuscleRole rol = await factory.LetItMuscleRoleRepository().CreateAsync(new LetItMuscleRoleEntity { Nom = role });
        await factory.SaveChangesAsync();
        return rol;
    }

    private async Task CheckBusinessRules(string role)
    {
        ArgumentNullException.ThrowIfNull(role);
        ArgumentNullException.ThrowIfNull(factory);
    }

    public bool IsAuthorized(string role)
    {
        return role.Equals(Roles.Admin) || 
               role.Equals(Roles.Coach) || 
               role.Equals(Roles.AdherentStandard) || 
               role.Equals(Roles.AdherentCoachingEnLigne);
    }  */
} 