using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;

namespace LetItMuscleApplication.UseCases.UtilisateurUseCases.Get;

public class GetUtilisateurUseCase(IRepositoryFactory repositoryFactory)
{
    

    // Récupérer un utilisateur par ID
    public async Task<Utilisateur> GetByIdAsync(long id)
    {
        var utilisateur = await repositoryFactory.UtilisateurRepository().FindAsync(id);
        if (utilisateur == null)
        {
            throw new NotFoundException($"Utilisateur avec ID {id} non trouvé.");
        }
        return utilisateur;
    }
    
    // Récupérer un utilisateur par Email
    public async Task<Utilisateur> GetByEmailAsync(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) throw new ArgumentException("L'email ne peut pas être vide.");
    
        var utilisateurs = await repositoryFactory.UtilisateurRepository()
            .FindByConditionAsync(u => u.email.Equals(email));

        if (utilisateurs == null || utilisateurs.Count == 0)
        {
            throw new NotFoundException($"Aucun utilisateur trouvé avec l'email {email}");
        }

        return utilisateurs.First();
    }


    // Récupérer tous les utilisateurs
    public async Task<List<Utilisateur>> GetAllAsync()
    {
        return await repositoryFactory.UtilisateurRepository().FindAllAsync();
    }
}