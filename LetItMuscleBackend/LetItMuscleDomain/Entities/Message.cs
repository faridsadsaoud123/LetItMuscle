using LetItMuscleDomain.Entities;

public class Message
{
    public long Id { get; set; }
    public long ExpéditeurId { get; set; }  // ID de l'expéditeur
    public long DestinataireId { get; set; }  // ID du destinataire
    public string Contenu { get; set; } = string.Empty;
    public DateTime DateEnvoi { get; set; } = DateTime.UtcNow;

    // Relations
    public Utilisateur envoyerA { get; set; }  // Expéditeur
    public Utilisateur destineA { get; set; }  // Destinataire
    public string ChatRoomId { get; set; } 
    public List<PieceJointe> PiecesJointes { get; set; } = new List<PieceJointe>();
}