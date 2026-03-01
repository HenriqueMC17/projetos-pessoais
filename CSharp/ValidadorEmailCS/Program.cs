using System;
using System.Text.RegularExpressions;

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Validador de E-mail ===");
        Console.Write("Digite o e-mail: ");
        string email = Console.ReadLine();
        bool valido = Regex.IsMatch(email, @"^[\w\.-]+@[\w\.-]+\.\w{2,}$");
        Console.WriteLine(valido ? "E-mail válido!" : "E-mail inválido!");
    }
} 