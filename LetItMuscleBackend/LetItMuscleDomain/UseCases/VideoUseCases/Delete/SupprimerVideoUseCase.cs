using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;

namespace LetItMuscleApplication.UseCases.VideosUseCase;

public class SupprimerVideoUseCase(IRepositoryFactory repositoryFactory)
{
    

    public async Task ExecuteAsync(long id)
    {
        // Vérifier si la vidéo existe
        var video = await repositoryFactory.VideoRepository().FindAsync(id);
        if (video == null)
        {
            throw new NotFoundException($"Vidéo avec ID {id} non trouvée.");
        }

        

        // Supprimer la vidéo
        await repositoryFactory.VideoRepository().DeleteAsync(video);
    }
}