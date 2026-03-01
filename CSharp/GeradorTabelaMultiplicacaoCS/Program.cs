using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Gerador de Tabela de Multiplicação ===");
        Console.Write("Digite o número: ");
        int numero = int.Parse(Console.ReadLine());
        Console.Write("Limite: ");
        int limite = int.Parse(Console.ReadLine());
        for (int i = 1; i <= limite; i++)
        {
            Console.WriteLine($"{numero} x {i} = {numero * i}");
        }
    }
} 