using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleEffDataProvider.Data;
using LetItMuscleEffDataProvider.Entities;
using Microsoft.AspNetCore.Identity;

namespace LetItMuscleEffDataProvider.Repositories.RepositoryFactories;

public class RepositoryFactory(LetItMuscleDbContext context, UserManager<LetItMuscleUser> userManager, 
    RoleManager<LetItMuscleRole> roleManager): IRepositoryFactory
{
    private IAbonnementRepository? _abonnement;
    private ICoursRepository? _cours;
    private IVideoRepository? _video;
    private IPieceJointeRepository? _pieceJointe;
    private IUtilisateurRepository? _utilisateur;
    private ICategorieRepository? _categorie;
    private IMessageRepository? _message;
    private IReservationRepository? _reservation;
    private ILetItMuscleUserRepository _user;
    private ILetItMuscleRoleRepository _role;
    
    public IAbonnementRepository AbonnementRepository()
    {
        if (_abonnement == null)
        {
            _abonnement = new AbonnementRepository(context ?? throw new InvalidOperationException());
        }

        return _abonnement;
    }

    public ICoursRepository CoursRepository()
    {
        return _cours ??= new CoursRepository(context ?? throw new InvalidOperationException());
    }

    public IMessageRepository MessageRepository()
    {
        return _message ??= new MessageRepository(context ?? throw new InvalidOperationException());
    }

    public IVideoRepository VideoRepository()
    {
        return _video ??= new VideoRepository(context ?? throw new InvalidOperationException());
    }
    public IUtilisateurRepository UtilisateurRepository()
    {
        return _utilisateur ??= new UtilisateurRepository(context ?? throw new InvalidOperationException());
    }
    public IReservationRepository ReservationRepository()
    {
        return _reservation ??= new ReservationRepository(context ?? throw new InvalidOperationException());
    }
    public IPieceJointeRepository PieceJointeRepository()
    {
        return _pieceJointe ??= new PieceJointeRepository(context ?? throw new InvalidOperationException());
    }

    public ICategorieRepository CategorieRepository()
    {
        return _categorie ??= new CategorieRepository(context ?? throw new InvalidOperationException());
    }

    public ILetItMuscleUserRepository LetItMuscleUserRepository()
    {
        return _user ??= new LetItMuscleUserRepository(context, userManager, roleManager);
    }

   


    public ILetItMuscleRoleRepository LetItMuscleRoleRepository()
    {
        return _role ??= new LetItMuscleRoleRepository(context, roleManager);
    }

    public async Task EnsureDeletedAsync()
    {
        await context.Database.EnsureDeletedAsync();
    }

    public async Task EnsureCreatedAsync()
    {
        await context.Database.EnsureCreatedAsync();
    }

    public async Task SaveChangesAsync()
    {
        await context.SaveChangesAsync();
    }
}