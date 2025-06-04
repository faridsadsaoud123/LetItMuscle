using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleEffDataProvider.Data;
using Microsoft.EntityFrameworkCore;

namespace LetItMuscleEffDataProvider.Repositories;

public class MessageRepository(LetItMuscleDbContext context) : Repository<Message>(context),IMessageRepository
{
    public async Task<List<Message>> GetMessagesBetweenCoachAndAdherentAsync(long coachId, long adherentId)
    {
        return await context.Messages
            .Where(m => 
                (m.ExpéditeurId == coachId && m.DestinataireId == adherentId) ||
                (m.ExpéditeurId == adherentId && m.DestinataireId == coachId))
            .OrderBy(m => m.DateEnvoi)  // Tri par date d'envoi pour un affichage chronologique
            .ToListAsync();
    }

    public async Task DeleteMessagesBetweenCoachAndAdherentAsync(long coachId, long adherentId)
    {
        var messages = await context.Messages
            .Where(m => 
                (m.ExpéditeurId == coachId && m.DestinataireId == adherentId) ||
                (m.ExpéditeurId == adherentId && m.DestinataireId == coachId))
            .ToListAsync();

        if (messages.Any())
        {
            context.Messages.RemoveRange(messages);
            await context.SaveChangesAsync();
        }
    }
}