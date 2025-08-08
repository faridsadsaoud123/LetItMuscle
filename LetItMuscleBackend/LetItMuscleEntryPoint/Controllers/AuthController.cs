    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using LetItMuscleDomain.DataAdapters.Repository;
    using LetItMuscleDomain.Dtos;
    using LetItMuscleDomain.Entities;
    using LetItMuscleDomain.UseCases.SecurityUseCases.Create;
    using LetItMuscleDomain.UseCases.UtilisateursUseCase.Create;
    using LetItMuscleEffDataProvider.Entities;
    using LetItMuscleEffDataProvider.Repositories.RepositoryFactories;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;

    namespace LetItMuscleEntryPoint.Controllers;

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<LetItMuscleUser> _userManager;
        private readonly RoleManager<LetItMuscleRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly IRepositoryFactory _repositoryFactory;

        public AuthController(
            UserManager<LetItMuscleUser> userManager,
            RoleManager<LetItMuscleRole> roleManager,
            IConfiguration config,
            IRepositoryFactory repositoryFactory)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _config = config;
            _repositoryFactory = repositoryFactory;
        }

        //chnager mot de passe 
        [HttpPost("change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrWhiteSpace(email))
                return Unauthorized("Utilisateur non authentifié");

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return NotFound("Utilisateur introuvable");

            var result = await _userManager.ChangePasswordAsync(user, dto.OldPassword, dto.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
            }

            return Ok(new { message = "Mot de passe modifié avec succès ✅" });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Password))
                return Unauthorized("Identifiants invalides");

            var roles = await _userManager.GetRolesAsync(user);
            var token = GenerateJwtToken(user, roles.FirstOrDefault() ?? "");

            return Ok(new { token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UtilisateurDto dto)
        {
            try
            {
                // 🟠 Force le rôle par défaut si non précisé
                if (string.IsNullOrWhiteSpace(dto.Role))
                {
                    dto.Role = LetItMuscleDomain.Entities.Roles.AdherentStandard;
                }

                // 1. Créer le Utilisateur métier dans ta base
                var createUser = new CreateUtilisateurUseCase(_repositoryFactory);
                Utilisateur utilisateurCree = await createUser.ExecuteAsync(dto.ToEntity());

                // 2. Créer le LetItMuscleUser (compte Identity) et le relier au Utilisateur
                var createIdentity = new CreateLetItMuscleUserUseCase(_repositoryFactory);
                await createIdentity.ExecuteAsync(
                    dto.Login,
                    dto.Email,
                    
                    dto.Password,
                    dto.Role,
                    utilisateurCree
                );

                return Ok(new { message = "Inscription réussie ✅", id = utilisateurCree.Id });
            }
            catch (Exception ex)
            {
                Console.WriteLine(">>> Erreur dans Register : " + ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpGet("/signin-google")]
        public async Task<IActionResult> GoogleCallback()
        {
            var result = await HttpContext.AuthenticateAsync("Google");

            if (!result.Succeeded || result.Principal == null)
                return Unauthorized("Échec de l'authentification Google");

            var email = result.Principal.FindFirst(ClaimTypes.Email)?.Value;
            var name = result.Principal.FindFirst(ClaimTypes.Name)?.Value;

            // Cherche si l'utilisateur existe déjà dans Identity
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                // Crée un nouvel utilisateur LetItMuscle
                var utilisateur = new Utilisateur
                {
                    nom = name ?? "GoogleUser",
                    prenom = "",
                    email = email,
                    numTel = 77777777,
                    
                };

                var createUser = new CreateUtilisateurUseCase(_repositoryFactory);
                var utilisateurCree = await createUser.ExecuteAsync(utilisateur);

                var createIdentity = new CreateLetItMuscleUserUseCase(_repositoryFactory);
                await createIdentity.ExecuteAsync(
                    email,               // login
                    email,               // email
                    Guid.NewGuid().ToString(), // mot de passe random (jamais utilisé ici)
                    LetItMuscleDomain.Entities.Roles.AdherentStandard,
                    utilisateurCree
                );

                user = await _userManager.FindByEmailAsync(email);
            }

            // Récupère les rôles
            var roles = await _userManager.GetRolesAsync(user);
            var token = GenerateJwtToken(user, roles.FirstOrDefault() ?? "");

            // Redirige vers ton frontend avec le token
            var redirectUrl = $"http://localhost:3000/login-success?token={token}";
            return Redirect(redirectUrl);
        }




        private string GenerateJwtToken(LetItMuscleUser user, string role)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email ?? ""),
                new Claim(ClaimTypes.Role, role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:SecretKey"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(12),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }