using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.JeuxDeDonnees;
using LetItMuscleEffDataProvider.Data;
using LetItMuscleEffDataProvider.Entities;
using LetItMuscleEffDataProvider.Repositories.RepositoryFactories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// =============================================
//  CONFIGURATION DE LA BASE DE DONNÉES (MySQL)
// =============================================
string connectionString = builder.Configuration.GetConnectionString("MySqlConnection")
    ?? throw new InvalidOperationException("MySqlConnection not found.");

builder.Services.AddDbContext<LetItMuscleDbContext>(options =>
    options.UseMySQL(connectionString)); // Utilisation du provider MySQL pour EF Core

// =============================================
//  INJECTION DES DÉPENDANCES MÉTIER
// =============================================
builder.Services.AddScoped<IRepositoryFactory, RepositoryFactory>();

// =============================================
//  CONFIGURATION D'IDENTITY (utilisateur + rôles)
// =============================================
builder.Services.AddIdentityCore<LetItMuscleUser>()
    .AddRoles<LetItMuscleRole>()
    .AddEntityFrameworkStores<LetItMuscleDbContext>(); // Identity stocké dans la même base EF

// =============================================
//  CONFIGURATION DE L'AUTHENTIFICATION JWT
// =============================================
var jwtKey = builder.Configuration["JwtSettings:SecretKey"] 
    ?? throw new InvalidOperationException("JWT SecretKey not found.");
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)); // Clé secrète encodée en UTF-8

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    // Events personnalisés pour débogage
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine("AUTH FAILED:");
            Console.WriteLine(context.Exception.ToString());
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>
        {
            Console.WriteLine("TOKEN VALIDATED ✅");
            return Task.CompletedTask;
        }
    };

    // Paramètres de validation du token
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero, // Pas de tolérance de temps sur l'expiration
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = key,
        RoleClaimType = ClaimTypes.Role,
        NameClaimType = ClaimTypes.Email // Pour associer automatiquement l'e-mail à User.Identity.Name
    };
});

builder.Services.AddAuthorization(); // Ajout du service d'autorisation basée sur les rôles

// =============================================
//  CONFIGURATION DU CORS POUR LE FRONTEND REACT
// =============================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("reactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Adresse de ton frontend React en dev
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Nécessaire si tu utilises les cookies ou l'auth JWT
    });
});

// =============================================
// SERVICES API
// =============================================
builder.Services.AddControllers();            // Ajoute les contrôleurs
builder.Services.AddEndpointsApiExplorer();   // Pour l’exploration Swagger
builder.Services.AddSwaggerGen();             // Swagger UI

var app = builder.Build();

// =============================================
//  MIDDLEWARE
// =============================================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // Swagger disponible uniquement en dev
}

app.UseCors("reactApp"); // CORS appliqué

// Middleware de log des tokens JWT reçus
app.Use(async (context, next) =>
{
    var token = context.Request.Headers["Authorization"].ToString();
    Console.WriteLine($">>> TOKEN: {token}");
    await next();
});

app.UseAuthentication();  // Authentification JWT (doit venir AVANT l'autorisation)
app.UseAuthorization();   // Autorisation basée sur les rôles/claims

app.MapControllers();     // Lie les routes aux contrôleurs

// =============================================
// INITIALISATION DES DONNÉES DE LA BASE
// =============================================
//  Attention : ce bloc supprime et régénère la base à chaque démarrage (à désactiver en production)
using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<LetItMuscleDbContext>>();
    var context = scope.ServiceProvider.GetRequiredService<LetItMuscleDbContext>();

    logger.LogInformation("Initialisation de la base de données");

    await context.Database.EnsureDeletedAsync(); // Supprime la base si elle existe
    await context.Database.EnsureCreatedAsync(); // Recrée la base vide

    var repoFactory = scope.ServiceProvider.GetRequiredService<IRepositoryFactory>();
    var seed = new LetItMuscleBdBuilder(repoFactory); // Instancie le jeu de données
    await seed.BuildLetItMuscleBdAsync(); // Remplit la base avec les données initiales
}

app.Run(); // Lance l'application
