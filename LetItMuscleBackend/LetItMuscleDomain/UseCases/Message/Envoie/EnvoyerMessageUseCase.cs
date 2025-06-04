using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Exceptions;

namespace LetItMuscleDomain.UseCases.Message.Envoie;

public class EnvoyerMessageUseCase (IRepositoryFactory repositoryFactory)
{
    

    public async Task ExecuteAsync(long senderId, long receiverId, string contenu)
    {
        // Vérifier que le contenu du message n'est pas vide
        if (string.IsNullOrWhiteSpace(contenu))
        {
            throw new MessageValidationException("Le message ne peut pas être vide.");
        }

        // Vérifier si l'expéditeur (adhérent ou coach) existe
        var sender = await repositoryFactory.UtilisateurRepository().FindAsync(senderId);
        if (sender == null)
        {
            throw new NotFoundException($"L'expéditeur avec ID {senderId} n'existe pas.");
        }

        // Vérifier si le destinataire (coach ou adhérent) existe
        var receiver = await repositoryFactory.UtilisateurRepository().FindAsync(receiverId);
        if (receiver == null)
        {
            throw new NotFoundException($"Le destinataire avec ID {receiverId} n'existe pas.");
        }

        // Vérifier si l'expéditeur est bien un adhérent abonné au coaching en ligne
        if (sender.AbonnementInscrit == null)
        {
            throw new MessageValidationException("L'expéditeur doit être abonné au coaching en ligne.");
        }

        // Vérifier si le destinataire est bien un coach
        if (!receiver.Role.Equals("Coach", StringComparison.OrdinalIgnoreCase))
        {
            throw new MessageValidationException("Le destinataire doit être un coach.");
        }

        // Créer et enregistrer le message
        var message = new global::Message()
        {
            Contenu = contenu,
            ExpéditeurId = senderId,
            DestinataireId = receiverId,
            DateEnvoi = DateTime.UtcNow
        };

        await repositoryFactory.MessageRepository().CreateAsync(message);
    }
}
