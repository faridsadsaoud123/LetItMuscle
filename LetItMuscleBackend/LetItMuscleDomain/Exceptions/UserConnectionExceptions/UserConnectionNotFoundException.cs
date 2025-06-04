namespace LetItMuscleDomain.Exceptions.UserConnectionExceptions;

public class UserConnectionNotFoundException : Exception
{
    public UserConnectionNotFoundException() : base() { }
    public UserConnectionNotFoundException(string message) : base(message) { }
    public UserConnectionNotFoundException(string message, Exception inner) : base(message, inner) { }
}