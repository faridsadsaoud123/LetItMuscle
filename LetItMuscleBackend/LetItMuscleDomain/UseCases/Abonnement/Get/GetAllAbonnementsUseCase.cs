using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.UseCases.Abonnement.Get;

public class GetAllAbonnementsUseCase
{
    private readonly IAbonnementRepository _abonnementRepository;

    public GetAllAbonnementsUseCase(IRepositoryFactory repo)
    {
        _abonnementRepository = repo.AbonnementRepository();
    }

    public async Task<List<Entities.Abonnement>> ExecuteAsync()
    {
        return await _abonnementRepository.FindAllAsync();
    }
}