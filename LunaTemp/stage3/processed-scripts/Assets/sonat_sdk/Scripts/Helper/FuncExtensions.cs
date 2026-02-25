using System;

namespace sonat_sdk.Scripts.Helper
{
    public static class FuncExtensions
    {
        public static bool InvokeOr(this Func<bool> func)
        {
            if (func == null) return false;
            foreach (var @delegate in func.GetInvocationList())
            {
                var d = (Func<bool>)@delegate;
                if (d.Invoke()) return true;
            }

            return false;
        }

        public static bool InvokeOr<T>(this Func<T, bool> func, T arg)
        {
            if (func == null) return false;
            foreach (var @delegate in func.GetInvocationList())
            {
                var d = (Func<T, bool>)@delegate;
                if (d.Invoke(arg)) return true;
            }

            return false;
        }

        public static bool InvokeAnd(this Func<bool> func)
        {
            if (func == null) return true;

            foreach (var @delegate in func.GetInvocationList())
            {
                var d = (Func<bool>)@delegate;
                if (d.Invoke() == false) return false;
            }

            return true;
        }

        public static bool InvokeAnd<T>(this Func<T, bool> func, T arg)
        {
            if (func == null) return true;
            foreach (var @delegate in func.GetInvocationList())
            {
                var d = (Func<T, bool>)@delegate;
                if (d.Invoke(arg) == false) return false;
            }

            return true;
        }
    }
}