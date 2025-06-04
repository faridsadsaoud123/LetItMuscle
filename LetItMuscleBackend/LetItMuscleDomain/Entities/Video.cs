namespace LetItMuscleDomain.Entities;

public class Video
{
    public long Id { get; set; }
    public string NomVideo { get; set; }
    public DateTime DateAjout { get; set; }
    public String Description { get; set; }
    
    public Categorie Categorie { get; set; }
    public long  CategoryId { get; set; }
    public Utilisateur Utilisateur { get; set; }
    public long UtilisateurId { get; set; }
    public override string ToString()
    {
        return NomVideo;
    }
}