using System.Text.RegularExpressions;

namespace SonatFramework.Scripts.Helper
{
    public static class SonatFrameworkHelper
    {
        public static string SplitByUppercase(this string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;

            return Regex.Replace(input, "(?<!^)([A-Z])", " $1");
        }
    }
}
