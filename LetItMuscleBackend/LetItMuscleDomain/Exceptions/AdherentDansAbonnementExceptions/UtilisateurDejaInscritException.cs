namespace LetItMuscleDomain.Exceptions.AdherentDansAbonnementExceptions;

public class UtilisateurDejaInscritException : Exception
{
    public UtilisateurDejaInscritException(string message) : base(message) { }
}