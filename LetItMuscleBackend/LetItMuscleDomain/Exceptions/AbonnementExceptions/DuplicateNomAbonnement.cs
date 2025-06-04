namespace LetItMuscleDomain.Exceptions.AbonnementExceptions;


[Serializable]
public class DuplicateNomAbonnement : Exception
{
    public DuplicateNomAbonnement() : base() { }
    public DuplicateNomAbonnement(string message) : base(message) { }
    public DuplicateNomAbonnement(string message, Exception inner) : base(message, inner) { }
}