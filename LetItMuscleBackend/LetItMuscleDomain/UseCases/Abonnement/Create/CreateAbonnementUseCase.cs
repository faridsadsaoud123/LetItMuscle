using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions.AbonnementExceptions;

namespace LetItMuscleDomain.UseCases.Abonnement.Create;

public class CreateAbonnementUseCase(IRepositoryFactory abonnementRepository)
{
    public async Task<Entities.Abonnement> ExecuteAsync(string nom,double tarif,string duree,int nbrAdherent,string status)
    {
        var abonnement = new Entities.Abonnement
            { NomAbonnement = nom, tarif = tarif, duree = duree, nbrAdherent = nbrAdherent, StatusAbonnement = status };
        return await ExecuteAsync(abonnement);
    }

    public async Task<Entities.Abonnement> ExecuteAsync(Entities.Abonnement abonnement)
    {
        await CheckBusinessRules(abonnement);
        Entities.Abonnement ab = await abonnementRepository.AbonnementRepository().CreateAsync(abonnement);
        return ab;
    }

    private async Task CheckBusinessRules(Entities.Abonnement abonnement)
    {
        ArgumentNullException.ThrowIfNull(abonnement);
        ArgumentNullException.ThrowIfNull(abonnement.NomAbonnement);
        ArgumentNullException.ThrowIfNull(abonnement.StatusAbonnement);
        ArgumentNullException.ThrowIfNull(abonnement.duree);
        ArgumentNullException.ThrowIfNull(abonnement.nbrAdherent);
        ArgumentNullException.ThrowIfNull(abonnement.tarif);

        List<Entities.Abonnement> existe =
            await abonnementRepository.AbonnementRepository().FindByConditionAsync(a => a.NomAbonnement == abonnement.NomAbonnement);
        if (existe.Any())
        {
            throw new DuplicateNomAbonnement(abonnement.NomAbonnement + "existe deja");
        }
    }
}