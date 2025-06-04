using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions.AbonnementExceptions;
using LetItMuscleDomain.Exceptions.AdherentDansAbonnementExceptions;

namespace LetItMuscleDomain.UseCases.Abonnement.AdhérentDansAbonnement
{
    public class AddAdhérentDansAbonnementUseCase
    {
        private readonly IAbonnementRepository _abonnementRepository;
        private readonly IUtilisateurRepository _utilisateurRepository;

        public AddAdhérentDansAbonnementUseCase(IAbonnementRepository abonnementRepository, IUtilisateurRepository utilisateurRepository)
        {
            _abonnementRepository = abonnementRepository;
            _utilisateurRepository = utilisateurRepository;
        }

        public async Task ExecuteAsync(long abonnementId, long adhérentId)
        {
            // 1. Vérifier et appliquer les règles métier
            var (abonnement, adherent) = await CheckBusinessRules(abonnementId, adhérentId);

            // 2. Ajouter l’adhérent à l’abonnement
            abonnement.UtilisateursInscrits.Add(adherent);

            // 3. Sauvegarder les changements
            await _abonnementRepository.UpdateAsync(abonnement);
            await _abonnementRepository.SaveChangesAsync();
        }

        private async Task<(Entities.Abonnement, Utilisateur)> CheckBusinessRules(long abonnementId, long adhérentId)
        {
            // Vérifier si l’abonnement existe
            var abonnement = await _abonnementRepository.FindAsync(abonnementId);
            if (abonnement == null)
                throw new AbonnementNotFoundException($"L’abonnement avec l’ID {abonnementId} n’existe pas.");

            // Vérifier si l’adhérent existe
            var adherent = await _utilisateurRepository.FindUtilisateurByIdAsync(adhérentId);
            if (adherent == null)
                throw new UtilisateurNotFoundException($"L’adhérent avec l’ID {adhérentId} n’existe pas.");

            // Vérifier si l’adhérent est déjà inscrit
            if (abonnement.UtilisateursInscrits.Any(u => u.Id == adhérentId))
                throw new UtilisateurDejaInscritException($"L’adhérent avec l’ID {adhérentId} est déjà inscrit à cet abonnement.");

            // Vérifier si l’abonnement a encore des places disponibles
            if (abonnement.UtilisateursInscrits.Count >= abonnement.nbrAdherent)
                throw new AbonnementCompletException("Impossible d'ajouter un adhérent, l'abonnement est complet.");

            return (abonnement, adherent);
        }
    }
}
