using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;

namespace LetItMuscleDomain.UseCases.CoursUseCases.Get;

public class GetCoursUseCase
{
    private readonly IRepositoryFactory _repositoryFactory;

    public GetCoursUseCase(IRepositoryFactory repositoryFactory)
    {
        _repositoryFactory = repositoryFactory;
    }

    // 🔎 1️⃣ Récupérer un cours par son ID
    public async Task<List<Cours>> ExecuteAsync()
    {
        var coursList = await _repositoryFactory.CoursRepository().FindAllAsync();

        foreach (var cours in coursList)
        {
            cours.categorie = await _repositoryFactory.CategorieRepository().FindAsync(cours.categoryId);
            cours.Coach = await _repositoryFactory.UtilisateurRepository().FindAsync(cours.coachId);
        }

        return coursList;
    }

    public async Task<Cours> ExecuteAsync(long coursId)
    {
        var cours = await _repositoryFactory.CoursRepository().FindAsync(coursId);
        if (cours == null)
            throw new CoursNotFoundException($"Le cours avec l'ID {coursId} n'existe pas.");

        // Charger la catégorie et le coach
        cours.categorie = await _repositoryFactory.CategorieRepository().FindAsync(cours.categoryId);
        cours.Coach = await _repositoryFactory.UtilisateurRepository().FindAsync(cours.coachId);

        return cours;
    }

}