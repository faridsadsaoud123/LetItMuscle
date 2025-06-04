using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.DataAdapters;

public interface IPieceJointeRepository : IRepository<PieceJointe>
{
    // Récupérer toutes les pièces jointes d'un message
    Task<List<PieceJointe>> GetByMessageIdAsync(long messageId);

    // Vérifier si une pièce jointe existe
    Task<bool> ExistsAsync(long pieceJointeId);
}