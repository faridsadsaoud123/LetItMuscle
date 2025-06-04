using System;

namespace LetItMuscleDomain.Exceptions.CategorieExceptions
{
    public class NomCategorieInvalideException : Exception
    {
        public NomCategorieInvalideException(string message) : base(message) { }
    }
}