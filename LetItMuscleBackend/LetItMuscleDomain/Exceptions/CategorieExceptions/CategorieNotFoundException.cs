using System;

namespace LetItMuscleDomain.Exceptions
{
    public class CategorieNotFoundException : Exception
    {
        public CategorieNotFoundException(string message) : base(message) { }
    }
}