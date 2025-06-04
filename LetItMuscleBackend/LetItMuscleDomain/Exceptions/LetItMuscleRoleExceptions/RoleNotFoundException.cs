using System;

namespace LetItMuscleDomain.Exceptions
{
    public class RoleNotFoundException : Exception
    {
        public RoleNotFoundException(string message) : base(message) { }
    }
}