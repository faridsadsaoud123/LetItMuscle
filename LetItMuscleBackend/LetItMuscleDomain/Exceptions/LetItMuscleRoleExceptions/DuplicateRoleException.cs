using System;

namespace LetItMuscleDomain.Exceptions
{
    public class DuplicateRoleException : Exception
    {
        public DuplicateRoleException(string message) : base(message) { }
    }
}