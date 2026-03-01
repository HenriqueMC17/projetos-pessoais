import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

public class GeradorDeMatriz {
    private static Scanner scanner = new Scanner(System.in);
    private static Random random = new Random();
    private static List<String> historico = new ArrayList<>();
    
    public static void main(String[] args) {
        System.out.println("=== GERADOR DE MATRIZES ===");
        System.out.println("Este programa gera e exibe matrizes aleatórias.");
        
        while (true) {
            exibirMenu();
            int opcao = obterOpcao();
            
            switch (opcao) {
                case 1:
                    gerarMatriz();
                    break;
                case 2:
                    gerarMatrizPersonalizada();
                    break;
                case 3:
                    exibirHistorico();
                    break;
                case 4:
                    limparHistorico();
                    break;
                case 5:
                    exibirAjuda();
                    break;
                case 6:
                    System.out.println("Obrigado por usar o Gerador de Matrizes!");
                    scanner.close();
                    return;
                default:
                    System.out.println("Opção inválida! Tente novamente.");
            }
        }
    }
    
    private static void exibirMenu() {
        System.out.println("\n=== MENU PRINCIPAL ===");
        System.out.println("1. Gerar matriz padrão (3x3)");
        System.out.println("2. Gerar matriz personalizada");
        System.out.println("3. Ver histórico");
        System.out.println("4. Limpar histórico");
        System.out.println("5. Ajuda");
        System.out.println("6. Sair");
        System.out.print("Escolha uma opção: ");
    }
    
    private static int obterOpcao() {
        try {
            return Integer.parseInt(scanner.nextLine());
        } catch (NumberFormatException e) {
            return 0;
        }
    }
    
    private static void gerarMatriz() {
        System.out.println("\n=== GERANDO MATRIZ PADRÃO (3x3) ===");
        int[][] matriz = gerarMatrizAleatoria(3, 3, 1, 100);
        exibirMatriz(matriz, "Matriz 3x3");
        
        // Salvar no histórico
        String resultado = "Matriz 3x3 gerada - Valores entre 1 e 100";
        historico.add(resultado);
        
        System.out.println("\nMatriz gerada com sucesso! Pressione Enter para continuar...");
        scanner.nextLine();
    }
    
    private static void gerarMatrizPersonalizada() {
        System.out.println("\n=== GERAR MATRIZ PERSONALIZADA ===");
        
        int linhas = obterInteiro("Digite o número de linhas (1-10): ", 1, 10);
        int colunas = obterInteiro("Digite o número de colunas (1-10): ", 1, 10);
        int valorMin = obterInteiro("Digite o valor mínimo: ", -1000, 1000);
        int valorMax = obterInteiro("Digite o valor máximo: ", valorMin, 1000);
        
        if (valorMax < valorMin) {
            int temp = valorMin;
            valorMin = valorMax;
            valorMax = temp;
        }
        
        int[][] matriz = gerarMatrizAleatoria(linhas, colunas, valorMin, valorMax);
        exibirMatriz(matriz, "Matriz " + linhas + "x" + colunas);
        
        // Calcular estatísticas
        calcularEstatisticas(matriz);
        
        // Salvar no histórico
        String resultado = "Matriz " + linhas + "x" + colunas + " gerada - Valores entre " + valorMin + " e " + valorMax;
        historico.add(resultado);
        
        System.out.println("\nMatriz gerada com sucesso! Pressione Enter para continuar...");
        scanner.nextLine();
    }
    
    private static int obterInteiro(String mensagem, int min, int max) {
        while (true) {
            System.out.print(mensagem);
            try {
                int valor = Integer.parseInt(scanner.nextLine());
                if (valor >= min && valor <= max) {
                    return valor;
                } else {
                    System.out.println("Valor deve estar entre " + min + " e " + max + "!");
                }
            } catch (NumberFormatException e) {
                System.out.println("Digite um número válido!");
            }
        }
    }
    
