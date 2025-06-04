using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;
using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;

namespace LetItMuscleApplication.UseCases.VideosUseCase;

public class ModifierVideoUseCase(IRepositoryFactory repositoryFactory)
{
    
    public async Task ExecuteAsync(long id, string nomVideo, DateTime dateAjout, string description)
    {
        // Vérifier si la vidéo existe
        var video = await repositoryFactory.VideoRepository().FindAsync(id);
        if (video == null)
        {
            throw new NotFoundException($"Vidéo avec ID {id} non trouvée.");
        }

        // Vérifier que les données sont valides
        if (string.IsNullOrWhiteSpace(nomVideo))
        {
            throw new InvalidVideoException("Le nom de la vidéo ne peut pas être vide.");
        }

        if (string.IsNullOrWhiteSpace(description))
        {
            throw new InvalidVideoException("La description ne peut pas être vide.");
        }

        // Modifier les propriétés
        video.NomVideo = nomVideo;
        video.DateAjout = dateAjout;
        video.Description = description;

        // Sauvegarder les changements
        await repositoryFactory.VideoRepository().UpdateAsync(video);
    }
}