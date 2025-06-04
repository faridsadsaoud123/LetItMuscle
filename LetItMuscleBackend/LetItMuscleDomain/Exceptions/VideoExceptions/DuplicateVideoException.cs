namespace LetItMuscleDomain.Exceptions;

public class DuplicateVideoException : Exception
{
    public DuplicateVideoException() : base() { }
    public DuplicateVideoException(string message) : base(message) { }
    public DuplicateVideoException(string message, Exception inner) : base(message, inner) { }
}