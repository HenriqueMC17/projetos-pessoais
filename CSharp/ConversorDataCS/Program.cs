using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Conversor de Data ===");
        Console.Write("Digite a data (dd/MM/yyyy): ");
        string entrada = Console.ReadLine();
        if (DateTime.TryParseExact(entrada, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime data))
        {
            Console.WriteLine($"ISO: {data:yyyy-MM-dd}");
            Console.WriteLine($"Americano: {data:MM/dd/yyyy}");
            Console.WriteLine($"Dia da semana: {data:dddd}");
        }
        else
        {
            Console.WriteLine("Data inválida!");
        }
    }
} 