using System;

namespace LetItMuscleDomain.Exceptions.CategorieExceptions
{
    public class CategorieNonTrouveeException : Exception
    {
        public CategorieNonTrouveeException(string message) : base(message) { }
    }
}