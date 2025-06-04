using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;

namespace LetItMuscleApplication.UseCases.UtilisateurUseCases.Delete;

public class SupprimerUtilisateurUseCase(IRepositoryFactory repositoryFactory)
{
    

    public async Task ExecuteAsync(long id)
    {
        // Vérifier si l'utilisateur existe
        var utilisateur = await repositoryFactory.UtilisateurRepository().FindAsync(id);
        if (utilisateur == null)
        {
            throw new NotFoundException($"Utilisateur avec ID {id} non trouvé.");
        }

        // Vérifier si l'utilisateur a un abonnement actif
        /*if (utilisateur.AbonnementInscrit != null)
        {
            throw new UserDeletionException($"Impossible de supprimer l'utilisateur {id} car il a un abonnement actif.");
        }*/

        // Supprimer l'utilisateur
        await repositoryFactory.UtilisateurRepository().DeleteAsync(utilisateur);
    }
}