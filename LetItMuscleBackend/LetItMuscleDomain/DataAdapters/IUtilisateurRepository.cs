using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.DataAdapters;

public interface IUtilisateurRepository : IRepository<Utilisateur>
{
    // Récupérer un utilisateur par son email
    Task<Utilisateur?> GetByEmailAsync(string email);

    // Récupérer tous les utilisateurs abonnés
    Task<List<Utilisateur>> GetAbonnesAsync();

    // Récupérer un utilisateur avec ses abonnements (Eager Loading)
    Task<Utilisateur?> GetWithAbonnementAsync(long id);
    
    Task<Utilisateur?> FindUtilisateurByIdAsync(long utilisateurId);
    Task<int> CountAsync();

}