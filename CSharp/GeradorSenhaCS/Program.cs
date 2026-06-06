using System;
using System.Text;

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Gerador de Senhas ===");
        Console.Write("Comprimento da senha: ");
        int tamanho = int.Parse(Console.ReadLine());
        string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        StringBuilder senha = new StringBuilder();
        Random rnd = new Random();
        for (int i = 0; i < tamanho; i++)
        {
            senha.Append(chars[rnd.Next(chars.Length)]);
        }
        Console.WriteLine($"Senha gerada: {senha}");
    }
} 