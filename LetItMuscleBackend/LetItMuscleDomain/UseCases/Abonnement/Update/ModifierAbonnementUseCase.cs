using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Exceptions.AbonnementExceptions;

namespace LetItMuscleDomain.UseCases.Abonnement.Update
{
    public class ModifierAbonnementUseCase
    {
        private readonly IAbonnementRepository _abonnementRepository;

        public ModifierAbonnementUseCase(IAbonnementRepository abonnementRepository)
        {
            _abonnementRepository = abonnementRepository;
        }

        public async Task<Entities.Abonnement> ExecuteAsync(long abonnementId, string? nom, double? tarif, string? duree, int? nbrAdherent, string? status, string? optionsAbonnement)
        {
            // 1. Vérifier si l’abonnement existe
            var abonnement = await _abonnementRepository.FindAsync(abonnementId);
            if (abonnement == null)
                throw new AbonnementNotFoundException($"L’abonnement avec l’ID {abonnementId} n’existe pas.");

            // 2. Vérifier les règles métier
            await CheckBusinessRules(abonnementId, nom);

            // 3. Mettre à jour les champs modifiés
            if (!string.IsNullOrWhiteSpace(nom)) abonnement.NomAbonnement = nom;
            if (tarif.HasValue) abonnement.tarif = tarif.Value;
            if (!string.IsNullOrWhiteSpace(duree)) abonnement.duree = duree;
            if (nbrAdherent.HasValue) abonnement.nbrAdherent = nbrAdherent.Value;
            if (!string.IsNullOrWhiteSpace(status)) abonnement.StatusAbonnement = status;
            if (!string.IsNullOrWhiteSpace(optionsAbonnement)) abonnement.OptionsAbonnement = optionsAbonnement;

            // 4. Enregistrer les modifications
            await _abonnementRepository.UpdateAsync(abonnement);
            await _abonnementRepository.SaveChangesAsync();

            return abonnement;
        }

        private async Task CheckBusinessRules(long abonnementId, string? nom)
        {
            ArgumentNullException.ThrowIfNull(_abonnementRepository);

            if (!string.IsNullOrWhiteSpace(nom))
            {
                var existingAbonnement = await _abonnementRepository.FindByConditionAsync(a => a.NomAbonnement == nom);
                if (existingAbonnement.Any() && existingAbonnement.First().Id != abonnementId)
                    throw new DuplicateNomAbonnement($"Un abonnement avec le nom '{nom}' existe déjà.");
            }
        }
    }
}
