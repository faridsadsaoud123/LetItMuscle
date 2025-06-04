using System;

namespace LetItMuscleDomain.Exceptions;

public class MessageValidationException : Exception
{
    public MessageValidationException(string message) : base(message) { }
}