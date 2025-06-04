using LetItMuscleDomain.Entities;
using Microsoft.AspNetCore.Identity;

namespace LetItMuscleEffDataProvider.Entities;

public class LetItMuscleUser : IdentityUser,ILetItMuscleUser
{
    [PersonalData]

    public long? UtilisateurId { get; set; }
    [PersonalData]
    public Utilisateur? Utilisateur { get; set; }
}