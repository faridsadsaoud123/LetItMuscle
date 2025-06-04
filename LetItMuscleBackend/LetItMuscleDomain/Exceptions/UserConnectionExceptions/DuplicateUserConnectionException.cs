namespace LetItMuscleDomain.Exceptions.UserConnectionExceptions;

public class DuplicateUserConnectionException : Exception
{
    public DuplicateUserConnectionException() : base() { }
    public DuplicateUserConnectionException(string message) : base(message) { }
    public DuplicateUserConnectionException(string message, Exception inner) : base(message, inner) { }
}