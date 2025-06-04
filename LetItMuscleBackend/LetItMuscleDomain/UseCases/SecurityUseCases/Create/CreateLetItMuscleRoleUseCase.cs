using LetItMuscleDomain.DataAdapters.Repository;

namespace LetItMuscleDomain.UseCases.SecurityUseCases.Create;

public class CreateLetItMuscleRoleUseCase(IRepositoryFactory factory)
{
    public async Task ExecuteAsync(string role)
    {
        await CheckBusinessRules(role);
        await factory.LetItMuscleRoleRepository().AddRoleAsync(role);
        await factory.SaveChangesAsync();
    }

    private async Task CheckBusinessRules(string role)
    {
        ArgumentNullException.ThrowIfNull(role);
        ArgumentNullException.ThrowIfNull(factory);
    }
}