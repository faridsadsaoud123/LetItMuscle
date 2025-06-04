namespace LetItMuscleDomain.Entities;

public class Categorie
{
   

    public long Id { get; set; }
    public string NomCategorie { get; set; }

    public override String ToString()
    {
        return NomCategorie;
    }
}