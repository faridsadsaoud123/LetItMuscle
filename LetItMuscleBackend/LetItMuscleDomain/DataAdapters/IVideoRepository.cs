using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.DataAdapters;

public interface IVideoRepository : IRepository<Video>
{
    // Récupérer une vidéo par son nom
    Task<Video?> GetByNomAsync(string nomVideo);

    // Vérifier si une vidéo existe par son nom
    Task<bool> ExistsAsync(string nomVideo);

    // Récupérer toutes les vidéos d'une certaine catégorie
    Task<List<Video>> GetByCategorieAsync(long idCategorie);

    // Récupérer les vidéos les plus récentes (ex: top 10)
    Task<List<Video>> GetRecentVideosAsync(int limit);
    Task<int> CountAsync();
}
