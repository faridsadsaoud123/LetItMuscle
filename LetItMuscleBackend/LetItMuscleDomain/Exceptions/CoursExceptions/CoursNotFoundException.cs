namespace LetItMuscleDomain.Exceptions;

public class CoursNotFoundException : Exception
{
    public CoursNotFoundException() : base() { }
    public CoursNotFoundException(string message) : base(message) { }
    public CoursNotFoundException(string message, Exception inner) : base(message, inner) { }
}