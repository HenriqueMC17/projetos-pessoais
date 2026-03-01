using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        string[] palavras = { "banana", "computador", "cachorro", "programador", "escola" };
        Random rnd = new Random();
        string palavra = palavras[rnd.Next(palavras.Length)];
        char[] display = new string('_', palavra.Length).ToCharArray();
        List<char> tentativas = new List<char>();
        int erros = 0, maxErros = 6;
        while (erros < maxErros && new string(display) != palavra)
        {
            Console.WriteLine($"Palavra: {string.Join(" ", display)}");
            Console.WriteLine($"Tentativas: {string.Join(", ", tentativas)}");
            Console.Write("Letra: ");
            char letra = char.ToLower(Console.ReadKey().KeyChar);
            Console.WriteLine();
            if (tentativas.Contains(letra)) continue;
            tentativas.Add(letra);
            if (palavra.Contains(letra))
            {
                for (int i = 0; i < palavra.Length; i++)
                    if (palavra[i] == letra) display[i] = letra;
            }
            else erros++;
        }
        if (new string(display) == palavra)
            Console.WriteLine($"Parabéns! Você acertou: {palavra}");
        else
            Console.WriteLine($"Você perdeu! A palavra era: {palavra}");
    }
} 