namespace LetItMuscleDomain.Exceptions;

public class DuplicateReservationException : Exception
{
    public DuplicateReservationException() : base() { }
    public DuplicateReservationException(string message) : base(message) { }
    public DuplicateReservationException(string message, Exception inner) : base(message, inner) { }
}