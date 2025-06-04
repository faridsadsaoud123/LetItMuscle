
using LetItMuscleDomain.DataAdapters.Repository;

namespace LetItMuscleDomain.JeuxDeDonnees;

public abstract class BdBuilder(IRepositoryFactory repositoryFactory)
{
    public async Task BuildLetItMuscleBdAsync()
    {
        Console.WriteLine("Suppression et recréation de la BD");
        await RegenererBdAsync();

        Console.WriteLine("Création des rôles");
        await BuildRolesAsync();
        Console.WriteLine("Création des utilisateurs métiers");
        await BuildUsersAsync();

        Console.WriteLine("Création des comptes applicatifs (AspNetUsers)");
        await BuildUserAppAsync(); 


        Console.WriteLine("Création des abonnements");
        await BuildAbonnementsAsync();

        Console.WriteLine("Création des catégories");
        await BuildCategoriesAsync();

        Console.WriteLine("Création des cours");
        await BuildCoursAsync();



        Console.WriteLine("Création des vidéos");
        await BuildVideosAsync();
    }

    protected abstract Task RegenererBdAsync();
    protected abstract Task BuildRolesAsync();
    protected abstract Task BuildUsersAsync();
    protected abstract Task BuildAbonnementsAsync();
    protected abstract Task BuildCategoriesAsync();
    protected abstract Task BuildCoursAsync();
    protected abstract Task BuildVideosAsync();
    protected abstract Task BuildUserAppAsync();

}