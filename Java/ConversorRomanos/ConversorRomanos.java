import java.util.*;

public class ConversorRomanos {
    private static Scanner scanner = new Scanner(System.in);
    private static List<String> historico = new ArrayList<>();
    
    private static final Map<Character, Integer> ROMANOS = new HashMap<>();
    private static final int[] VALORES = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    private static final String[] SIMBOLOS = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
    
    static {
        ROMANOS.put('I', 1);
        ROMANOS.put('V', 5);
        ROMANOS.put('X', 10);
        ROMANOS.put('L', 50);
        ROMANOS.put('C', 100);
        ROMANOS.put('D', 500);
        ROMANOS.put('M', 1000);
    }
    
    public static void main(String[] args) {
        System.out.println("=== CONVERSOR DE NÚMEROS ROMANOS ===");
        exibirMenu();
    }
    
    private static void exibirMenu() {
        while (true) {
            System.out.println("\nEscolha uma opção:");
            System.out.println("1. Arábico para Romano");
            System.out.println("2. Romano para Arábico");
            System.out.println("3. Ver histórico");
            System.out.println("4. Regras dos números romanos");
            System.out.println("5. Sair");
            System.out.print("Opção: ");
            
            try {
                int opcao = Integer.parseInt(scanner.nextLine());
                
                switch (opcao) {
                    case 1:
                        arabicoParaRomano();
                        break;
                    case 2:
                        romanoParaArabico();
                        break;
                    case 3:
                        mostrarHistorico();
                        break;
                    case 4:
                        mostrarRegras();
                        break;
                    case 5:
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
    
    private static void arabicoParaRomano() {
        System.out.println("\n=== ARÁBICO PARA ROMANO ===");
        System.out.print("Digite um número arábico (1-3999): ");
        
        try {
            int numero = Integer.parseInt(scanner.nextLine());
            
            if (numero < 1 || numero > 3999) {
                System.out.println("Número deve estar entre 1 e 3999!");
                return;
            }
            
            String romano = converterParaRomano(numero);
            System.out.println("Resultado: " + numero + " = " + romano);
            
            adicionarHistorico(numero + " → " + romano);
            
        } catch (NumberFormatException e) {
            System.out.println("Por favor, digite um número válido!");
        }
    }
    
    private static void romanoParaArabico() {
        System.out.println("\n=== ROMANO PARA ARÁBICO ===");
        System.out.print("Digite um número romano: ");
        String romano = scanner.nextLine().trim().toUpperCase();
        
        try {
            int numero = converterParaArabico(romano);
            System.out.println("Resultado: " + romano + " = " + numero);
            
            adicionarHistorico(romano + " → " + numero);
            
        } catch (IllegalArgumentException e) {
            System.out.println("Número romano inválido: " + e.getMessage());
        }
    }
    
    private static String converterParaRomano(int numero) {
        StringBuilder resultado = new StringBuilder();
        
        for (int i = 0; i < VALORES.length; i++) {
            while (numero >= VALORES[i]) {
                resultado.append(SIMBOLOS[i]);
                numero -= VALORES[i];
            }
        }
        
        return resultado.toString();
    }
    
    private static int converterParaArabico(String romano) {
        if (romano.isEmpty()) {
            throw new IllegalArgumentException("Número romano vazio");
        }
        
        int resultado = 0;
        int anterior = 0;
        
        for (int i = romano.length() - 1; i >= 0; i--) {
            char c = romano.charAt(i);
            Integer valor = ROMANOS.get(c);
            
            if (valor == null) {
                throw new IllegalArgumentException("Caractere inválido: " + c);
            }
            
            if (valor < anterior) {
                resultado -= valor;
            } else {
                resultado += valor;
            }
            
            anterior = valor;
        }
        
        return resultado;
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
    
    private static void mostrarRegras() {
        System.out.println("\n=== REGRAS DOS NÚMEROS ROMANOS ===");
        System.out.println("Símbolos básicos:");
        System.out.println("I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000");
        System.out.println();
        System.out.println("Regras:");
        System.out.println("1. Letras são escritas da maior para a menor");
        System.out.println("2. Se uma letra menor está à esquerda de uma maior, é subtraída");
        System.out.println("3. Se uma letra menor está à direita de uma maior, é somada");
        System.out.println();
        System.out.println("Exemplos:");
        System.out.println("VI = 6 (5 + 1)");
        System.out.println("IV = 4 (5 - 1)");
        System.out.println("XIX = 19 (10 + 10 - 1)");
        System.out.println("MMXXIII = 2023 (1000 + 1000 + 10 + 10 + 1 + 1 + 1)");
    }
    
    private static void adicionarHistorico(String conversao) {
        historico.add(conversao);
        if (historico.size() > 50) {
            historico.remove(0);
        }
    }
} 