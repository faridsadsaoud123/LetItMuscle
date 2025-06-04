using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.Entities;
using LetItMuscleEffDataProvider.Data;
using Microsoft.EntityFrameworkCore;

namespace LetItMuscleEffDataProvider.Repositories;

public class PieceJointeRepository(LetItMuscleDbContext context) : Repository<PieceJointe>(context),IPieceJointeRepository
{
    public async Task<List<PieceJointe>> GetByMessageIdAsync(long messageId)
    {
        return await context.PieceJointes
            .Where(p => p.messageId == messageId)
            .ToListAsync();
    }

    public async Task<bool> ExistsAsync(long pieceJointeId)
    {
        return await context.PieceJointes
            .AnyAsync(p => p.Id == pieceJointeId);
    }
}