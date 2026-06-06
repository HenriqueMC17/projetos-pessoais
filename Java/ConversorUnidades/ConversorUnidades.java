import java.util.*;

public class ConversorUnidades {
    private static Scanner scanner = new Scanner(System.in);
    private static List<String> historico = new ArrayList<>();
    
    public static void main(String[] args) {
        System.out.println("=== CONVERSOR DE UNIDADES ===");
        exibirMenu();
    }
    
    private static void exibirMenu() {
        while (true) {
            System.out.println("\nEscolha o tipo de conversão:");
            System.out.println("1. Comprimento");
            System.out.println("2. Peso");
            System.out.println("3. Temperatura");
            System.out.println("4. Volume");
            System.out.println("5. Tempo");
            System.out.println("6. Ver histórico");
            System.out.println("7. Sair");
            System.out.print("Opção: ");
            
            try {
                int opcao = Integer.parseInt(scanner.nextLine());
                
                switch (opcao) {
                    case 1:
                        converterComprimento();
                        break;
                    case 2:
                        converterPeso();
                        break;
                    case 3:
                        converterTemperatura();
                        break;
                    case 4:
                        converterVolume();
                        break;
                    case 5:
                        converterTempo();
                        break;
                    case 6:
                        mostrarHistorico();
                        break;
                    case 7:
                        System.out.println("Programa encerrado!");
                        return;
                    default:
                        System.out.println("Opção inválida!");
                }
            } catch (NumberFormatException e) {
                System.out.println("Por favor, digite um número válido!");
            }
        }
    }
    
    private static void converterComprimento() {
        System.out.println("\n=== CONVERSÃO DE COMPRIMENTO ===");
        System.out.println("Unidades disponíveis:");
        System.out.println("1. Metros (m)");
        System.out.println("2. Centímetros (cm)");
        System.out.println("3. Quilômetros (km)");
        System.out.println("4. Polegadas (in)");
        System.out.println("5. Pés (ft)");
        System.out.println("6. Jardas (yd)");
        System.out.println("7. Milhas (mi)");
        
        try {
            System.out.print("Digite o valor: ");
            double valor = Double.parseDouble(scanner.nextLine().replace(",", "."));
            
            System.out.print("De qual unidade (1-7): ");
            int deUnidade = Integer.parseInt(scanner.nextLine());
            
            System.out.print("Para qual unidade (1-7): ");
            int paraUnidade = Integer.parseInt(scanner.nextLine());
            
            if (deUnidade < 1 || deUnidade > 7 || paraUnidade < 1 || paraUnidade > 7) {
                System.out.println("Unidade inválida!");
                return;
            }
            
            double resultado = converterComprimento(valor, deUnidade, paraUnidade);
            String[] unidades = {"", "m", "cm", "km", "in", "ft", "yd", "mi"};
            
            System.out.printf("\nResultado: %.4f %s = %.4f %s\n", 
                valor, unidades[deUnidade], resultado, unidades[paraUnidade]);
            
            adicionarHistorico(String.format("Comprimento: %.2f %s = %.4f %s", 
                valor, unidades[deUnidade], resultado, unidades[paraUnidade]));
                
        } catch (NumberFormatException e) {
            System.out.println("Valor inválido!");
        }
    }
    
    private static double converterComprimento(double valor, int de, int para) {
        // Primeiro converte para metros
        double metros = 0;
        switch (de) {
            case 1: metros = valor; break; // metros
            case 2: metros = valor / 100; break; // cm para m
            case 3: metros = valor * 1000; break; // km para m
            case 4: metros = valor * 0.0254; break; // polegadas para m
            case 5: metros = valor * 0.3048; break; // pés para m
            case 6: metros = valor * 0.9144; break; // jardas para m
            case 7: metros = valor * 1609.344; break; // milhas para m
        }
        
        // Depois converte de metros para a unidade de destino
        switch (para) {
            case 1: return metros; // metros
            case 2: return metros * 100; // m para cm
            case 3: return metros / 1000; // m para km
            case 4: return metros / 0.0254; // m para polegadas
            case 5: return metros / 0.3048; // m para pés
            case 6: return metros / 0.9144; // m para jardas
            case 7: return metros / 1609.344; // m para milhas
            default: return metros;
        }
    }
    
    private static void converterPeso() {
        System.out.println("\n=== CONVERSÃO DE PESO ===");
        System.out.println("Unidades disponíveis:");
        System.out.println("1. Quilogramas (kg)");
        System.out.println("2. Gramas (g)");
        System.out.println("3. Libras (lb)");
        System.out.println("4. Onças (oz)");
        System.out.println("5. Toneladas (t)");
        
        try {
            System.out.print("Digite o valor: ");
            double valor = Double.parseDouble(scanner.nextLine().replace(",", "."));
            
            System.out.print("De qual unidade (1-5): ");
            int deUnidade = Integer.parseInt(scanner.nextLine());
            
            System.out.print("Para qual unidade (1-5): ");
            int paraUnidade = Integer.parseInt(scanner.nextLine());
            
            if (deUnidade < 1 || deUnidade > 5 || paraUnidade < 1 || paraUnidade > 5) {
                System.out.println("Unidade inválida!");
                return;
            }
            
            double resultado = converterPeso(valor, deUnidade, paraUnidade);
            String[] unidades = {"", "kg", "g", "lb", "oz", "t"};
            
            System.out.printf("\nResultado: %.4f %s = %.4f %s\n", 
                valor, unidades[deUnidade], resultado, unidades[paraUnidade]);
            
            adicionarHistorico(String.format("Peso: %.2f %s = %.4f %s", 
                valor, unidades[deUnidade], resultado, unidades[paraUnidade]));
                
        } catch (NumberFormatException e) {
            System.out.println("Valor inválido!");
        }
    }
    
