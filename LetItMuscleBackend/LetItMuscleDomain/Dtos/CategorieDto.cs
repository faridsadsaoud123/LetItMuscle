using LetItMuscleDomain.Entities;

namespace LetItMuscleDomain.Dtos
{
    public class CategorieDto
    {
        public long Id { get; set; }
        public string NomCategorie { get; set; }

        public static CategorieDto FromEntity(Categorie categorie)
        {
            return new CategorieDto
            {
                Id = categorie.Id,
                NomCategorie = categorie.NomCategorie
            };
        }

        public Categorie ToEntity()
        {
            return new Categorie
            {
                Id = this.Id,
                NomCategorie = this.NomCategorie
            };
        }
    }
}