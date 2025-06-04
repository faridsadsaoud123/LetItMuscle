using LetItMuscleDomain.Entities;
using LetItMuscleDomain.UseCases.SecurityUseCases.Create;
using LetItMuscleDomain.UseCases.VideoUseCases.Create;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.UseCases.Abonnement.Create;
using LetItMuscleDomain.UseCases.Categorie.Create;
using LetItMuscleDomain.UseCases.CoursUseCases;
using LetItMuscleDomain.UseCases.UtilisateursUseCase.Create;

namespace LetItMuscleDomain.JeuxDeDonnees;

// Builder de la base de données pour l'initialisation avec des données fictives (jeux de données)
public class LetItMuscleBdBuilder(IRepositoryFactory repositoryFactory) : BdBuilder(repositoryFactory)
{
    private readonly string Password = "LetItMuscle2023#"; // Mot de passe par défaut pour tous les utilisateurs

    // Données utilisateurs fictives
    private readonly Utilisateur[] _utilisateurs =
    [
        new() { Id = 1, Role = Roles.Admin, nom = "Admin", prenom = "Farid", email = "admin@letitmuscle.com", numTel = 0777777777, login = "FaridHH", DateDeNaissance = DateTime.Parse("1980-01-01") },
        new() { Id = 2, Role = Roles.Coach, nom = "Coach", prenom = "Douaa", email = "alice@letitmuscle.com", numTel = 0777777777, login = "douaaGH", DateDeNaissance = DateTime.Parse("1990-05-10") },
        new() { Id = 3, Role = Roles.AdherentStandard, nom = "Abdessamed", prenom = "El Hachmi", email = "jean@letitmuscle.com", numTel = 0777777777, login = "AbdessamdeCreazy", DateDeNaissance = DateTime.Parse("1995-07-20") },
        new() { Id = 4, Role = Roles.AdherentCoachingEnLigne, nom = "Id belkhir", prenom = "Asmae", email = "marie@letitmuscle.com", numTel = 0777777777, login = "AssmaeGirl", DateDeNaissance = DateTime.Parse("1992-11-05") },
        new() { Id = 5, Role = Roles.Coach, nom = "Coach", prenom = "test", email = "testtest@letitmuscle.com", numTel = 0777777777, login = "test", DateDeNaissance = DateTime.Parse("1990-05-10") },
        
    ];

    // Données d’abonnements disponibles
    private readonly Abonnement[] _abonnements =
    [
        new() { Id = 1, NomAbonnement = "Standard", tarif = 30.0, duree = "1 mois", nbrAdherent = 0, StatusAbonnement = "Actif", CreateurId = 1 },
        new() { Id = 2, NomAbonnement = "Premium", tarif = 50.0, duree = "3 mois", nbrAdherent = 0, StatusAbonnement = "Actif", CreateurId = 2 },
        new() { Id = 3, NomAbonnement = "VIP", tarif = 100.0, duree = "6 mois", nbrAdherent = 0, StatusAbonnement = "Inactif", CreateurId = 1 }
    ];

    // Catégories d’activités physiques
    private readonly Categorie[] _categories =
    [
        new() { Id = 1, NomCategorie = "Yoga" },
        new() { Id = 2, NomCategorie = "Musculation" },
        new() { Id = 3, NomCategorie = "Cardio" }
    ];

    // Liste des cours collectifs
    private readonly Cours[] _cours =
    [
        new() { Id = 1, Description = "Cours de Yoga Débutant", DateCours = DateTime.Parse("2023-10-15 10:00"), NbrPlaces = 20, categoryId = 1, coachId = 2, Statut = "Passé" },
        new() { Id = 2, Description = "Cours de Musculation Avancé", DateCours = DateTime.Parse("2023-10-16 18:00"), NbrPlaces = 15, categoryId = 2, coachId = 2, Statut = "Passé" },
        new() { Id = 3, Description = "Cours de Cardio Intense", DateCours = DateTime.Parse("2023-10-17 08:00"), NbrPlaces = 25, categoryId = 3, coachId = 2, Statut = "Passé" },
        new() { Id = 4, Description = "Pilates pour débutants", DateCours = DateTime.Parse("2025-04-21T10:00:00"), NbrPlaces = 20, categoryId = 1, coachId = 2, Statut = "À Venir" },
        new() { Id = 5, Description = "Zumba Énergique", DateCours = DateTime.Parse("2025-04-24T18:00:00"), NbrPlaces = 25, categoryId = 3, coachId = 2, Statut = "À Venir" },
        new() { Id = 6, Description = "Renforcement Musculaire", DateCours = DateTime.Parse("2025-04-26T14:00:00"), NbrPlaces = 15, categoryId = 2, coachId = 2, Statut = "À Venir" },
        new() { Id = 7, Description = "Stretching Relaxant", DateCours = DateTime.Parse("2025-04-26T09:00:00"), NbrPlaces = 12, categoryId = 1, coachId = 3, Statut = "À Venir" },
        new() { Id = 8, Description = "HIIT Express", DateCours = DateTime.Parse("2025-04-26T11:30:00"), NbrPlaces = 20, categoryId = 3, coachId = 4, Statut = "À Venir" },
        new() { Id = 9, Description = "Boxe Fit", DateCours = DateTime.Parse("2025-04-26T16:00:00"), NbrPlaces = 18, categoryId = 2, coachId = 2, Statut = "À Venir" }
    ];

