using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.DataAdapters;

public interface ILetItMuscleRoleRepository : IRepository<ILetItMuscleRole>
{
    // Récupérer un rôle par son nom
    Task<ILetItMuscleRole?> GetByNomAsync(string nomRole);

    // Vérifier si un rôle existe par son nom
    Task<bool> ExistsAsync(string nomRole);
    Task AddRoleAsync(string role);
}