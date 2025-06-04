using System;

namespace LetItMuscleDomain.Exceptions;

public class InvalidCoursException : Exception
{
    public InvalidCoursException(string message) : base(message) { }
}