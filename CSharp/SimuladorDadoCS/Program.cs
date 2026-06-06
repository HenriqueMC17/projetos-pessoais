using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Simulador de Dado ===");
        Console.Write("Quantas vezes lançar o dado? ");
        int n = int.Parse(Console.ReadLine());
        Random rnd = new Random();
        for (int i = 0; i < n; i++)
        {
            int resultado = rnd.Next(1, 7);
            Console.WriteLine($"Lançamento {i+1}: {resultado}");
        }
    }
} 