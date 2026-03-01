import java.util.*;

public class JogoPedraPapelTesoura {
    private static Scanner scanner = new Scanner(System.in);
    private static Random random = new Random();
    private static int vitorias = 0;
    private static int derrotas = 0;
    private static int empates = 0;
    private static List<String> historico = new ArrayList<>();
    private static int sequenciaVitorias = 0;
    private static int melhorSequencia = 0;
    
    private static final String[] OPCOES = {"", "Pedra", "Papel", "Tesoura"};
    
    public static void main(String[] args) {
        System.out.println("=== JOGO PEDRA, PAPEL E TESOURA ===");
        System.out.println("Bem-vindo ao jogo! Você jogará contra o computador.");
        exibirMenu();
    }
    
    private static void exibirMenu() {
        while (true) {
            System.out.println("\nEscolha uma opção:");
            System.out.println("1. Jogar uma rodada");
            System.out.println("2. Ver estatísticas");
            System.out.println("3. Ver histórico");
            System.out.println("4. Reiniciar estatísticas");
            System.out.println("5. Sair");
            System.out.print("Opção: ");
            
            try {
                int opcao = Integer.parseInt(scanner.nextLine());
                
                switch (opcao) {
                    case 1:
                        jogarRodada();
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
                        System.out.println("Obrigado por jogar! Até a próxima!");
                        return;
                    default:
                        System.out.println("Opção inválida!");
                }
            } catch (NumberFormatException e) {
                System.out.println("Por favor, digite um número válido!");
            }
        }
    }
    
    private static void jogarRodada() {
        System.out.println("\n=== NOVA RODADA ===");
        System.out.println("Escolha sua jogada:");
        System.out.println("1. Pedra");
        System.out.println("2. Papel");
        System.out.println("3. Tesoura");
        System.out.print("Sua escolha: ");
        
        try {
            int escolhaJogador = Integer.parseInt(scanner.nextLine());
            
            if (escolhaJogador < 1 || escolhaJogador > 3) {
                System.out.println("Escolha inválida! Digite 1, 2 ou 3.");
                return;
            }
            
            int escolhaComputador = random.nextInt(3) + 1;
            
            // Animação de suspense
            System.out.print("O computador está escolhendo");
            for (int i = 0; i < 3; i++) {
                try {
                    Thread.sleep(300);
                    System.out.print(".");
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
            System.out.println();
            
            // Mostra as escolhas
            System.out.println("\nVocê escolheu: " + OPCOES[escolhaJogador]);
            System.out.println("Computador escolheu: " + OPCOES[escolhaComputador]);
            
            // Determina o resultado
            String resultado = determinarResultado(escolhaJogador, escolhaComputador);
            System.out.println("\n" + resultado);
            
            // Atualiza estatísticas
            atualizarEstatisticas(resultado);
            
            // Adiciona ao histórico
            String registro = String.format("Você: %s | Computador: %s | Resultado: %s", 
                OPCOES[escolhaJogador], OPCOES[escolhaComputador], resultado);
            adicionarHistorico(registro);
            
        } catch (NumberFormatException e) {
            System.out.println("Por favor, digite um número válido!");
        }
    }
    
    private static String determinarResultado(int jogador, int computador) {
        if (jogador == computador) {
            return "EMPATE!";
        }
        
        // Verifica quem vence
        if ((jogador == 1 && computador == 3) || // Pedra vence Tesoura
            (jogador == 2 && computador == 1) || // Papel vence Pedra
            (jogador == 3 && computador == 2)) { // Tesoura vence Papel
            return "VOCÊ VENCEU! 🎉";
        } else {
            return "COMPUTADOR VENCEU! 😔";
        }
    }
    
    private static void atualizarEstatisticas(String resultado) {
        if (resultado.contains("VOCÊ VENCEU")) {
            vitorias++;
            sequenciaVitorias++;
            if (sequenciaVitorias > melhorSequencia) {
                melhorSequencia = sequenciaVitorias;
            }
        } else if (resultado.contains("COMPUTADOR VENCEU")) {
            derrotas++;
            sequenciaVitorias = 0;
        } else {
            empates++;
            sequenciaVitorias = 0;
        }
    }
    
    private static void mostrarEstatisticas() {
        System.out.println("\n=== ESTATÍSTICAS ===");
        int totalJogos = vitorias + derrotas + empates;
        
        if (totalJogos == 0) {
            System.out.println("Nenhuma partida jogada ainda.");
            return;
        }
        
        System.out.println("Total de jogos: " + totalJogos);
        System.out.println("Vitórias: " + vitorias);
        System.out.println("Derrotas: " + derrotas);
        System.out.println("Empates: " + empates);
        
        double percentualVitorias = (double) vitorias / totalJogos * 100;
        System.out.printf("Percentual de vitórias: %.1f%%\n", percentualVitorias);
        
        System.out.println("Sequência atual de vitórias: " + sequenciaVitorias);
        System.out.println("Melhor sequência de vitórias: " + melhorSequencia);
        
        // Mostra a jogada mais escolhida pelo jogador
        mostrarJogadaMaisEscolhida();
    }
    
    private static void mostrarJogadaMaisEscolhida() {
        Map<String, Integer> contagem = new HashMap<>();
        contagem.put("Pedra", 0);
        contagem.put("Papel", 0);
        contagem.put("Tesoura", 0);
        
        for (String registro : historico) {
            if (registro.contains("Você: Pedra")) {
                contagem.put("Pedra", contagem.get("Pedra") + 1);
            } else if (registro.contains("Você: Papel")) {
                contagem.put("Papel", contagem.get("Papel") + 1);
            } else if (registro.contains("Você: Tesoura")) {
                contagem.put("Tesoura", contagem.get("Tesoura") + 1);
            }
        }
        
        String maisEscolhida = "";
        int maxContagem = 0;
        
        for (Map.Entry<String, Integer> entry : contagem.entrySet()) {
            if (entry.getValue() > maxContagem) {
                maxContagem = entry.getValue();
                maisEscolhida = entry.getKey();
            }
        }
        
        if (maxContagem > 0) {
            System.out.println("Sua jogada mais escolhida: " + maisEscolhida + " (" + maxContagem + " vezes)");
        }
    }
    
    private static void mostrarHistorico() {
        System.out.println("\n=== HISTÓRICO DE PARTIDAS ===");
        
        if (historico.isEmpty()) {
            System.out.println("Nenhuma partida jogada ainda.");
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
            vitorias = 0;
            derrotas = 0;
            empates = 0;
            sequenciaVitorias = 0;
            melhorSequencia = 0;
            historico.clear();
            System.out.println("Estatísticas reiniciadas com sucesso!");
        } else {
            System.out.println("Operação cancelada.");
        }
    }
    
    private static void adicionarHistorico(String registro) {
        historico.add(registro);
        if (historico.size() > 50) {
            historico.remove(0); // Remove a partida mais antiga
        }
    }
} 