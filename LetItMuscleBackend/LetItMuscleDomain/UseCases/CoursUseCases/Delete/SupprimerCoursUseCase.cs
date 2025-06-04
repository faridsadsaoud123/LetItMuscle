using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.UseCases.CoursUseCases.Delete;

public class SupprimerCoursUseCase
{
    private readonly ICoursRepository _coursRepository;

    //  Correction : On injecte IRepositoryFactory et on récupère le repository dans le constructeur
    public SupprimerCoursUseCase(IRepositoryFactory repositoryFactory)
    {
        _coursRepository = repositoryFactory.CoursRepository();
    }

    public async Task ExecuteAsync(long coursId)
    {
        // 🔎 1️⃣ Vérifier si le cours existe
        var cours = await _coursRepository.FindAsync(coursId);
        if (cours == null)
            throw new CoursNotFoundException($"Le cours avec l'ID {coursId} n'existe pas.");

        // Supprimer le cours (même si des adhérents y sont inscrits)
        await _coursRepository.DeleteAsync(coursId);

        //  Sauvegarder les changements
        await _coursRepository.SaveChangesAsync();
    }
}