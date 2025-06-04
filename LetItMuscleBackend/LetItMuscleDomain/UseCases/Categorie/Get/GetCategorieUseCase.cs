using System.Collections.Generic;
using System.Threading.Tasks;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.DataAdapters.Repository;

namespace LetItMuscleApplication.UseCases.CategorieUseCases
{
    public class GetCategorieUseCase
    {
        private readonly IRepositoryFactory _repositoryFactory;

        public GetCategorieUseCase(IRepositoryFactory repositoryFactory)
        {
            _repositoryFactory = repositoryFactory;
        }

        public async Task<IEnumerable<Categorie>> ExecuteAsync()
        {
            var categorieRepo = _repositoryFactory.CategorieRepository();
            return await categorieRepo.GetAllAsync();
        }
    }
}