using System;

namespace LetItMuscleDomain.Exceptions.CategorieExceptions
{
    public class CategorieInvalideException : Exception
    {
        public CategorieInvalideException(string message) : base(message) { }
    }
}