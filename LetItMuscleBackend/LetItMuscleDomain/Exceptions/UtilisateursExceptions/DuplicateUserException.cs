namespace LetItMuscleDomain.Exceptions;

public class DuplicateUserException : Exception
{
    public DuplicateUserException() : base() { }
    public DuplicateUserException(string message) : base(message) { }
    public DuplicateUserException(string message, Exception inner) : base(message, inner) { }
}