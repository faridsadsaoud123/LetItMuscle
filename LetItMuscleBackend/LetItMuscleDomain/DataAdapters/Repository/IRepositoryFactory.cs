using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.DataAdapters.Repository;

public interface IRepositoryFactory
{
    IAbonnementRepository AbonnementRepository();
    ICoursRepository CoursRepository();
    IMessageRepository MessageRepository();
    IVideoRepository VideoRepository();
    IUtilisateurRepository UtilisateurRepository();
    IReservationRepository ReservationRepository();
    IPieceJointeRepository PieceJointeRepository();
    ICategorieRepository CategorieRepository();

    ILetItMuscleRoleRepository LetItMuscleRoleRepository();
ILetItMuscleUserRepository LetItMuscleUserRepository();
    Task EnsureDeletedAsync();
    Task EnsureCreatedAsync();
    Task SaveChangesAsync();
    
}