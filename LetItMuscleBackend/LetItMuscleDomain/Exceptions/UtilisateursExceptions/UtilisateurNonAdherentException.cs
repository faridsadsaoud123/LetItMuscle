namespace LetItMuscleDomain.Exceptions;

public class UtilisateurNonAdherentException : Exception
{
    public UtilisateurNonAdherentException() : base() { }
    public UtilisateurNonAdherentException(string message) : base(message) { }
    public UtilisateurNonAdherentException(string message, Exception inner) : base(message, inner) { }
}