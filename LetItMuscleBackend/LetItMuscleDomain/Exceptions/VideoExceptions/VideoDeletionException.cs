using System;

namespace LetItMuscleDomain.Exceptions;

public class VideoDeletionException : Exception
{
    public VideoDeletionException(string message) : base(message) { }
}