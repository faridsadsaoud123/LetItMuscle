using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;

namespace LetItMuscleApplication.UseCases.VideosUseCase;

public class GetVideoUseCase(IRepositoryFactory repositoryFactory)
{
    

    // Récupérer une vidéo par ID
    public async Task<Video> GetByIdAsync(long id)
    {
        var video = await repositoryFactory.VideoRepository().FindAsync(id);
        if (video == null)
        {
            throw new NotFoundException($"Vidéo avec ID {id} non trouvée.");
        }
        return video;
    }

    // Récupérer toutes les vidéos
    public async Task<List<Video>> GetAllAsync()
    {
        return await repositoryFactory.VideoRepository().FindAllAsync();
    }

    // Récupérer toutes les vidéos d'une catégorie spécifique
    public async Task<List<Video>> GetByCategorieAsync(long categorieId)
    {
        return await repositoryFactory.VideoRepository().GetByCategorieAsync(categorieId);
    }
}