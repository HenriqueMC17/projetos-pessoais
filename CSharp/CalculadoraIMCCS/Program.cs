using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Calculadora de IMC ===");
        Console.Write("Peso (kg): ");
        double peso = double.Parse(Console.ReadLine().Replace(",", "."), CultureInfo.InvariantCulture);
        Console.Write("Altura (m): ");
        double altura = double.Parse(Console.ReadLine().Replace(",", "."), CultureInfo.InvariantCulture);
        double imc = peso / (altura * altura);
        Console.WriteLine($"IMC: {imc:F2}");
        if (imc < 18.5) Console.WriteLine("Abaixo do peso");
        else if (imc < 25) Console.WriteLine("Peso normal");
        else if (imc < 30) Console.WriteLine("Sobrepeso");
        else Console.WriteLine("Obesidade");
    }
} 