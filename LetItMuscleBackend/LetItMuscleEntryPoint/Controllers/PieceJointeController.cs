using Microsoft.AspNetCore.Mvc;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions.PiecesJointesExceptions;
using LetItMuscleDomain.UseCases.PiecesJointes.Ajouter;

namespace LetItMuscleEntryPoint.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PieceJointeController(IRepositoryFactory repositoryFactory) : ControllerBase
{
    //  POST : Ajouter une pièce jointe à un message
    [HttpPost("message/{messageId}")]
    public async Task<ActionResult<PieceJointe>> AjouterPieceJointe(long messageId, [FromBody] string nomPiece)
    {
        try
        {
            var useCase = new AjouterPieceJointeUseCase(repositoryFactory);
            var pieceCreee = await useCase.ExecuteAsync(messageId, nomPiece);
            return CreatedAtAction(nameof(GetById), new { id = pieceCreee.Id }, pieceCreee);
        }
        catch (InvalidPieceJointeException e)
        {
            return BadRequest(e.Message);
        }
        catch (MessageNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    //  GET : Récupérer une pièce jointe par ID
    [HttpGet("{id}")]
    public async Task<ActionResult<PieceJointe>> GetById(long id)
    {
        var repo = repositoryFactory.PieceJointeRepository();
        var piece = await repo.FindAsync(id);

        return piece == null ? NotFound("Pièce jointe non trouvée.") : Ok(piece);
    }

    //  GET : Récupérer toutes les pièces jointes d'un message
    [HttpGet("message/{messageId}")]
    public async Task<ActionResult<List<PieceJointe>>> GetByMessageId(long messageId)
    {
        var repo = repositoryFactory.PieceJointeRepository();
        var result = await repo.GetByMessageIdAsync(messageId);
        return Ok(result);
    }

    //  DELETE : Supprimer une pièce jointe par ID
    [HttpDelete("{id}")]
    public async Task<IActionResult> Supprimer(long id)
    {
        var repo = repositoryFactory.PieceJointeRepository();
        var exists = await repo.ExistsAsync(id);
        if (!exists)
            return NotFound("Pièce jointe non trouvée.");

        await repo.DeleteAsync(id);
        await repo.SaveChangesAsync();
        return NoContent();
    }
}
