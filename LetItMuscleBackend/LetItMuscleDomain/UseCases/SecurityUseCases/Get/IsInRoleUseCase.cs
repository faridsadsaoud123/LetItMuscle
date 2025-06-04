using LetItMuscleDomain.DataAdapters.Repository;

namespace LetItMuscleDomain.UseCases.SecurityUseCases.Get;

public class IsInRoleUseCase(IRepositoryFactory factory)
{
    public async Task<bool> ExecuteAsync(string email, string role)
    {
        await CheckBusinessRules(email);
        return await factory.LetItMuscleUserRepository().IsInRoleAsync(email, role);
    }

    private async Task CheckBusinessRules(string email)
    {
        ArgumentNullException.ThrowIfNull(email);
        ArgumentNullException.ThrowIfNull(factory);
        ArgumentNullException.ThrowIfNull(factory.LetItMuscleUserRepository());
    }
}