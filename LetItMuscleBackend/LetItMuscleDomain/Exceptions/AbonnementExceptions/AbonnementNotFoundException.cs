namespace LetItMuscleDomain.Exceptions.AbonnementExceptions;

public class AbonnementNotFoundException : Exception
{
    public AbonnementNotFoundException(string message) : base(message) { }
}