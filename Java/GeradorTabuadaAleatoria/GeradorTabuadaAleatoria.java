import java.util.*;

public class GeradorTabuadaAleatoria {
    private static Scanner scanner = new Scanner(System.in);
    private static Random random = new Random();
    private static int acertos = 0;
    private static int total = 0;
    private static List<String> historico = new ArrayList<>();
    
    public static void main(String[] args) {
        System.out.println("=== GERADOR DE TABUADA ALEATÓRIA ===");
        exibirMenu();
    }
    
    private static void exibirMenu() {
        while (true) {
            System.out.println("\nEscolha uma opção:");
            System.out.println("1. Praticar tabuada");
            System.out.println("2. Ver estatísticas");
            System.out.println("3. Ver histórico");
            System.out.println("4. Reiniciar estatísticas");
            System.out.println("5. Sair");
            System.out.print("Opção: ");
            
            try {
                int opcao = Integer.parseInt(scanner.nextLine());
                
                switch (opcao) {
                    case 1:
                        praticarTabuada();
                        break;
                    case 2:
                        mostrarEstatisticas();
                        break;
                    case 3:
                        mostrarHistorico();
                        break;
                    case 4:
                        reiniciarEstatisticas();
                        break;
                    case 5:
                        System.out.println("Até a próxima!");
                        return;
                    default:
                        System.out.println("Opção inválida!");
                }
            } catch (NumberFormatException e) {
                System.out.println("Por favor, digite um número válido!");
            }
        }
    }
    
    private static void praticarTabuada() {
        System.out.println("\nEscolha o nível de dificuldade:");
        System.out.println("1. Fácil (1-5)");
        System.out.println("2. Médio (1-10)");
        System.out.println("3. Difícil (1-15)");
        System.out.println("4. Expert (1-20)");
        System.out.print("Nível: ");
        
        try {
            int nivel = Integer.parseInt(scanner.nextLine());
            int maxNumero = 0;
            
            switch (nivel) {
                case 1: maxNumero = 5; break;
                case 2: maxNumero = 10; break;
                case 3: maxNumero = 15; break;
                case 4: maxNumero = 20; break;
                default:
                    System.out.println("Nível inválido!");
                    return;
            }
            
            System.out.print("Quantas questões você quer responder? ");
            int questoes = Integer.parseInt(scanner.nextLine());
            
            if (questoes <= 0) {
                System.out.println("Número de questões inválido!");
                return;
            }
            
            executarExercicios(maxNumero, questoes);
            
        } catch (NumberFormatException e) {
            System.out.println("Por favor, digite um número válido!");
        }
    }
    
    private static void executarExercicios(int maxNumero, int questoes) {
        System.out.println("\n=== INICIANDO EXERCÍCIOS ===");
        
        for (int i = 1; i <= questoes; i++) {
            int num1 = random.nextInt(maxNumero) + 1;
            int num2 = random.nextInt(maxNumero) + 1;
            int respostaCorreta = num1 * num2;
            
            System.out.printf("\nQuestão %d/%d: %d x %d = ", i, questoes, num1, num2);
            
            long inicio = System.currentTimeMillis();
            
            try {
                int resposta = Integer.parseInt(scanner.nextLine());
                long tempo = System.currentTimeMillis() - inicio;
                
                if (resposta == respostaCorreta) {
                    System.out.println("✅ Correto! Tempo: " + (tempo/1000.0) + "s");
                    acertos++;
                } else {
                    System.out.println("❌ Errado! A resposta correta era: " + respostaCorreta);
                }
                
                total++;
                
                String registro = String.format("Questão %d: %d x %d = %d | Resposta: %d | %s | Tempo: %.1fs", 
                    i, num1, num2, respostaCorreta, resposta, 
                    (resposta == respostaCorreta ? "Correto" : "Errado"), tempo/1000.0);
                adicionarHistorico(registro);
                
            } catch (NumberFormatException e) {
                System.out.println("Resposta inválida! Questão perdida.");
                total++;
            }
        }
        
        System.out.println("\n=== RESULTADO FINAL ===");
        double percentual = (double) acertos / total * 100;
        System.out.printf("Acertos: %d/%d (%.1f%%)\n", acertos, total, percentual);
        
        if (percentual >= 90) {
            System.out.println("🎉 Excelente! Você é um mestre da tabuada!");
        } else if (percentual >= 70) {
            System.out.println("👍 Muito bom! Continue praticando!");
        } else if (percentual >= 50) {
            System.out.println("😊 Bom! Mas você pode melhorar!");
        } else {
            System.out.println("📚 Continue estudando! A prática leva à perfeição!");
        }
    }
    
    private static void mostrarEstatisticas() {
        System.out.println("\n=== ESTATÍSTICAS ===");
        
        if (total == 0) {
            System.out.println("Nenhum exercício realizado ainda.");
            return;
        }
        
        System.out.println("Total de questões: " + total);
        System.out.println("Acertos: " + acertos);
        System.out.println("Erros: " + (total - acertos));
        
        double percentual = (double) acertos / total * 100;
        System.out.printf("Percentual de acertos: %.1f%%\n", percentual);
        
        if (total >= 10) {
            System.out.println("Você já praticou bastante! Parabéns!");
        } else {
            System.out.println("Continue praticando para melhorar suas estatísticas!");
        }
    }
    
    private static void mostrarHistorico() {
        System.out.println("\n=== HISTÓRICO DE EXERCÍCIOS ===");
        
        if (historico.isEmpty()) {
            System.out.println("Nenhum exercício realizado ainda.");
            return;
        }
        
        for (int i = 0; i < historico.size(); i++) {
            System.out.println((i + 1) + ". " + historico.get(i));
        }
    }
    
    private static void reiniciarEstatisticas() {
        System.out.print("Tem certeza que deseja reiniciar todas as estatísticas? (s/n): ");
        String confirmacao = scanner.nextLine().trim().toLowerCase();
        
        if (confirmacao.equals("s") || confirmacao.equals("sim")) {
            acertos = 0;
            total = 0;
            historico.clear();
            System.out.println("Estatísticas reiniciadas com sucesso!");
        } else {
            System.out.println("Operação cancelada.");
        }
    }
    
    private static void adicionarHistorico(String registro) {
        historico.add(registro);
        if (historico.size() > 100) {
            historico.remove(0);
        }
    }
} 