namespace LetItMuscleDomain.Exceptions.CategorieExceptions
{
    public class CategorieAlreadyExistsException : CategorieException
    {
        public CategorieAlreadyExistsException(string name)
            : base($"La catégorie '{name}' existe déjà.")
        {
        }
    }
}