    // Historique de messages échangés
    private readonly Message[] _messages =
    [
        new() { Id = 1, ExpéditeurId = 1, DestinataireId = 2, Contenu = "Bonjour, comment ça va ?", DateEnvoi = DateTime.Parse("2023-10-10 12:00"), ChatRoomId = "room1" },
        new() { Id = 2, ExpéditeurId = 2, DestinataireId = 1, Contenu = "Tout va bien, merci !", DateEnvoi = DateTime.Parse("2023-10-10 12:05"), ChatRoomId = "room1" }
    ];

    // Réservations effectuées
    private readonly Reservation[] _reservations =
    [
        new() { Id = 1, UtilisateurId = 3, CoursId = 1, DateReservation = DateTime.Parse("2023-10-12 10:00") },
        new() { Id = 2, UtilisateurId = 4, CoursId = 2, DateReservation = DateTime.Parse("2023-10-13 11:00") }
    ];

    // Vidéos disponibles pour les adhérents
    private readonly Video[] _videos =
    [
        new() { Id = 1, NomVideo = "Yoga pour débutants", DateAjout = DateTime.Parse("2023-10-01"), Description = "Cours de yoga relaxant", CategoryId = 1, UtilisateurId = 2 },
        new() { Id = 2, NomVideo = "Musculation complète", DateAjout = DateTime.Parse("2023-10-02"), Description = "Séance de musculation", CategoryId = 2, UtilisateurId = 3 }
    ];

    // Supprime et recrée la base de données
    protected override async Task RegenererBdAsync()
    {
        await repositoryFactory.EnsureDeletedAsync();
        await repositoryFactory.EnsureCreatedAsync();
    }

    // Création des rôles de l'application
    protected override async Task BuildRolesAsync()
    {
        await new CreateLetItMuscleRoleUseCase(repositoryFactory).ExecuteAsync(Roles.Admin);
        await new CreateLetItMuscleRoleUseCase(repositoryFactory).ExecuteAsync(Roles.Coach);
        await new CreateLetItMuscleRoleUseCase(repositoryFactory).ExecuteAsync(Roles.AdherentStandard);
        await new CreateLetItMuscleRoleUseCase(repositoryFactory).ExecuteAsync(Roles.AdherentCoachingEnLigne);
    }

    // Création des utilisateurs
    protected override async Task BuildUsersAsync()
    {
        foreach (var utilisateur in _utilisateurs)
        {
            await new CreateUtilisateurUseCase(repositoryFactory).ExecuteAsync(utilisateur);
        }
    }

    // Création des abonnements et liaison avec les utilisateurs
    protected override async Task BuildAbonnementsAsync()
    {
        foreach (var abonnement in _abonnements)
        {
            var createur = _utilisateurs.FirstOrDefault(u => u.Id == abonnement.CreateurId);
            abonnement.creature = createur!;
            await new CreateAbonnementUseCase(repositoryFactory).ExecuteAsync(abonnement);
        }

        // Association des abonnements aux utilisateurs concernés
        _utilisateurs[2].AbonnementInscrit = _abonnements[0]; // Jean
        _utilisateurs[3].AbonnementInscrit = _abonnements[1]; // Marie
    }

    // Création des catégories de cours
    protected override async Task BuildCategoriesAsync()
    {
        foreach (var categorie in _categories)
        {
            await new CreerCategorie(repositoryFactory).ExecuteAsync(categorie.NomCategorie);
        }
    }

    // Création des cours et inscriptions fictives
    protected override async Task BuildCoursAsync()
    {
        foreach (var cours in _cours)
        {
            await new CreerCoursUseCase(repositoryFactory).ExecuteAsync(
                cours.Description,
                cours.DateCours,
                cours.NbrPlaces,
                cours.coachId,
                cours.categoryId
            );
        }

        // Inscription d’adhérents à des cours
        _cours[0].adherentsInscrits.Add(_utilisateurs[2]); // Jean
        _cours[1].adherentsInscrits.Add(_utilisateurs[3]); // Marie
    }

    // Création des vidéos associées à des utilisateurs et des catégories
    protected override async Task BuildVideosAsync()
    {
        foreach (var video in _videos)
        {
            var categorie = (await repositoryFactory.CategorieRepository().FindByConditionAsync(c => c.Id == video.CategoryId)).First();
            video.Categorie = categorie;

            video.Utilisateur = _utilisateurs.First(u => u.Id == video.UtilisateurId);
            await new CreateVideoUseCase(repositoryFactory).ExecuteAsync(video);
        }
    }

    // Création des comptes Identity (utilisateurs applicatifs avec rôles)
    protected override async Task BuildUserAppAsync()
    {
        var createIdentity = new CreateLetItMuscleUserUseCase(repositoryFactory);

        foreach (var user in _utilisateurs)
        {
            await createIdentity.ExecuteAsync(
                user.email,
                user.email,
                this.Password,
                user.Role,
                user
            );
        }
    }
}
