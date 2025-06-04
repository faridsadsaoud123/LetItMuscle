using LetItMuscleApplication.UseCases.CoursUseCases;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Dtos;
using LetItMuscleDomain.UseCases.CoursUseCases;
using LetItMuscleDomain.UseCases.CoursUseCases.Delete;
using LetItMuscleDomain.UseCases.CoursUseCases.Get;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace LetItMuscleEntryPoint.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CoursController(IRepositoryFactory repositoryFactory) : ControllerBase
{
    [HttpGet("All")]
    public async Task<ActionResult<List<CoursDto>>> GetAllCours()
    {
        var useCase = new GetCoursUseCase(repositoryFactory);
        var cours = await useCase.ExecuteAsync();
        return Ok(cours.Select(CoursDto.FromEntity));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CoursDto>> GetCoursById(long id)
    {
        var useCase = new GetCoursUseCase(repositoryFactory);
        var cours = await useCase.ExecuteAsync(id);
        return Ok(CoursDto.FromEntity(cours));
    }

    [HttpPost("creer")]
    public async Task<ActionResult<CoursDto>> CreerCours([FromBody] CoursDto dto)
    {
        var useCase = new CreerCoursUseCase(repositoryFactory);

        // Conversion Date et Heure en DateTime complet
        var date = DateTime.ParseExact(dto.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        var heure = TimeSpan.Parse(dto.Heure);
        var dateTimeCours = date.Add(heure);

        var cours = await useCase.ExecuteAsync(
            dto.Description,
            dateTimeCours,
            dto.Places,
            dto.CoachId,
            dto.CategorieId // categoryId à adapter
        );
        return Ok(CoursDto.FromEntity(cours));
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> ModifierCours(long id, [FromBody] CoursDto dto)
    {
        var useCase = new ModifierCoursUseCase(repositoryFactory);

        var date = DateTime.ParseExact(dto.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        var heure = TimeSpan.Parse(dto.Heure);
        var dateTimeCours = date.Add(heure);

        await useCase.ExecuteAsync(id, dto.Description, date, heure, dto.Places);
        return NoContent();
    }
    
    [HttpPut("{id}/annuler")]
    public async Task<IActionResult> AnnulerCours(long id)
    {
        var useCase = new AnnulerCoursUseCase(repositoryFactory);
        await useCase.ExecuteAsync(id);
        return Ok("Cours annulé !");
    }



    [HttpDelete("delete/{id}")] 
    public async Task<IActionResult> SupprimerCours(long id)
    {
        var useCase = new SupprimerCoursUseCase(repositoryFactory);
        await useCase.ExecuteAsync(id);
        return NoContent();
    }

    [HttpPost("{id}/ajouter-adherent/{adherentId}")]
    public async Task<IActionResult> AjouterAdherent(long id, long adherentId)
    {
        var useCase = new AdherentDansCoursUseCase(repositoryFactory);
        await useCase.ExecuteAsync(id, adherentId);
        return Ok("Adhérent ajouté au cours !");
    } 
    [HttpGet("adherent/{adherentId}/reservations")]
    public async Task<ActionResult<List<CoursDto>>> GetCoursReservesParAdherent(long adherentId)
    {
        var cours = await repositoryFactory.CoursRepository().GetCoursReservesParAdherentAsync(adherentId);

        return Ok(cours.Select(CoursDto.FromEntity));
    }
    [HttpGet("par-date/{date}")]
    public async Task<ActionResult<List<CoursDto>>> GetCoursParDate(string date)
    {
        var useCase = new GetCoursUseCase(repositoryFactory);
        var allCourses = await useCase.ExecuteAsync();
        var today = DateTime.Today;

        var dates = allCourses
            .Where(c => c.DateCours.Date >= today && c.Statut != "Annulé")
            .Select(c => c.DateCours.ToString("yyyy-MM-dd"))
            .Distinct()
            .ToList();

        return Ok(dates);
    }
    [HttpDelete("{coursId}/annuler-reservation/{adherentId}")]
    public async Task<IActionResult> AnnulerReservation(long coursId, long adherentId)
    {
        var repository = repositoryFactory.CoursRepository();
        Console.WriteLine($"Annulation reservation: coursId={coursId}, adherentId={adherentId}");
        var cours = await repository.FindByIdWithAdherentsAsync(coursId);
        
        if (cours == null || !cours.adherentsInscrits.Any(a => a.Id == adherentId))
            return NotFound("Cours ou réservation introuvable");

        var adherent = cours.adherentsInscrits.First(a => a.Id == adherentId);
        cours.adherentsInscrits.Remove(adherent);
        cours.NbrPlaces++;

        await repositoryFactory.SaveChangesAsync();
        return Ok("Réservation annulée");
    }


}
