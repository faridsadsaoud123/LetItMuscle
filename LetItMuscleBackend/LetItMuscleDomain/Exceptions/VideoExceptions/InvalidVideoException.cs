using System;

namespace LetItMuscleDomain.Exceptions;

public class InvalidVideoException : Exception
{
    public InvalidVideoException(string message) : base(message) { }
}