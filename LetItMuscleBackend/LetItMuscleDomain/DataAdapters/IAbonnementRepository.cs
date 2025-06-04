using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.DataAdapters;

public interface IAbonnementRepository : IRepository<Abonnement>
{
    // Récupérer tous les abonnements actifs
    Task<List<Abonnement>> GetActiveAbonnementsAsync();

    // Récupérer un abonnement par son nom
    Task<Abonnement?> GetByNomAsync(string nomAbonnement);

    // Vérifier si un abonnement existe par son nom
    Task<bool> ExistsAsync(string nomAbonnement);

    // Mettre à jour le statut d'un abonnement
    Task UpdateStatusAsync(long id, string nouveauStatus);
    
    Task<List<Abonnement>> FindAllAsync(); 
    Task<int> CountAsync();

}