using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Dtos;
using LetItMuscleDomain.Entities;
using LetItMuscleApplication.UseCases.UtilisateurUseCases.Get;
using LetItMuscleApplication.UseCases.UtilisateurUseCases.Update;
using LetItMuscleApplication.UseCases.UtilisateurUseCases.Delete;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.UseCases.UtilisateursUseCase.Create;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace LetItMuscleEntryPoint.Controllers
{   
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UtilisateursController(IRepositoryFactory repositoryFactory) : ControllerBase
    {
        // GET : Récupérer tous les utilisateurs
        [HttpGet]
        public async Task<ActionResult<List<UtilisateurDto>>> GetAllUtilisateurs()
        {
            string role, email;
            Utilisateur user;
            //try { (role, email, user) = await CheckSecuAsync(); } 
            //catch { return Unauthorized(); }

            var useCase = new GetUtilisateurUseCase(repositoryFactory);
            try
            {
                var utilisateurs = await useCase.GetAllAsync();
                return Ok(utilisateurs.Select(UtilisateurDto.FromEntity).ToList());
            }
            catch (Exception e)
            {
                return ValidationProblem(e.Message);
            }
        }
        [Authorize]
        [HttpGet("currentUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            foreach (var claim in User.Claims)
            {
                Console.WriteLine($"CLAIM {claim.Type} => {claim.Value}");
            }

            if (string.IsNullOrEmpty(email))
                return Unauthorized("Aucun utilisateur connecté");

            var user = await repositoryFactory.LetItMuscleUserRepository().FindByEmailAsync(email);
            if (user == null)
                return NotFound("Utilisateur introuvable");

            return Ok(new
            {
                id = user.Utilisateur.Id,
                nom = user.Utilisateur?.nom,
                prenom = user.Utilisateur?.prenom,
                email = user.Utilisateur.email,
                login = user.Utilisateur.login,
                numTel = user.Utilisateur.numTel,
                dateDeNaissance = user.Utilisateur.DateDeNaissance,
                role,
                abonnementInscritId = user.Utilisateur.AbonnementInscritId
            });


        }

        //GET : Récupérer un utilisateur par ID
        [HttpGet("{id}")]
        public async Task<ActionResult<UtilisateurDto>> GetUtilisateurById(long id)
        {
            string role, email;
            Utilisateur user;
            //try { (role, email, user) = await CheckSecuAsync(); } 
           // catch { return Unauthorized(); }

            var useCase = new GetUtilisateurUseCase(repositoryFactory);
            try
            {
                var utilisateur = await useCase.GetByIdAsync(id);
                return Ok(UtilisateurDto.FromEntity(utilisateur));
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return ValidationProblem(e.Message);
            }
        }

        // POST : Créer un nouvel utilisateur
        [HttpPost]
        public async Task<ActionResult<UtilisateurDto>> CreateUtilisateur([FromBody] UtilisateurDto utilisateurDto)
        {
            string role, email;
            Utilisateur user;
            //try { (role, email, user) = await CheckSecuAsync(); } 
            //catch { return Unauthorized(); }

            var useCase = new CreateUtilisateurUseCase(repositoryFactory);
            try
            {
                var nouvelUtilisateur = await useCase.ExecuteAsync(utilisateurDto.ToEntity());
                return CreatedAtAction(nameof(GetUtilisateurById), new { id = nouvelUtilisateur.Id }, UtilisateurDto.FromEntity(nouvelUtilisateur));
            }
            catch (DuplicateUserException e)
            {
                return Conflict(e.Message);
            }
            catch (Exception e)
            {
                return ValidationProblem(e.Message);
            }
        }

        // PUT : Modifier un utilisateur
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUtilisateur(long id, [FromBody] UtilisateurDto utilisateurDto)
        {
            if (id != utilisateurDto.Id) return BadRequest("L'ID de l'utilisateur ne correspond pas.");

            string role, email;
            Utilisateur user;
            //try { (role, email, user) = await CheckSecuAsync(); } 
            //catch { return Unauthorized(); }

            var useCase = new ModifierUtilisateurUseCase(repositoryFactory);
            try
            {
                await useCase.ExecuteAsync(
                    id,
                    utilisateurDto.Nom,
                    utilisateurDto.Prenom,
                    utilisateurDto.Email,
                    utilisateurDto.NumTel,
                    utilisateurDto.Role,
                    utilisateurDto.DateDeNaissance,
                    utilisateurDto.AbonnementInscritId
                );

                return NoContent();
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (InvalidUserException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return ValidationProblem(e.Message);
            }
        }

        // DELETE : Supprimer un utilisateur
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUtilisateur(long id)
        {
            string role, email;
            Utilisateur user;
            //try { (role, email, user) = await CheckSecuAsync(); } 
            //catch { return Unauthorized(); }

            var useCase = new SupprimerUtilisateurUseCase(repositoryFactory);
            try
            {
                await useCase.ExecuteAsync(id);
                return NoContent();
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (UserDeletionException e)
            {
                return Conflict(e.Message);
            }
            catch (Exception e)
            {
                return ValidationProblem(e.Message);
            }
        }

        // Vérification de la sécurité de l'utilisateur (Async)
        private async Task<(string role, string email, Utilisateur utilisateur)> CheckSecuAsync()
        {
            string role = "";
            ClaimsPrincipal claims = HttpContext.User;

            if (claims.FindFirst(ClaimTypes.Email) == null) throw new UnauthorizedAccessException();
            string email = claims.FindFirst(ClaimTypes.Email).Value;
            if (string.IsNullOrWhiteSpace(email)) throw new UnauthorizedAccessException();

            var utilisateur = await new GetUtilisateurUseCase(repositoryFactory).GetByEmailAsync(email);
            if (utilisateur == null) throw new UnauthorizedAccessException();

            if (claims.Identity?.IsAuthenticated != true) throw new UnauthorizedAccessException();
            var ident = claims.Identities.FirstOrDefault();
            if (ident == null) throw new UnauthorizedAccessException();

            if (claims.FindFirst(ClaimTypes.Role) == null) throw new UnauthorizedAccessException();
            role = ident.FindFirst(ClaimTypes.Role).Value;
            if (role == null) throw new UnauthorizedAccessException();

            return (role, email, utilisateur);
        }
        [HttpGet("coachs")]
        public async Task<ActionResult<List<UtilisateurDto>>> GetCoachs()
        {
            var useCase = new GetUtilisateurUseCase(repositoryFactory);
            try
            {
                var utilisateurs = await useCase.GetAllAsync();
                var coachs = utilisateurs
                    .Where(u => u.Role == "Coach")
                    .Select(UtilisateurDto.FromEntity)
                    .ToList();
                return Ok(coachs);
            }
            catch (Exception e)
            {
                return ValidationProblem(e.Message);
            }
        }
    }
}
