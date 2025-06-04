using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.Dtos;
public class UtilisateurDto
{
    public long Id { get; set; }
    public string Role { get; set; } = "";
    public string Nom { get; set; } = "";
    public string Prenom { get; set; } = "";
    public long NumTel { get; set; } = 0;
    public string Email { get; set; } = "";
    public DateTime DateDeNaissance { get; set; }
    public string Login { get; set; } = "";
    public string Password { get; set; } = "";
    public long? AbonnementInscritId { get; set; }

    public string? AbonnementInscrit { get; set; } 

    public Utilisateur ToEntity()
    {
        return new Utilisateur
        {
            Id = this.Id,
            Role = this.Role,
            nom = this.Nom,
            prenom = this.Prenom,
            email = this.Email,
            numTel = this.NumTel,
            login = this.Login,
            DateDeNaissance = this.DateDeNaissance,
            AbonnementInscritId = this.AbonnementInscritId

        };
    }

    public static UtilisateurDto FromEntity(Utilisateur utilisateur)
    {
        return new UtilisateurDto
        {
            Id = utilisateur.Id,
            Role = utilisateur.Role,
            Nom = utilisateur.nom,
            Prenom = utilisateur.prenom,
            Email = utilisateur.email,
            NumTel = utilisateur.numTel,
            Login = utilisateur.login,
            DateDeNaissance = utilisateur.DateDeNaissance,
            AbonnementInscritId = utilisateur.AbonnementInscritId,
            AbonnementInscrit = utilisateur.AbonnementInscrit?.NomAbonnement 
        };
    }
}

