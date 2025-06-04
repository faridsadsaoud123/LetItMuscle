using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.DataAdapters;

public interface ILetItMuscleUserRepository : IRepository<ILetItMuscleUser>
{
    Task<ILetItMuscleUser?> AddUserAsync(string login, string email, string password, string role, Utilisateur? utilisateur);
    Task<ILetItMuscleUser> FindByEmailAsync(string email);
    Task<bool> IsInRoleAsync(string email, string role);
}