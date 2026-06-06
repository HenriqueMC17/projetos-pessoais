using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Conversor de Moedas ===");
        Console.Write("Valor a converter: ");
        double valor = double.Parse(Console.ReadLine().Replace(",", "."), CultureInfo.InvariantCulture);

        Console.WriteLine("Moeda de origem (BRL, USD, EUR): ");
        string origem = Console.ReadLine().ToUpper();
        Console.WriteLine("Moeda de destino (BRL, USD, EUR): ");
        string destino = Console.ReadLine().ToUpper();

        double taxa = 1.0;
        if (origem == destino)
        {
            taxa = 1.0;
        }
        else if (origem == "BRL" && destino == "USD") taxa = 0.20;
        else if (origem == "BRL" && destino == "EUR") taxa = 0.18;
        else if (origem == "USD" && destino == "BRL") taxa = 5.0;
        else if (origem == "USD" && destino == "EUR") taxa = 0.90;
        else if (origem == "EUR" && destino == "BRL") taxa = 5.5;
        else if (origem == "EUR" && destino == "USD") taxa = 1.11;
        else
        {
            Console.WriteLine("Conversão não suportada.");
            return;
        }
        double convertido = valor * taxa;
        Console.WriteLine($"{valor:F2} {origem} = {convertido:F2} {destino}");
    }
} 