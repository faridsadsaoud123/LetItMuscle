using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;

namespace LetItMuscleDomain.UseCases.Roles.Delete;

public class DeleteLetItMuscleRoleUseCase(IRepositoryFactory factory)
{
    public async Task ExecuteAsync(string role)
    {
        await CheckBusinessRules(role);
        
        var roleToDelete = await factory.LetItMuscleRoleRepository().GetByNomAsync(role);
        if (roleToDelete == null)
        {
            throw new RoleNotFoundException($"Le rôle '{role}' n'existe pas.");
        }

        await factory.LetItMuscleRoleRepository().DeleteAsync(roleToDelete);
        await factory.SaveChangesAsync();
    }

    private async Task CheckBusinessRules(string role)
    {
        ArgumentNullException.ThrowIfNull(role);
        ArgumentNullException.ThrowIfNull(factory);
    }
}