using System;
using System.Threading.Tasks;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;

namespace LetItMuscleDomain.UseCases.CoursUseCases
{
    public class CreerCoursUseCase(IRepositoryFactory repositoryFactory)
    {
        
        public async Task<Cours> ExecuteAsync(string description, DateTime dateCours, int nbrPlaces, long coachId, long categoryId)
        {
            if (string.IsNullOrWhiteSpace(description))
                throw new InvalidCoursException("La description du cours ne peut pas être vide.");

            if (nbrPlaces <= 0)
                throw new InvalidCoursException("Le nombre de places doit être supérieur à zéro.");

            var nouveauCours = new Cours
            {
                Description = description,
                DateCours = dateCours.Date,
                HeureCours = dateCours.TimeOfDay,
                NbrPlaces = nbrPlaces,
                coachId = coachId,
                categoryId = categoryId
            };

            return await repositoryFactory.CoursRepository().AddAsync(nouveauCours);
        }

    }
}