using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.Util;

namespace LetItMuscleDomain.UseCases.UtilisateursUseCase.Create;

public class CreateUtilisateurUseCase(IRepositoryFactory repositoryFactory)
{
    public async Task<Utilisateur> ExecuteAsync(long id ,string nom, string prenom, string email,long numTel, string login)
    {
        var utilisateur = new Utilisateur{Id = id,nom = nom,prenom = prenom,email = email,numTel = numTel, login = login};
        return await ExecuteAsync(utilisateur);
    }

    public async Task<Utilisateur> ExecuteAsync(Utilisateur utilisateur)
    {
        await CheckBusinessRules(utilisateur);
        Utilisateur user = await repositoryFactory.UtilisateurRepository().CreateAsync(utilisateur);
        return user;
    }
    private async Task CheckBusinessRules(Utilisateur utilisateur)
    {
        ArgumentNullException.ThrowIfNull(utilisateur);
        ArgumentNullException.ThrowIfNull(utilisateur.nom);
        ArgumentNullException.ThrowIfNull(utilisateur.prenom);
        ArgumentNullException.ThrowIfNull(utilisateur.email);

        List<Utilisateur> users = await repositoryFactory.UtilisateurRepository()
            .FindByConditionAsync(u => u.email.Equals(utilisateur.email));
        if (users.Any())
        {
            throw new DuplicateUserException(utilisateur.nom + "existe deja");
        }
        
        if (!CheckEmail.IsValidEmail(utilisateur.email)) throw new InvalidEmailException(utilisateur.email + " - Email mal formé");
        
    }


    
}