using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;

namespace LetItMuscleDomain.UseCases.Roles.Get;

public class GetLetItMuscleRoleUseCase(IRepositoryFactory factory)
{
    public async Task<ILetItMuscleRole> ExecuteAsync(string role)
    {
        await CheckBusinessRules(role);
        
        var foundRole = await factory.LetItMuscleRoleRepository().GetByNomAsync(role);
        if (foundRole == null)
        {
            throw new RoleNotFoundException($"Le rôle '{role}' n'existe pas.");
        }

        return foundRole;
    }

    private async Task CheckBusinessRules(string role)
    {
        ArgumentNullException.ThrowIfNull(role);
        ArgumentNullException.ThrowIfNull(factory);
    }
}