    private static int[][] gerarMatrizAleatoria(int linhas, int colunas, int valorMin, int valorMax) {
        int[][] matriz = new int[linhas][colunas];
        
        for (int i = 0; i < linhas; i++) {
            for (int j = 0; j < colunas; j++) {
                matriz[i][j] = random.nextInt(valorMax - valorMin + 1) + valorMin;
            }
        }
        
        return matriz;
    }
    
    private static void exibirMatriz(int[][] matriz, String titulo) {
        System.out.println("\n=== " + titulo + " ===");
        
        int linhas = matriz.length;
        int colunas = matriz[0].length;
        
        // Calcular largura máxima para formatação
        int larguraMax = 1;
        for (int i = 0; i < linhas; i++) {
            for (int j = 0; j < colunas; j++) {
                int largura = String.valueOf(matriz[i][j]).length();
                if (largura > larguraMax) {
                    larguraMax = largura;
                }
            }
        }
        
        // Exibir matriz formatada
        for (int i = 0; i < linhas; i++) {
            System.out.print("| ");
            for (int j = 0; j < colunas; j++) {
                System.out.printf("%" + larguraMax + "d ", matriz[i][j]);
            }
            System.out.println("|");
        }
    }
    
    private static void calcularEstatisticas(int[][] matriz) {
        int linhas = matriz.length;
        int colunas = matriz[0].length;
        int total = linhas * colunas;
        
        int soma = 0;
        int menor = matriz[0][0];
        int maior = matriz[0][0];
        
        for (int i = 0; i < linhas; i++) {
            for (int j = 0; j < colunas; j++) {
                int valor = matriz[i][j];
                soma += valor;
                if (valor < menor) menor = valor;
                if (valor > maior) maior = valor;
            }
        }
        
        double media = (double) soma / total;
        
        System.out.println("\n=== ESTATÍSTICAS ===");
        System.out.println("Dimensões: " + linhas + "x" + colunas);
        System.out.println("Total de elementos: " + total);
        System.out.println("Soma de todos os elementos: " + soma);
        System.out.println("Média dos elementos: " + String.format("%.2f", media));
        System.out.println("Menor valor: " + menor);
        System.out.println("Maior valor: " + maior);
    }
    
    private static void exibirHistorico() {
        System.out.println("\n=== HISTÓRICO DE MATRIZES ===");
        
        if (historico.isEmpty()) {
            System.out.println("Nenhuma matriz foi gerada ainda.");
            return;
        }
        
        for (int i = 0; i < historico.size(); i++) {
            System.out.println((i + 1) + ". " + historico.get(i));
        }
        
        System.out.println("\nTotal de matrizes geradas: " + historico.size());
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
        System.out.println("O que é uma matriz?");
        System.out.println("Uma matriz é uma estrutura de dados organizada em linhas e colunas,");
        System.out.println("formando uma tabela retangular de elementos.");
        System.out.println();
        System.out.println("Funcionalidades:");
        System.out.println("1. Gerar matriz padrão: Cria uma matriz 3x3 com valores de 1 a 100");
        System.out.println("2. Gerar matriz personalizada: Permite definir dimensões e faixa de valores");
        System.out.println("3. Ver histórico: Mostra todas as matrizes geradas nesta sessão");
        System.out.println("4. Limpar histórico: Remove o histórico de matrizes");
        System.out.println();
        System.out.println("Limitações:");
        System.out.println("- Máximo de 10 linhas e 10 colunas para evitar sobrecarga");
        System.out.println("- Valores entre -1000 e 1000");
        System.out.println();
        System.out.println("Exemplo de matriz 3x3:");
        System.out.println("|  5  12   8 |");
        System.out.println("| 23   1  45 |");
        System.out.println("|  9  67   3 |");
        System.out.println();
        System.out.println("Pressione Enter para continuar...");
        scanner.nextLine();
    }
} 