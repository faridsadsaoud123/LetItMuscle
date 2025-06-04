using Microsoft.AspNetCore.Mvc;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Dtos;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions.AbonnementExceptions;
using LetItMuscleDomain.UseCases.Abonnement.Create;
using LetItMuscleDomain.UseCases.Abonnement.Delete;
using LetItMuscleDomain.UseCases.Abonnement.Get;
using LetItMuscleDomain.UseCases.Abonnement.Update;
using LetItMuscleDomain.UseCases.Abonnement.AdhérentDansAbonnement;
using Microsoft.AspNetCore.Authorization;

namespace LetItMuscleEntryPoint.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AbonnementController(IRepositoryFactory repositoryFactory) : ControllerBase
{
    
    // GET : Récupérer tous les abonnements
    [HttpGet]
    public async Task<ActionResult<List<AbonnementDto>>> GetAllAbonnements()
    {
        try
        {
            var useCase = new GetAllAbonnementsUseCase(repositoryFactory);
            var abonnements = await useCase.ExecuteAsync();
            return Ok(abonnements.Select(a => new AbonnementDto().ToDto(a)).ToList());
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }


    //  GET : Récupérer un abonnement par ID
    //[Authorize(Roles = "Admin")]
    [HttpGet("{id}")]
    
    public async Task<ActionResult<AbonnementDto>> GetAbonnementById(long id)
    {
        try
        {
            var useCase = new GetAbonnementByIdUseCase(repositoryFactory);
            var abonnement = await useCase.ExecuteAsync(id);
            return Ok(new AbonnementDto().ToDto(abonnement));
        }
        catch (AbonnementNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            return ValidationProblem(e.Message);
        }
    }

    //  POST : Créer un abonnement
    [HttpPost]
    public async Task<ActionResult<AbonnementDto>> CreateAbonnement([FromBody] AbonnementDto abonnementDto)
    {
        try
        {
            var useCase = new CreateAbonnementUseCase(repositoryFactory);
            var abonnementCree = await useCase.ExecuteAsync(abonnementDto.ToEntity());
            return CreatedAtAction(nameof(GetAbonnementById), new { id = abonnementCree.Id }, new AbonnementDto().ToDto(abonnementCree));
        }
        catch (DuplicateNomAbonnement e)
        {
            return Conflict(e.Message);
        }
        catch (Exception e)
        {
            return ValidationProblem(e.Message);
        }
    }

    //  PUT : Modifier un abonnement
    [HttpPut("{id}")]
    public async Task<IActionResult> ModifierAbonnement(long id, [FromBody] AbonnementDto abonnementDto)
    {
        try
        {
            var useCase = new ModifierAbonnementUseCase(repositoryFactory.AbonnementRepository());
            await useCase.ExecuteAsync(
                id,
                abonnementDto.NomAbonnement,
                abonnementDto.Tarif,
                abonnementDto.Duree,
                abonnementDto.NbrAdherent,
                abonnementDto.StatusAbonnement,
                abonnementDto.OptionsAbonnement
            );
            return NoContent();
        }
        catch (AbonnementNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (DuplicateNomAbonnement e)
        {
            return Conflict(e.Message);
        }
        catch (Exception e)
        {
            return ValidationProblem(e.Message);
        }
    }

    //  DELETE : Supprimer un abonnement
    [HttpDelete("{id}")]
    public async Task<IActionResult> SupprimerAbonnement(long id)
    {
        try
        {
            var useCase = new SupprimerAbonnementUseCase(repositoryFactory.AbonnementRepository());
            await useCase.ExecuteAsync(id);
            return NoContent();
        }
        catch (AbonnementNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (AbonnementNonVideException e)
        {
            return Conflict(e.Message);
        }
        catch (Exception e)
        {
            return ValidationProblem(e.Message);
        }
    }
    
    
    [HttpGet("actifs")]
    public async Task<ActionResult<List<AbonnementDto>>> GetAbonnementsActifs()
    {
        try
        {
            var useCase = new GetAbonnementsActifsUseCase(repositoryFactory);
            var abonnements = await useCase.ExecuteAsync();
            return Ok(abonnements.Select(a => new AbonnementDto().ToDto(a)).ToList());
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }



    //  POST : Ajouter un adhérent dans un abonnement
    [HttpPost("{abonnementId}/add-adhérent/{adherentId}")]

    public async Task<IActionResult> AjouterAdhérent(long abonnementId, long adherentId)
    {
        try
        {
            var useCase = new AddAdhérentDansAbonnementUseCase(
                repositoryFactory.AbonnementRepository(),
                repositoryFactory.UtilisateurRepository()
            );
            await useCase.ExecuteAsync(abonnementId, adherentId);
            return NoContent();
        }
        catch (Exception e)
        {
            return ValidationProblem(e.Message);
        }
    }
}
