using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.Dtos;

public class VideoDto
{
    public long Id { get; set; }
    public string NomVideo { get; set; }
    public DateTime DateAjout { get; set; }
    public string Description { get; set; }

    public VideoDto ToDto(Video video)
    {
        Id = video.Id;
        NomVideo = video.NomVideo;
        Description = video.Description;
        DateAjout = video.DateAjout;
        return this;
    }

    public Video ToEntity()
    {
        return new Video{Id = this.Id, NomVideo = this.NomVideo, DateAjout = this.DateAjout};
    }
}