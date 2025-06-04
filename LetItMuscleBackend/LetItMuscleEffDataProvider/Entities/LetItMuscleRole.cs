using LetItMuscleDomain.Entities;
using Microsoft.AspNetCore.Identity;

namespace LetItMuscleEffDataProvider.Entities;

public class LetItMuscleRole : IdentityRole,ILetItMuscleRole
{
    private string _role = string.Empty;
    
    public LetItMuscleRole() : base()
    {
    }
    public LetItMuscleRole(string role) : base(role)
    {
        _role = role;
    }
}