namespace LetItMuscleDomain.Entities;

public interface ILetItMuscleUser
{
    long? UtilisateurId { get; set; }
    Utilisateur? Utilisateur { get; set; }
    
}