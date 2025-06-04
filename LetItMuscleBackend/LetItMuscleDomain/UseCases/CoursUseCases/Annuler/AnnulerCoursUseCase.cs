using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Exceptions;

namespace LetItMuscleApplication.UseCases.CoursUseCases;

public class AnnulerCoursUseCase
{
    private readonly IRepositoryFactory _repositoryFactory;

    public AnnulerCoursUseCase(IRepositoryFactory repositoryFactory) // ✅ Ceci est le constructeur
    {
        _repositoryFactory = repositoryFactory;
    }

    public async Task ExecuteAsync(long id)
    {
        var cours = await _repositoryFactory.CoursRepository().FindAsync(id);
        if (cours == null)
            throw new NotFoundException("Cours non trouvé.");

        cours.Statut = "Annulé";
        await _repositoryFactory.CoursRepository().UpdateAsync(cours);
    }
}