namespace LetItMuscleDomain.Exceptions.AdherentDansAbonnementExceptions;

public class UtilisateurNotFoundException : Exception
{
    public UtilisateurNotFoundException(string message) : base(message) { }
}