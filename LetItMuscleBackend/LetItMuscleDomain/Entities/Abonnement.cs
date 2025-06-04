namespace LetItMuscleDomain.Entities;

public class Abonnement
{
    public long Id { get; set; }
    public string NomAbonnement { get; set; }
    public double tarif { get; set; }
    public string duree { get; set; }
    public int nbrAdherent { get; set; }
    public string StatusAbonnement { get; set; }
    public string OptionsAbonnement { get; set; } = "";

    
    
    public List<Utilisateur> UtilisateursInscrits { get; set; } = new();
    public Utilisateur creature { get; set; }
    public long CreateurId { get; set; } 
    public override String ToString()
    {
        return NomAbonnement;
    }
}