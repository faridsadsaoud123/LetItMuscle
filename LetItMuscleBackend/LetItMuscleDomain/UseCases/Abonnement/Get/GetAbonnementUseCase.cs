using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;

namespace LetItMuscleDomain.UseCases.Abonnement.Get;

public class GetAbonnementByIdUseCase(IRepositoryFactory repo)
{
    public async Task<Entities.Abonnement> ExecuteAsync(long idAbonnement)
    {
        await checkBusinessRules();
        Entities.Abonnement? abonnement = await repo.AbonnementRepository().FindAsync(idAbonnement);
        return abonnement;
    }
    private async Task checkBusinessRules()
    {
        ArgumentNullException.ThrowIfNull(repo);
        IAbonnementRepository abonnementRepository=repo.AbonnementRepository();
        ArgumentNullException.ThrowIfNull(abonnementRepository);
    }
}