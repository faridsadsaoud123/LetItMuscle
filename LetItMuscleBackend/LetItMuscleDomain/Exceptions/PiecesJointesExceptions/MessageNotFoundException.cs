namespace LetItMuscleDomain.Exceptions.PiecesJointesExceptions;

public class MessageNotFoundException : Exception
{
    public MessageNotFoundException(string message) : base(message) { }
}