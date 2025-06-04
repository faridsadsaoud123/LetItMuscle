namespace LetItMuscleDomain.Exceptions;

public class AdherentNotFoundException : Exception
{
    public AdherentNotFoundException() : base() { }
    public AdherentNotFoundException(string message) : base(message) { }
    public AdherentNotFoundException(string message, Exception inner) : base(message, inner) { }
}