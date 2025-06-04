using System.Threading.Tasks;
using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Exceptions;

namespace LetItMuscleApplication.UseCases.CategorieUseCases
{
    public class DeleteCategorieUseCase
    {
        private readonly IRepositoryFactory _repositoryFactory;

        public DeleteCategorieUseCase(IRepositoryFactory repositoryFactory)
        {
            _repositoryFactory = repositoryFactory;
        }


        public async Task ExecuteAsync(long categorieId)
        {
            var categorieRepo = _repositoryFactory.CategorieRepository();

            var categorie = await categorieRepo.GetByIdAsync(categorieId);

            if (categorie == null)
            {
                throw new CategorieNotFoundException($"La catégorie avec l'ID {categorieId} n'existe pas.");
            }

            await categorieRepo.DeleteAsync(categorieId);
        }
    }
}