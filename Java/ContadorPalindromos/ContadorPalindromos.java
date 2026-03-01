import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ContadorPalindromos {
    private static Scanner scanner = new Scanner(System.in);
    private static List<String> historico = new ArrayList<>();
    
    public static void main(String[] args) {
        System.out.println("=== CONTADOR DE PALÍNDROMOS ===");
        System.out.println("Este programa conta quantas palavras palíndromas existem em um texto.");
        
        while (true) {
            exibirMenu();
            int opcao = obterOpcao();
            
            switch (opcao) {
                case 1:
                    analisarTexto();
                    break;
                case 2:
                    exibirHistorico();
                    break;
                case 3:
                    limparHistorico();
                    break;
                case 4:
                    exibirAjuda();
                    break;
                case 5:
                    System.out.println("Obrigado por usar o Contador de Palíndromos!");
                    scanner.close();
                    return;
                default:
                    System.out.println("Opção inválida! Tente novamente.");
            }
        }
    }
    
    private static void exibirMenu() {
        System.out.println("\n=== MENU PRINCIPAL ===");
        System.out.println("1. Analisar texto");
        System.out.println("2. Ver histórico");
        System.out.println("3. Limpar histórico");
        System.out.println("4. Ajuda");
        System.out.println("5. Sair");
        System.out.print("Escolha uma opção: ");
    }
    
    private static int obterOpcao() {
        try {
            return Integer.parseInt(scanner.nextLine());
        } catch (NumberFormatException e) {
            return 0;
        }
    }
    
    private static void analisarTexto() {
        System.out.println("\n=== ANÁLISE DE TEXTO ===");
        System.out.println("Digite o texto que deseja analisar:");
        String texto = scanner.nextLine();
        
        if (texto.trim().isEmpty()) {
            System.out.println("Texto vazio! Digite algum conteúdo.");
            return;
        }
        
        List<String> palindromos = encontrarPalindromos(texto);
        int totalPalindromos = palindromos.size();
        
        System.out.println("\n=== RESULTADOS ===");
        System.out.println("Texto analisado: " + texto);
        System.out.println("Total de palavras palíndromas encontradas: " + totalPalindromos);
        
        if (totalPalindromos > 0) {
            System.out.println("Palíndromos encontrados:");
            for (int i = 0; i < palindromos.size(); i++) {
                System.out.println((i + 1) + ". " + palindromos.get(i));
            }
        } else {
            System.out.println("Nenhuma palavra palíndroma foi encontrada no texto.");
        }
        
        // Salvar no histórico
        String resultado = "Texto: \"" + texto + "\" - Palíndromos: " + totalPalindromos;
        historico.add(resultado);
        
        System.out.println("\nAnálise concluída! Pressione Enter para continuar...");
        scanner.nextLine();
    }
    
    private static List<String> encontrarPalindromos(String texto) {
        List<String> palindromos = new ArrayList<>();
        
        // Dividir o texto em palavras
        String[] palavras = texto.split("\\s+");
        
        for (String palavra : palavras) {
            // Remover pontuação e converter para minúsculas
            String palavraLimpa = palavra.replaceAll("[^a-zA-ZÀ-ÿ]", "").toLowerCase();
            
            if (!palavraLimpa.isEmpty() && ehPalindromo(palavraLimpa)) {
                palindromos.add(palavraLimpa);
            }
        }
        
        return palindromos;
    }
    
    private static boolean ehPalindromo(String palavra) {
        if (palavra.length() <= 1) {
            return false; // Palavras de uma letra não são consideradas palíndromos
        }
        
        int inicio = 0;
        int fim = palavra.length() - 1;
        
        while (inicio < fim) {
            if (palavra.charAt(inicio) != palavra.charAt(fim)) {
                return false;
            }
            inicio++;
            fim--;
        }
        
        return true;
    }
    
    private static void exibirHistorico() {
        System.out.println("\n=== HISTÓRICO DE ANÁLISES ===");
        
        if (historico.isEmpty()) {
            System.out.println("Nenhuma análise foi realizada ainda.");
            return;
        }
        
        for (int i = 0; i < historico.size(); i++) {
            System.out.println((i + 1) + ". " + historico.get(i));
        }
        
        System.out.println("\nTotal de análises: " + historico.size());
        System.out.println("Pressione Enter para continuar...");
        scanner.nextLine();
    }
    
    private static void limparHistorico() {
        System.out.println("\n=== LIMPAR HISTÓRICO ===");
        System.out.print("Tem certeza que deseja limpar o histórico? (s/n): ");
        String confirmacao = scanner.nextLine().toLowerCase();
        
        if (confirmacao.equals("s") || confirmacao.equals("sim")) {
            historico.clear();
            System.out.println("Histórico limpo com sucesso!");
        } else {
            System.out.println("Operação cancelada.");
        }
    }
    
    private static void exibirAjuda() {
        System.out.println("\n=== AJUDA ===");
        System.out.println("O que é um palíndromo?");
        System.out.println("Um palíndromo é uma palavra que pode ser lida da mesma forma");
        System.out.println("da esquerda para a direita e da direita para a esquerda.");
        System.out.println();
        System.out.println("Exemplos de palíndromos:");
        System.out.println("- ovo");
        System.out.println("- radar");
        System.out.println("- arara");
        System.out.println("- ana");
        System.out.println("- reviver");
        System.out.println();
        System.out.println("Como usar:");
        System.out.println("1. Escolha a opção 'Analisar texto'");
        System.out.println("2. Digite ou cole o texto que deseja analisar");
        System.out.println("3. O programa identificará todas as palavras palíndromas");
        System.out.println("4. Os resultados serão salvos no histórico");
        System.out.println();
        System.out.println("Observações:");
        System.out.println("- Apenas palavras com 2 ou mais letras são consideradas");
        System.out.println("- Pontuação e acentos são ignorados");
        System.out.println("- A análise não diferencia maiúsculas de minúsculas");
        System.out.println();
        System.out.println("Pressione Enter para continuar...");
        scanner.nextLine();
    }
} 