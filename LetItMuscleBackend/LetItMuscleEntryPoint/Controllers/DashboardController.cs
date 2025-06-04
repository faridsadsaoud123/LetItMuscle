using LetItMuscleDomain.DataAdapters.Repository;
using Microsoft.AspNetCore.Mvc;

namespace LetItMuscleEntryPoint.Controllers;
[Route("api/[controller]")]
[ApiController]
public class DashboardController(IRepositoryFactory repositoryFactory) : ControllerBase
{
    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        

        var totalUsers = await repositoryFactory.UtilisateurRepository().CountAsync();
        var totalCours = await  repositoryFactory.CoursRepository().CountAsync();
        var totalAbonnements = await repositoryFactory.AbonnementRepository().CountAsync();

        var stats = new
        {
            utilisateurs = totalUsers,
            cours = totalCours,
            abonnements = totalAbonnements
        };

        return Ok(stats);
    }
}