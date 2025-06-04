using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.DataAdapters;


public interface ICoursRepository : IRepository<Cours>
{
    Task<Cours> AddAsync(Cours cours);
    Task<Cours> AddAdherentAsync(long coursId, long adherentId);
    Task<Cours> AddAdherentAsync(long coursId, long[] utilsateurIds);
    Task<int> CountAsync();
    Task<List<Cours>> GetCoursReservesParAdherentAsync(long adherentId);
    Task<Cours?> FindByIdWithAdherentsAsync(long coursId);
}