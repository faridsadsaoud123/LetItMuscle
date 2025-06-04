using LetItMuscleDomain.Entities;
using LetItMuscleEffDataProvider.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace LetItMuscleEffDataProvider.Data;

// DbContext principal de l'application, hérite de IdentityDbContext pour intégrer la gestion des utilisateurs via Identity
public class LetItMuscleDbContext : IdentityDbContext<LetItMuscleUser>
{
    // Permet de logger les requêtes SQL dans la console pour le débogage
    public static readonly ILoggerFactory ConsoleLogger = LoggerFactory.Create(builder => { builder.AddConsole(); });

    public LetItMuscleDbContext(DbContextOptions<LetItMuscleDbContext> options)
        : base(options) { }

    // Constructeur vide requis pour certains outils ou tests
    public LetItMuscleDbContext() : base() { }

    // Configuration supplémentaire du contexte, ici pour activer le logging détaillé
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseLoggerFactory(ConsoleLogger)  // Log SQL
            .EnableSensitiveDataLogging()               // Affiche les valeurs des paramètres (utile en dev)
            .EnableDetailedErrors();                    // Affiche les erreurs détaillées
    }

    // Configuration du mapping entre les entités et la base de données
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // === Configuration de l'entité Cours ===
        modelBuilder.Entity<Cours>().HasKey(c => c.Id);
        modelBuilder.Entity<Cours>()
            .HasMany(c => c.adherentsInscrits)
            .WithMany(u => u.coursReserves); // Many-to-Many entre cours et adhérents
        modelBuilder.Entity<Cours>()
            .HasOne(c => c.Coach)
            .WithMany()
            .HasForeignKey(c => c.coachId); // Coach lié au cours
        modelBuilder.Entity<Cours>()
            .HasOne(c => c.categorie)
            .WithMany()
            .HasForeignKey(c => c.categoryId); // Catégorie du cours

        // === Configuration de l'entité Utilisateur ===
        modelBuilder.Entity<Utilisateur>().HasKey(u => u.Id);
        modelBuilder.Entity<Utilisateur>()
            .HasMany(u => u.coursReserves)
            .WithMany(c => c.adherentsInscrits); // Inverse de la relation Cours
        modelBuilder.Entity<Utilisateur>()
            .HasOne(u => u.AbonnementInscrit)
            .WithMany(a => a.UtilisateursInscrits)
            .HasForeignKey("AbonnementInscritId")
            .IsRequired(false); // Nullable : l’utilisateur peut ne pas avoir d’abonnement
        modelBuilder.Entity<Utilisateur>()
            .Navigation(u => u.AbonnementInscrit)
            .AutoInclude(); // Auto-chargement de l'abonnement

        // === Configuration de l'entité Abonnement ===
        modelBuilder.Entity<Abonnement>().HasKey(u => u.Id);
        modelBuilder.Entity<Abonnement>()
            .HasMany(a => a.UtilisateursInscrits)
            .WithOne(u => u.AbonnementInscrit); // Lien avec les utilisateurs
        modelBuilder.Entity<Abonnement>()
            .HasOne(a => a.creature)
            .WithMany()
            .HasForeignKey(a => a.CreateurId)
            .OnDelete(DeleteBehavior.Restrict); // Empêche la suppression en cascade du créateur

        // === Catégories ===
        modelBuilder.Entity<Categorie>().HasKey(c => c.Id);

        // === Messages ===
        modelBuilder.Entity<Message>().HasKey(m => m.Id);
        modelBuilder.Entity<Message>()
            .HasOne(m => m.envoyerA)
            .WithMany()
            .HasForeignKey(m => m.ExpéditeurId)
            .OnDelete(DeleteBehavior.Restrict); // Empêche la suppression en cascade
        modelBuilder.Entity<Message>()
            .HasOne(m => m.destineA)
            .WithMany()
            .HasForeignKey(m => m.DestinataireId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<Message>()
            .Property(m => m.ChatRoomId)
            .IsRequired();
        modelBuilder.Entity<Message>()
            .HasMany(m => m.PiecesJointes); // Relation avec pièces jointes

        // === Pièces jointes ===
        modelBuilder.Entity<PieceJointe>().HasKey(pj => pj.Id);
        modelBuilder.Entity<PieceJointe>()
            .HasOne<Message>()
            .WithMany(m => m.PiecesJointes)
            .HasForeignKey(pj => pj.messageId); // Lien avec message

        // === Vidéos ===
        modelBuilder.Entity<Video>().HasKey(v => v.Id);
        modelBuilder.Entity<Video>()
            .HasOne(v => v.Categorie)
            .WithMany()
            .HasForeignKey(v => v.CategoryId);
        modelBuilder.Entity<Video>()
            .HasOne(v => v.Utilisateur)
            .WithMany()
            .HasForeignKey(v => v.UtilisateurId);

        // === Réservations ===
        modelBuilder.Entity<Reservation>().HasKey(r => r.Id);
        modelBuilder.Entity<Reservation>()
            .HasOne(r => r.Utilisateur)
            .WithMany()
            .HasForeignKey(r => r.UtilisateurId);
        modelBuilder.Entity<Reservation>()
            .HasOne(r => r.Cours)
            .WithMany()
            .HasForeignKey(r => r.CoursId);

        // === Liaison entre IdentityUser et Utilisateur (métier) ===
        modelBuilder.Entity<LetItMuscleUser>()
            .HasOne(user => user.Utilisateur)
            .WithOne()
            .HasForeignKey<Utilisateur>(); // FK inversée pour le mapping
        modelBuilder.Entity<Utilisateur>()
            .HasOne<LetItMuscleUser>()
            .WithOne(user => user.Utilisateur)
            .HasForeignKey<LetItMuscleUser>(user => user.UtilisateurId)
            .OnDelete(DeleteBehavior.Cascade); // Supprimer l’identity supprime l’utilisateur
        modelBuilder.Entity<LetItMuscleUser>()
            .Navigation(user => user.Utilisateur)
            .AutoInclude(); // Chargement automatique de l’utilisateur lié

        // === Rôles (Entity Identity) ===
        modelBuilder.Entity<LetItMuscleRole>(); // Pas de configuration spécifique ici
    }

    // Déclarations des DbSet pour chaque table de l'application
    public DbSet<Cours> Cours { get; set; }
    public DbSet<Utilisateur> Utilisateurs { get; set; }
    public DbSet<Abonnement> Abonnements { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<PieceJointe> PieceJointes { get; set; }
    public DbSet<Video> Videos { get; set; }
    public DbSet<Categorie> Categories { get; set; }
    public DbSet<Reservation> Reservations { get; set; }

    // DbSet pour les entités Identity
    public DbSet<LetItMuscleUser>? Users { get; set; }
    public DbSet<LetItMuscleRole>? Roles { get; set; }
}
