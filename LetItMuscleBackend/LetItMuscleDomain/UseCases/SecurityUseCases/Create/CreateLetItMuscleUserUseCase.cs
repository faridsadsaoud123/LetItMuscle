using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions.AdherentDansAbonnementExceptions;
using Microsoft.VisualBasic.CompilerServices;

namespace LetItMuscleDomain.UseCases.SecurityUseCases.Create;

public class CreateLetItMuscleUserUseCase(IRepositoryFactory factory)
{
    public async Task<ILetItMuscleUser?> ExecuteAsync(string email, string userName, string password, string role, Utilisateur ? user)
    {
        await CheckBusinessRules(userName, password, role, user);
        ILetItMuscleUser? userCree = await factory.LetItMuscleUserRepository().AddUserAsync(email, userName, password, role,user);
        await factory.SaveChangesAsync();
        return userCree;
    }
    private async Task CheckBusinessRules(string userName, string password, string role, Utilisateur ? user)
    {
        ArgumentNullException.ThrowIfNull(userName);
        ArgumentNullException.ThrowIfNull(password);
        ArgumentNullException.ThrowIfNull(role);
        ArgumentNullException.ThrowIfNull(factory);
        if (!new[] { 
                Entities.Roles.Admin, 
                Entities.Roles.Coach, 
                Entities.Roles.AdherentStandard, 
                Entities.Roles.AdherentCoachingEnLigne 
            }.Contains(role))
        {
            throw new ArgumentOutOfRangeException(nameof(role), "Rôle invalide !");
        }

        // On vérifie que l'étudiant existe
        if (user != null)
        {
            IUtilisateurRepository etudiantRepository = factory.UtilisateurRepository();
            ArgumentNullException.ThrowIfNull(etudiantRepository);
            List<Utilisateur> existe = await etudiantRepository.FindByConditionAsync(e => e.Id.Equals(user.Id));
            if (existe is { Count: 0 }) throw new UtilisateurNotFoundException(user.Id+" - non trouvé");
        }
    }
}