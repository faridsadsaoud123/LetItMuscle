using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions.PiecesJointesExceptions;

namespace LetItMuscleDomain.UseCases.PiecesJointes.Ajouter;

public class AjouterPieceJointeUseCase
{
    private readonly IRepositoryFactory _repositoryFactory;

    public AjouterPieceJointeUseCase(IRepositoryFactory repositoryFactory)
    {
        _repositoryFactory = repositoryFactory;
    }

    public async Task<PieceJointe> ExecuteAsync(long messageId, string nomPiece)
    {
        // Vérification des paramètres
        if (string.IsNullOrWhiteSpace(nomPiece))
            throw new InvalidPieceJointeException("Le nom de la pièce jointe est requis.");

        // Vérifier si le message existe (on s’assure que la pièce jointe est associée à un message valide)
        var message = await _repositoryFactory.MessageRepository().FindAsync(messageId);
        if (message == null)
            throw new MessageNotFoundException($"Le message avec l'ID {messageId} n'existe pas.");

        // Création de la pièce jointe
        var pieceJointe = new PieceJointe { NomPiece = nomPiece };
        var createdPieceJointe = await _repositoryFactory.PieceJointeRepository().CreateAsync(pieceJointe);

        // Sauvegarde des modifications
        await _repositoryFactory.PieceJointeRepository().SaveChangesAsync();

        return createdPieceJointe;
    }
}