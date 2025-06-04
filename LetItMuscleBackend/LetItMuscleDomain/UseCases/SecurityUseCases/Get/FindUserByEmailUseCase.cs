using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.UseCases.SecurityUseCases.Get;

public class FindUserByEmailUseCase(IRepositoryFactory factory)
{
    public async Task<ILetItMuscleUser?> ExecuteAsync(string email)
    {
        await CheckBusinessRules(email);
        ILetItMuscleUser? user = await factory.LetItMuscleUserRepository().FindByEmailAsync(email);
        return user;
    }

    private async Task CheckBusinessRules(string email)
    {
        ArgumentNullException.ThrowIfNull(email);
        ArgumentNullException.ThrowIfNull(factory);
        ArgumentNullException.ThrowIfNull(factory.LetItMuscleUserRepository());
    }
}