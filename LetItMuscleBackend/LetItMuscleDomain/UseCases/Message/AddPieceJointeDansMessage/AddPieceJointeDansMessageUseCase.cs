using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions.PiecesJointesExceptions;

namespace LetItMuscleDomain.UseCases.Message.AddPieceJointeDansMessage;

public class AddPieceJointeDansMessageUseCase
{
    private readonly IRepositoryFactory _repositoryFactory;

    public AddPieceJointeDansMessageUseCase(IRepositoryFactory repositoryFactory)
    {
        _repositoryFactory = repositoryFactory;
    }

    public async Task<global::Message> ExecuteAsync(long messageId, long pieceJointeId)
    {
        // Vérifier si le message existe
        var message = await _repositoryFactory.MessageRepository().FindAsync(messageId);
        if (message == null)
            throw new MessageNotFoundException($"Le message avec l'ID {messageId} n'existe pas.");

        // Vérifier si la pièce jointe existe
        var pieceJointe = await _repositoryFactory.PieceJointeRepository().FindAsync(pieceJointeId);
        if (pieceJointe == null)
            throw new PieceJointeNotFoundException($"La pièce jointe avec l'ID {pieceJointeId} n'existe pas.");

        // Ajouter la pièce jointe au message
        message.PiecesJointes.Add(pieceJointe);

        // Sauvegarder les modifications
        await _repositoryFactory.SaveChangesAsync();

        return message;
    }
}