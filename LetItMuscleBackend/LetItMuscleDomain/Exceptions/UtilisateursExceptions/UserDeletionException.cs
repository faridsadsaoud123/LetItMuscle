using System;

namespace LetItMuscleDomain.Exceptions;

public class UserDeletionException : Exception
{
    public UserDeletionException(string message) : base(message) { }
}