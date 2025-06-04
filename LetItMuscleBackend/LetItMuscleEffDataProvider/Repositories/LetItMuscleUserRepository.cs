using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Entities;
using LetItMuscleEffDataProvider.Data;
using LetItMuscleEffDataProvider.Entities;
using Microsoft.AspNetCore.Identity;

namespace LetItMuscleEffDataProvider.Repositories;

public class LetItMuscleUserRepository(LetItMuscleDbContext context, UserManager<LetItMuscleUser> userManager, RoleManager<LetItMuscleRole> roleManager) 
    : Repository<ILetItMuscleUser>(context), ILetItMuscleUserRepository
{
    public async Task<ILetItMuscleUser?> AddUserAsync(string login, string email, string password, string role, Utilisateur? utilisateur)
    {
        try
        {

        // Création de l'utilisateur
        LetItMuscleUser user = new LetItMuscleUser { UserName = login, Email = email, Utilisateur = utilisateur };
        IdentityResult result = await userManager.CreateAsync(user, password);

        // Ajout du rôle si la création est réussie
        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(user, role);
        }
      
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception("Échec de création dans Identity: " + errors);
        }

        
        await context.SaveChangesAsync();
        return result.Succeeded ? user : null;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<ILetItMuscleUser?> FindByEmailAsync(string email)
    {
        return await userManager.FindByEmailAsync(email);
    }

    public async Task UpdateAsync(ILetItMuscleUser entity, string userName, string email)
    {
        LetItMuscleUser user = (LetItMuscleUser)entity;
        user.UserName = userName;
        user.Email = email;

        await userManager.UpdateAsync(user);
        await context.SaveChangesAsync();
    }

    public  async Task<int> DeleteAsync(long id)
    {
        // Vérifier si un utilisateur avec cet ID existe
        var utilisateur = await context.Utilisateurs.FindAsync(id);
        if (utilisateur == null)
        {
            return 0; // L'utilisateur n'existe pas
        }

        // Trouver l'utilisateur dans l'Identity framework
        var user = await userManager.FindByEmailAsync(utilisateur.email);
        if (user != null)
        {
            await userManager.DeleteAsync(user);
            await context.SaveChangesAsync();
            return 1;
        }
        
        return 0;
    }

    public async Task<bool> IsInRoleAsync(string email, string role)
    {
        var user = await userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return false;
        }

        return await userManager.IsInRoleAsync(user, role);
    }
}