    private static double converterPeso(double valor, int de, int para) {
        // Primeiro converte para quilogramas
        double kg = 0;
        switch (de) {
            case 1: kg = valor; break; // kg
            case 2: kg = valor / 1000; break; // g para kg
            case 3: kg = valor * 0.453592; break; // lb para kg
            case 4: kg = valor * 0.0283495; break; // oz para kg
            case 5: kg = valor * 1000; break; // t para kg
        }
        
        // Depois converte de kg para a unidade de destino
        switch (para) {
            case 1: return kg; // kg
            case 2: return kg * 1000; // kg para g
            case 3: return kg / 0.453592; // kg para lb
            case 4: return kg / 0.0283495; // kg para oz
            case 5: return kg / 1000; // kg para t
            default: return kg;
        }
    }
    
    private static void converterTemperatura() {
        System.out.println("\n=== CONVERSÃO DE TEMPERATURA ===");
        System.out.println("Unidades disponíveis:");
        System.out.println("1. Celsius (°C)");
        System.out.println("2. Fahrenheit (°F)");
        System.out.println("3. Kelvin (K)");
        
        try {
            System.out.print("Digite o valor: ");
            double valor = Double.parseDouble(scanner.nextLine().replace(",", "."));
            
            System.out.print("De qual unidade (1-3): ");
            int deUnidade = Integer.parseInt(scanner.nextLine());
            
            System.out.print("Para qual unidade (1-3): ");
            int paraUnidade = Integer.parseInt(scanner.nextLine());
            
            if (deUnidade < 1 || deUnidade > 3 || paraUnidade < 1 || paraUnidade > 3) {
                System.out.println("Unidade inválida!");
                return;
            }
            
            double resultado = converterTemperatura(valor, deUnidade, paraUnidade);
            String[] unidades = {"", "°C", "°F", "K"};
            
            System.out.printf("\nResultado: %.2f %s = %.2f %s\n", 
                valor, unidades[deUnidade], resultado, unidades[paraUnidade]);
            
            // Mostra a fórmula utilizada
            mostrarFormulaTemperatura(valor, deUnidade, paraUnidade, resultado);
            
            adicionarHistorico(String.format("Temperatura: %.2f %s = %.2f %s", 
                valor, unidades[deUnidade], resultado, unidades[paraUnidade]));
                
        } catch (NumberFormatException e) {
            System.out.println("Valor inválido!");
        }
    }
    
    private static double converterTemperatura(double valor, int de, int para) {
        // Primeiro converte para Celsius
        double celsius = 0;
        switch (de) {
            case 1: celsius = valor; break; // Celsius
            case 2: celsius = (valor - 32) * 5/9; break; // Fahrenheit para Celsius
            case 3: celsius = valor - 273.15; break; // Kelvin para Celsius
        }
        
        // Depois converte de Celsius para a unidade de destino
        switch (para) {
            case 1: return celsius; // Celsius
            case 2: return celsius * 9/5 + 32; // Celsius para Fahrenheit
            case 3: return celsius + 273.15; // Celsius para Kelvin
            default: return celsius;
        }
    }
    
    private static void mostrarFormulaTemperatura(double valor, int de, int para, double resultado) {
        System.out.println("\nFórmula utilizada:");
        switch (de) {
            case 1: // Celsius
                switch (para) {
                    case 2: // Para Fahrenheit
                        System.out.printf("°F = °C × 9/5 + 32 = %.2f × 9/5 + 32 = %.2f\n", valor, resultado);
                        break;
                    case 3: // Para Kelvin
                        System.out.printf("K = °C + 273.15 = %.2f + 273.15 = %.2f\n", valor, resultado);
                        break;
                }
                break;
            case 2: // Fahrenheit
                switch (para) {
                    case 1: // Para Celsius
                        System.out.printf("°C = (°F - 32) × 5/9 = (%.2f - 32) × 5/9 = %.2f\n", valor, resultado);
                        break;
                    case 3: // Para Kelvin
                        System.out.printf("K = (°F - 32) × 5/9 + 273.15 = (%.2f - 32) × 5/9 + 273.15 = %.2f\n", valor, resultado);
                        break;
                }
                break;
            case 3: // Kelvin
                switch (para) {
                    case 1: // Para Celsius
                        System.out.printf("°C = K - 273.15 = %.2f - 273.15 = %.2f\n", valor, resultado);
                        break;
                    case 2: // Para Fahrenheit
                        System.out.printf("°F = (K - 273.15) × 9/5 + 32 = (%.2f - 273.15) × 9/5 + 32 = %.2f\n", valor, resultado);
                        break;
                }
                break;
        }
    }
    
