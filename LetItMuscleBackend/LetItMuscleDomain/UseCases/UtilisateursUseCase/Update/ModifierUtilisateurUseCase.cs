using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;
using System;

namespace LetItMuscleApplication.UseCases.UtilisateurUseCases.Update;

public class ModifierUtilisateurUseCase(IRepositoryFactory repositoryFactory)
{
    public async Task ExecuteAsync(
        long id,
        string nom,
        string prenom,
        string email,
        long numTel,
        string role,
        DateTime dateDeNaissance,
        long? abonnementInscritId
    )
    {
        var utilisateur = await repositoryFactory.UtilisateurRepository().FindAsync(id);
        if (utilisateur == null)
            throw new NotFoundException($"Utilisateur avec ID {id} non trouvé.");

        if (string.IsNullOrWhiteSpace(email) || !email.Contains("@"))
            throw new InvalidUserException("L'email fourni est invalide.");

        // Mise à jour des données
        utilisateur.nom = nom;
        utilisateur.prenom = prenom;
        utilisateur.email = email;
        utilisateur.numTel = numTel;
        utilisateur.Role = role;
        utilisateur.DateDeNaissance = dateDeNaissance;
        utilisateur.AbonnementInscritId = abonnementInscritId;

        await repositoryFactory.UtilisateurRepository().UpdateAsync(utilisateur);
        await repositoryFactory.SaveChangesAsync(); // Assure la persistance
    }
}