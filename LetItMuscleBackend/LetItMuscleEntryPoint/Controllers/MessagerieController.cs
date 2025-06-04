using Microsoft.AspNetCore.Mvc;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.Exceptions.PiecesJointesExceptions;
using LetItMuscleDomain.UseCases.Message.Envoie;
using LetItMuscleDomain.UseCases.Message.AddPieceJointeDansMessage;

namespace LetItMuscleEntryPoint.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessagerieController(IRepositoryFactory repositoryFactory) : ControllerBase
{
    //  Envoyer un message
    [HttpPost("envoyer")]
    public async Task<IActionResult> EnvoyerMessage([FromQuery] long senderId, [FromQuery] long receiverId, [FromBody] string contenu)
    {
        try
        {
            var useCase = new EnvoyerMessageUseCase(repositoryFactory);
            await useCase.ExecuteAsync(senderId, receiverId, contenu);
            return Ok("Message envoyé avec succès.");
        }
        catch (NotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (MessageValidationException e)
        {
            return BadRequest(e.Message);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    //  Ajouter une pièce jointe à un message
    [HttpPost("{messageId}/add-piece")]
    public async Task<IActionResult> AjouterPieceJointe(long messageId, [FromQuery] long pieceJointeId)
    {
        try
        {
            var useCase = new AddPieceJointeDansMessageUseCase(repositoryFactory);
            var updatedMessage = await useCase.ExecuteAsync(messageId, pieceJointeId);
            return Ok(updatedMessage);
        }
        catch (MessageNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (PieceJointeNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    //  Obtenir tous les messages entre un coach et un adhérent
    [HttpGet("conversation")]
    public async Task<IActionResult> GetMessagesBetweenCoachAndAdherent([FromQuery] long coachId, [FromQuery] long adherentId)
    {
        try
        {
            var messages = await repositoryFactory
                .MessageRepository()
                .GetMessagesBetweenCoachAndAdherentAsync(coachId, adherentId);

            return Ok(messages);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    //  Supprimer tous les messages entre un coach et un adhérent
    [HttpDelete("conversation")]
    public async Task<IActionResult> DeleteMessagesBetweenCoachAndAdherent([FromQuery] long coachId, [FromQuery] long adherentId)
    {
        try
        {
            await repositoryFactory
                .MessageRepository()
                .DeleteMessagesBetweenCoachAndAdherentAsync(coachId, adherentId);

            await repositoryFactory.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
}
