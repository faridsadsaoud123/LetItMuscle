namespace LetItMuscleDomain.Exceptions.ReservationExceptions;

public class ReservationNotFoundException : Exception
{
    public ReservationNotFoundException() : base() { }
    public ReservationNotFoundException(string message) : base(message) { }
    public ReservationNotFoundException(string message, Exception inner) : base(message, inner) { }
}