using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions.AbonnementExceptions;

namespace LetItMuscleDomain.UseCases.Abonnement.Delete
{
    public class SupprimerAbonnementUseCase
    {
        private readonly IAbonnementRepository _abonnementRepository;

        public SupprimerAbonnementUseCase(IAbonnementRepository abonnementRepository)
        {
            _abonnementRepository = abonnementRepository;
        }

        public async Task ExecuteAsync(long abonnementId)
        {
            // 1. Vérifier si l’abonnement existe
            var abonnement = await _abonnementRepository.FindAsync(abonnementId);
            if (abonnement == null)
                throw new AbonnementNotFoundException($"L’abonnement avec l’ID {abonnementId} n’existe pas.");

            // 2. Vérifier s'il y a encore des adhérents inscrits
            if (abonnement.UtilisateursInscrits.Any())
                throw new AbonnementNonVideException("Impossible de supprimer un abonnement ayant encore des adhérents inscrits.");

            // 3. Supprimer l’abonnement
            await _abonnementRepository.DeleteAsync(abonnementId);
            
            // 4. Sauvegarder les changements
            await _abonnementRepository.SaveChangesAsync();
        }
    }
}