namespace LetItMuscleDomain.Entities;

public class Utilisateur
{
    public long Id { get; set; }

    public string Role { get; set; } = string.Empty;
    public string nom { get; set; } = string.Empty;
    public string prenom { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public long numTel { get; set; }
    public DateTime DateDeNaissance { get; set; }

    public string login { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
    public long? AbonnementInscritId { get; set; } // clé étrangère explicite
    public Abonnement? AbonnementInscrit { get; set; } = null;
    public List<Cours> coursReserves { get; set; } = new();
    public List<Message> messagesEnvoyes { get; set; } = new();
    public List<Message> messageRecu { get; set; } = new();

    public override string ToString()
    {
        return $"Id{Id} : {nom} : {prenom}";
    }
}