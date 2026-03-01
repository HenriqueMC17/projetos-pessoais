using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Conversor de Temperatura ===");
        Console.Write("Temperatura: ");
        double temp = double.Parse(Console.ReadLine().Replace(",", "."), CultureInfo.InvariantCulture);
        Console.Write("Converter para (C/F): ");
        string tipo = Console.ReadLine().ToUpper();
        if (tipo == "C")
        {
            double c = (temp - 32) * 5 / 9;
            Console.WriteLine($"{temp}°F = {c:F2}°C");
        }
        else if (tipo == "F")
        {
            double f = temp * 9 / 5 + 32;
            Console.WriteLine($"{temp}°C = {f:F2}°F");
        }
        else
        {
            Console.WriteLine("Opção inválida!");
        }
    }
} 