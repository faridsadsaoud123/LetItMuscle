using System;
using System.Threading.Tasks;
using LetItMuscleDomain.DataAdapters;
using LetItMuscleDomain.DataAdapters.Repository;
using LetItMuscleDomain.Entities;
using LetItMuscleDomain.Exceptions.CategorieExceptions;

namespace LetItMuscleDomain.UseCases.Categorie.Create
{
    public class CreerCategorie(IRepositoryFactory factory)
    {
        

        public async Task<Entities.Categorie> ExecuteAsync(string nom)
        {
            if (string.IsNullOrWhiteSpace(nom))
            {
                throw new NomCategorieInvalideException("Le nom de la catégorie ne peut pas être vide.");
            }

            var nouvelleCategorie = new Entities.Categorie { NomCategorie = nom }; // Assure-toi que Categorie a bien une propriété "Nom"

            return await factory.CategorieRepository().AddAsync(nouvelleCategorie);
        }
    }
}