using Microsoft.AspNetCore.Mvc;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Dtos;
using LetItMuscleDomain.Entities;
using LetItMuscleApplication.UseCases.CategorieUseCases;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.Exceptions.CategorieExceptions;
using LetItMuscleDomain.UseCases.Categorie.Create;
using Microsoft.AspNet.SignalR;


namespace LetItMuscleEntryPoint.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController(IRepositoryFactory repositoryFactory) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<CategorieDto>>> GetAll()
        {
            var useCase = new GetCategorieUseCase(repositoryFactory);
            try
            {
                var categories = await useCase.ExecuteAsync();
                return Ok(categories.Select(CategorieDto.FromEntity).ToList());
            }
            catch (Exception e)
            {
                return ValidationProblem(e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<CategorieDto>> Create([FromBody] CategorieDto categorieDto)
        {
            var useCase = new CreerCategorie(repositoryFactory);
            try
            {
                var categorieCree = await useCase.ExecuteAsync(categorieDto.NomCategorie);
                return CreatedAtAction(nameof(GetAll), new { id = categorieCree.Id }, CategorieDto.FromEntity(categorieCree));
            }
            catch (NomCategorieInvalideException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return ValidationProblem(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var useCase = new DeleteCategorieUseCase(repositoryFactory);
            try
            {
                await useCase.ExecuteAsync(id);
                return NoContent();
            }
            catch (CategorieNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return ValidationProblem(e.Message);
            }
        }
    }
}