    private static void converterVolume() {
        System.out.println("\n=== CONVERSÃO DE VOLUME ===");
        System.out.println("Unidades disponíveis:");
        System.out.println("1. Litros (L)");
        System.out.println("2. Mililitros (mL)");
        System.out.println("3. Galões (gal)");
        System.out.println("4. Metros cúbicos (m³)");
        
        try {
            System.out.print("Digite o valor: ");
            double valor = Double.parseDouble(scanner.nextLine().replace(",", "."));
            
            System.out.print("De qual unidade (1-4): ");
            int deUnidade = Integer.parseInt(scanner.nextLine());
            
            System.out.print("Para qual unidade (1-4): ");
            int paraUnidade = Integer.parseInt(scanner.nextLine());
            
            if (deUnidade < 1 || deUnidade > 4 || paraUnidade < 1 || paraUnidade > 4) {
                System.out.println("Unidade inválida!");
                return;
            }
            
            double resultado = converterVolume(valor, deUnidade, paraUnidade);
            String[] unidades = {"", "L", "mL", "gal", "m³"};
            
            System.out.printf("\nResultado: %.4f %s = %.4f %s\n", 
                valor, unidades[deUnidade], resultado, unidades[paraUnidade]);
            
            adicionarHistorico(String.format("Volume: %.2f %s = %.4f %s", 
                valor, unidades[deUnidade], resultado, unidades[paraUnidade]));
                
        } catch (NumberFormatException e) {
            System.out.println("Valor inválido!");
        }
    }
    
    private static double converterVolume(double valor, int de, int para) {
        // Primeiro converte para litros
        double litros = 0;
        switch (de) {
            case 1: litros = valor; break; // litros
            case 2: litros = valor / 1000; break; // mL para L
            case 3: litros = valor * 3.78541; break; // gal para L
            case 4: litros = valor * 1000; break; // m³ para L
        }
        
        // Depois converte de litros para a unidade de destino
        switch (para) {
            case 1: return litros; // L
            case 2: return litros * 1000; // L para mL
            case 3: return litros / 3.78541; // L para gal
            case 4: return litros / 1000; // L para m³
            default: return litros;
        }
    }
    
    private static void converterTempo() {
        System.out.println("\n=== CONVERSÃO DE TEMPO ===");
        System.out.println("Unidades disponíveis:");
        System.out.println("1. Segundos (s)");
        System.out.println("2. Minutos (min)");
        System.out.println("3. Horas (h)");
        System.out.println("4. Dias (d)");
        
        try {
            System.out.print("Digite o valor: ");
            double valor = Double.parseDouble(scanner.nextLine().replace(",", "."));
            
            System.out.print("De qual unidade (1-4): ");
            int deUnidade = Integer.parseInt(scanner.nextLine());
            
            System.out.print("Para qual unidade (1-4): ");
            int paraUnidade = Integer.parseInt(scanner.nextLine());
            
            if (deUnidade < 1 || deUnidade > 4 || paraUnidade < 1 || paraUnidade > 4) {
                System.out.println("Unidade inválida!");
                return;
            }
            
            double resultado = converterTempo(valor, deUnidade, paraUnidade);
            String[] unidades = {"", "s", "min", "h", "d"};
            
            System.out.printf("\nResultado: %.4f %s = %.4f %s\n", 
                valor, unidades[deUnidade], resultado, unidades[paraUnidade]);
            
            adicionarHistorico(String.format("Tempo: %.2f %s = %.4f %s", 
                valor, unidades[deUnidade], resultado, unidades[paraUnidade]));
                
        } catch (NumberFormatException e) {
            System.out.println("Valor inválido!");
        }
    }
    
    private static double converterTempo(double valor, int de, int para) {
        // Primeiro converte para segundos
        double segundos = 0;
        switch (de) {
            case 1: segundos = valor; break; // segundos
            case 2: segundos = valor * 60; break; // minutos para segundos
            case 3: segundos = valor * 3600; break; // horas para segundos
            case 4: segundos = valor * 86400; break; // dias para segundos
        }
        
        // Depois converte de segundos para a unidade de destino
        switch (para) {
            case 1: return segundos; // s
            case 2: return segundos / 60; // s para min
            case 3: return segundos / 3600; // s para h
            case 4: return segundos / 86400; // s para d
            default: return segundos;
        }
    }
    
    private static void mostrarHistorico() {
        System.out.println("\n=== HISTÓRICO DE CONVERSÕES ===");
        if (historico.isEmpty()) {
            System.out.println("Nenhuma conversão realizada ainda.");
            return;
        }
        
        for (int i = 0; i < historico.size(); i++) {
            System.out.println((i + 1) + ". " + historico.get(i));
        }
    }
    
    private static void adicionarHistorico(String conversao) {
        historico.add(conversao);
        if (historico.size() > 20) {
            historico.remove(0); // Remove a conversão mais antiga
        }
    }
} 