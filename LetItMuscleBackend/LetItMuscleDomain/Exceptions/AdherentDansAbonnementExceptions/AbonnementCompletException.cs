namespace LetItMuscleDomain.Exceptions.AdherentDansAbonnementExceptions;

public class AbonnementCompletException : Exception
{
    public AbonnementCompletException(string message) : base(message) { }
}