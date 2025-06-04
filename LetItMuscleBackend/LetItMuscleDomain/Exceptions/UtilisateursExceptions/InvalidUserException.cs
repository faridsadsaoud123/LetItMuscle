using System;

namespace LetItMuscleDomain.Exceptions;

public class InvalidUserException : Exception
{
    public InvalidUserException(string message) : base(message) { }
}