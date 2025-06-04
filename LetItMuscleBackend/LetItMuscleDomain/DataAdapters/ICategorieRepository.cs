using System.Collections.Generic;
using System.Threading.Tasks;
using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.DataAdapters
{
    public interface ICategorieRepository : IRepository<Categorie>
    {
        Task<Categorie> GetByIdAsync(long id);
        Task<IEnumerable<Categorie>> GetAllAsync();
        Task<Categorie> AddAsync(Categorie categorie);
    }
}