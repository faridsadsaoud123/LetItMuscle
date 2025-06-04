using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;

namespace LetItMuscleDomain.UseCases.Abonnement.Get;

public class GetAbonnementsActifsUseCase
{
    private readonly IAbonnementRepository _abonnementRepository;

    public GetAbonnementsActifsUseCase(IRepositoryFactory repo)
    {
        _abonnementRepository = repo.AbonnementRepository();
    }

    public async Task<List<Entities.Abonnement>> ExecuteAsync()
    {
        return await _abonnementRepository.GetActiveAbonnementsAsync();
    }
}