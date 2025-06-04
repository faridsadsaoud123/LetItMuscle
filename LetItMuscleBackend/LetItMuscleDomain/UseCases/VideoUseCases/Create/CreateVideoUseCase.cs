using System.Runtime.InteropServices.JavaScript;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions;

namespace LetItMuscleDomain.UseCases.VideoUseCases.Create;

public class CreateVideoUseCase(IRepositoryFactory repositoryFactory)
{
    public async Task<Video> ExecuteAsync(string nom,string description, DateTime dateAjout )
    {
        Video video = new Video{NomVideo = nom,Description = description,DateAjout = dateAjout};
        return await ExecuteAsync(video);
    }

    public async Task<Video> ExecuteAsync(Video video)
    {
        await CheckBusinessRules(video);

        // 💡 Detach manually if needed (rare, but safe)
        video.Categorie = null;

        return await repositoryFactory.VideoRepository().CreateAsync(video);
    }


    public async Task CheckBusinessRules(Video video)
    {
        ArgumentNullException.ThrowIfNull(video);

        var videos = await repositoryFactory.VideoRepository().FindByConditionAsync(v=>v.Id.Equals(video.Id));
        if (videos.Count>0)
        {
            throw new DuplicateVideoException(video.NomVideo + "not found");
        }
    }
}