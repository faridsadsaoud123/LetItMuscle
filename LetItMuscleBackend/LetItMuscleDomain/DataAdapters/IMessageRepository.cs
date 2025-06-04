using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.DataAdapters.Repository;

public interface IMessageRepository : IRepository<Message>
{
    // Récupérer tous les messages entre un coach et un adhérent abonné au coaching en ligne
    Task<List<Message>> GetMessagesBetweenCoachAndAdherentAsync(long coachId, long adherentId);

    // Supprimer tous les messages entre un coach et un adhérent
    Task DeleteMessagesBetweenCoachAndAdherentAsync(long coachId, long adherentId);
}