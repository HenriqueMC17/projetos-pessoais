import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ConversorHorasMinutos {
    private static Scanner scanner = new Scanner(System.in);
    private static List<String> historico = new ArrayList<>();
    
    public static void main(String[] args) {
        System.out.println("=== CONVERSOR DE HORAS E MINUTOS ===");
        System.out.println("Este programa converte entre horas, minutos e segundos.");
        
        while (true) {
            exibirMenu();
            int opcao = obterOpcao();
            
            switch (opcao) {
                case 1:
                    converterHorasParaMinutos();
                    break;
                case 2:
                    converterMinutosParaHoras();
                    break;
                case 3:
                    converterParaSegundos();
                    break;
                case 4:
                    converterDeSegundos();
                    break;
                case 5:
                    calcularDiferencaTempo();
                    break;
                case 6:
                    exibirHistorico();
                    break;
                case 7:
                    limparHistorico();
                    break;
                case 8:
                    exibirAjuda();
                    break;
                case 9:
                    System.out.println("Obrigado por usar o Conversor de Horas e Minutos!");
                    scanner.close();
                    return;
                default:
                    System.out.println("Opção inválida! Tente novamente.");
            }
        }
    }
    
    private static void exibirMenu() {
        System.out.println("\n=== MENU PRINCIPAL ===");
        System.out.println("1. Converter horas para minutos");
        System.out.println("2. Converter minutos para horas");
        System.out.println("3. Converter para segundos");
        System.out.println("4. Converter de segundos");
        System.out.println("5. Calcular diferença entre horários");
        System.out.println("6. Ver histórico");
        System.out.println("7. Limpar histórico");
        System.out.println("8. Ajuda");
        System.out.println("9. Sair");
        System.out.print("Escolha uma opção: ");
    }
    
    private static int obterOpcao() {
        try {
            return Integer.parseInt(scanner.nextLine());
        } catch (NumberFormatException e) {
            return 0;
        }
    }
    
    private static void converterHorasParaMinutos() {
        System.out.println("\n=== CONVERTER HORAS PARA MINUTOS ===");
        
        double horas = obterDouble("Digite o número de horas: ");
        double minutos = horas * 60;
        double segundos = horas * 3600;
        
        System.out.println("\n=== RESULTADO ===");
        System.out.printf("%.2f horas = %.2f minutos\n", horas, minutos);
        System.out.printf("%.2f horas = %.2f segundos\n", horas, segundos);
        
        // Salvar no histórico
        String resultado = String.format("%.2f horas → %.2f minutos", horas, minutos);
        historico.add(resultado);
        
        System.out.println("\nConversão concluída! Pressione Enter para continuar...");
        scanner.nextLine();
    }
    
    private static void converterMinutosParaHoras() {
        System.out.println("\n=== CONVERTER MINUTOS PARA HORAS ===");
        
        double minutos = obterDouble("Digite o número de minutos: ");
        double horas = minutos / 60;
        double segundos = minutos * 60;
        
        System.out.println("\n=== RESULTADO ===");
        System.out.printf("%.2f minutos = %.2f horas\n", minutos, horas);
        System.out.printf("%.2f minutos = %.2f segundos\n", minutos, segundos);
        
        // Formatar horas em formato HH:MM:SS
        String formatoHoras = formatarTempo(horas);
        System.out.printf("Formato HH:MM:SS = %s\n", formatoHoras);
        
        // Salvar no histórico
        String resultado = String.format("%.2f minutos → %.2f horas (%s)", minutos, horas, formatoHoras);
        historico.add(resultado);
        
        System.out.println("\nConversão concluída! Pressione Enter para continuar...");
        scanner.nextLine();
    }
    
    private static void converterParaSegundos() {
        System.out.println("\n=== CONVERTER PARA SEGUNDOS ===");
        
        System.out.println("Digite o tempo no formato HH:MM:SS");
        System.out.print("Horas: ");
        int horas = obterInteiro("", 0, 23);
        System.out.print("Minutos: ");
        int minutos = obterInteiro("", 0, 59);
        System.out.print("Segundos: ");
        int segundos = obterInteiro("", 0, 59);
        
        int totalSegundos = horas * 3600 + minutos * 60 + segundos;
        
        System.out.println("\n=== RESULTADO ===");
        System.out.printf("%02d:%02d:%02d = %d segundos\n", horas, minutos, segundos, totalSegundos);
        
        // Salvar no histórico
        String resultado = String.format("%02d:%02d:%02d → %d segundos", horas, minutos, segundos, totalSegundos);
        historico.add(resultado);
        
        System.out.println("\nConversão concluída! Pressione Enter para continuar...");
        scanner.nextLine();
    }
    
    private static void converterDeSegundos() {
        System.out.println("\n=== CONVERTER DE SEGUNDOS ===");
        
        int segundos = obterInteiro("Digite o número de segundos: ", 0, 86400); // Máximo 24 horas
        
        int horas = segundos / 3600;
        int minutos = (segundos % 3600) / 60;
        int segundosRestantes = segundos % 60;
        
        System.out.println("\n=== RESULTADO ===");
        System.out.printf("%d segundos = %02d:%02d:%02d\n", segundos, horas, minutos, segundosRestantes);
        System.out.printf("%d segundos = %.2f horas\n", segundos, (double) segundos / 3600);
        System.out.printf("%d segundos = %.2f minutos\n", segundos, (double) segundos / 60);
        
        // Salvar no histórico
        String resultado = String.format("%d segundos → %02d:%02d:%02d", segundos, horas, minutos, segundosRestantes);
        historico.add(resultado);
        
        System.out.println("\nConversão concluída! Pressione Enter para continuar...");
        scanner.nextLine();
    }
    
    private static void calcularDiferencaTempo() {
        System.out.println("\n=== CALCULAR DIFERENÇA ENTRE HORÁRIOS ===");
        
        System.out.println("Digite o primeiro horário:");
        System.out.print("Horas: ");
        int horas1 = obterInteiro("", 0, 23);
        System.out.print("Minutos: ");
        int minutos1 = obterInteiro("", 0, 59);
        System.out.print("Segundos: ");
        int segundos1 = obterInteiro("", 0, 59);
        
        System.out.println("\nDigite o segundo horário:");
        System.out.print("Horas: ");
        int horas2 = obterInteiro("", 0, 23);
        System.out.print("Minutos: ");
        int minutos2 = obterInteiro("", 0, 59);
        System.out.print("Segundos: ");
        int segundos2 = obterInteiro("", 0, 59);
        
        int totalSegundos1 = horas1 * 3600 + minutos1 * 60 + segundos1;
        int totalSegundos2 = horas2 * 3600 + minutos2 * 60 + segundos2;
        
        int diferencaSegundos = Math.abs(totalSegundos2 - totalSegundos1);
        
        int horasDiff = diferencaSegundos / 3600;
        int minutosDiff = (diferencaSegundos % 3600) / 60;
        int segundosDiff = diferencaSegundos % 60;
        
        System.out.println("\n=== RESULTADO ===");
        System.out.printf("Horário 1: %02d:%02d:%02d\n", horas1, minutos1, segundos1);
        System.out.printf("Horário 2: %02d:%02d:%02d\n", horas2, minutos2, segundos2);
        System.out.printf("Diferença: %02d:%02d:%02d\n", horasDiff, minutosDiff, segundosDiff);
        System.out.printf("Diferença em segundos: %d\n", diferencaSegundos);
        
        // Salvar no histórico
        String resultado = String.format("%02d:%02d:%02d - %02d:%02d:%02d = %02d:%02d:%02d", 
                                       horas1, minutos1, segundos1, horas2, minutos2, segundos2, 
                                       horasDiff, minutosDiff, segundosDiff);
        historico.add(resultado);
        
        System.out.println("\nCálculo concluído! Pressione Enter para continuar...");
        scanner.nextLine();
    }
    
    private static double obterDouble(String mensagem) {
        while (true) {
            System.out.print(mensagem);
            try {
                return Double.parseDouble(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("Digite um número válido!");
            }
        }
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
    
    private static String formatarTempo(double horas) {
        int horasInt = (int) horas;
        double minutosDecimais = (horas - horasInt) * 60;
        int minutosInt = (int) minutosDecimais;
        int segundos = (int) ((minutosDecimais - minutosInt) * 60);
        
        return String.format("%02d:%02d:%02d", horasInt, minutosInt, segundos);
    }
    
    private static void exibirHistorico() {
        System.out.println("\n=== HISTÓRICO DE CONVERSÕES ===");
        
        if (historico.isEmpty()) {
            System.out.println("Nenhuma conversão foi realizada ainda.");
            return;
        }
        
        for (int i = 0; i < historico.size(); i++) {
            System.out.println((i + 1) + ". " + historico.get(i));
        }
        
        System.out.println("\nTotal de conversões: " + historico.size());
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
        System.out.println("Conversor de Horas e Minutos");
        System.out.println("Este programa permite converter entre diferentes unidades de tempo.");
        System.out.println();
        System.out.println("Funcionalidades:");
        System.out.println("1. Converter horas para minutos e segundos");
        System.out.println("2. Converter minutos para horas (com formato HH:MM:SS)");
        System.out.println("3. Converter horário (HH:MM:SS) para segundos");
        System.out.println("4. Converter segundos para horário (HH:MM:SS)");
        System.out.println("5. Calcular diferença entre dois horários");
        System.out.println();
        System.out.println("Formato de tempo:");
        System.out.println("- HH:MM:SS (horas:minutos:segundos)");
        System.out.println("- Horas: 0-23");
        System.out.println("- Minutos: 0-59");
        System.out.println("- Segundos: 0-59");
        System.out.println();
        System.out.println("Exemplos de conversão:");
        System.out.println("- 2.5 horas = 150 minutos = 9000 segundos");
        System.out.println("- 90 minutos = 1.5 horas = 01:30:00");
        System.out.println("- 02:30:45 = 9045 segundos");
        System.out.println();
        System.out.println("Pressione Enter para continuar...");
        scanner.nextLine();
    }
} 