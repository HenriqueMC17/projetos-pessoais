using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Validador de CPF ===");
        Console.Write("Digite o CPF (apenas números): ");
        string cpf = Console.ReadLine();
        if (cpf.Length != 11 || !long.TryParse(cpf, out _))
        {
            Console.WriteLine("CPF inválido!");
            return;
        }
        bool valido = ValidarCPF(cpf);
        Console.WriteLine(valido ? "CPF válido!" : "CPF inválido!");
    }
    static bool ValidarCPF(string cpf)
    {
        int[] mult1 = {10,9,8,7,6,5,4,3,2};
        int[] mult2 = {11,10,9,8,7,6,5,4,3,2};
        string tempCpf = cpf.Substring(0,9);
        int soma = 0;
        for(int i=0;i<9;i++) soma += int.Parse(tempCpf[i].ToString()) * mult1[i];
        int resto = soma % 11;
        int dig1 = resto < 2 ? 0 : 11 - resto;
        tempCpf += dig1;
        soma = 0;
        for(int i=0;i<10;i++) soma += int.Parse(tempCpf[i].ToString()) * mult2[i];
        resto = soma % 11;
        int dig2 = resto < 2 ? 0 : 11 - resto;
        return cpf.EndsWith($"{dig1}{dig2}");
    }
} 