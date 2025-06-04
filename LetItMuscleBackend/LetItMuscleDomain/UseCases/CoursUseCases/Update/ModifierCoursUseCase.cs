using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;

namespace LetItMuscleApplication.UseCases.CoursUseCases;

public class ModifierCoursUseCase(IRepositoryFactory repositoryFactory)
{
    

    public async Task ExecuteAsync(long id, string nouvelleDescription, DateTime nouvelleDate, TimeSpan nouvelleHeure, int nouveauNbrPlaces)
    {
        // Vérifier si le cours existe
        var cours = await repositoryFactory.CoursRepository().FindAsync(id);
        if (cours == null)
        {
            throw new NotFoundException($"Cours avec ID {id} non trouvé.");
        }

        // Vérifier que le nombre de places est valide
        if (nouveauNbrPlaces <= 0)
        {
            throw new InvalidCoursException("Le nombre de places doit être supérieur à zéro.");
        }

        // Modifier les propriétés
        cours.Description = nouvelleDescription;
        cours.DateCours = nouvelleDate.Date;
        cours.HeureCours = nouvelleHeure;  
        cours.NbrPlaces = nouveauNbrPlaces;

        // Sauvegarder les changements
        await repositoryFactory.CoursRepository().UpdateAsync(cours);
    }
}