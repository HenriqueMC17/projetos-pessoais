import java.io.*;
import java.util.*;

public class SimuladorCaixaEletronico {
    private static Scanner scanner = new Scanner(System.in);
    private static double saldo = 1000.0;
    private static String senha = "1234";
    private static List<String> extrato = new ArrayList<>();
    private static final String ARQUIVO_DADOS = "dados_conta.txt";
    
    public static void main(String[] args) {
        carregarDados();
        System.out.println("=== SIMULADOR DE CAIXA ELETRÔNICO ===");
        
        if (!autenticar()) {
            System.out.println("Senha incorreta! Programa encerrado.");
            return;
        }
        
        exibirMenu();
    }
    
    private static boolean autenticar() {
        System.out.print("Digite sua senha: ");
        String senhaDigitada = scanner.nextLine();
        return senhaDigitada.equals(senha);
    }
    
    private static void exibirMenu() {
        while (true) {
            System.out.println("\n=== MENU PRINCIPAL ===");
            System.out.println("1. Consultar saldo");
            System.out.println("2. Realizar saque");
            System.out.println("3. Fazer depósito");
            System.out.println("4. Transferir dinheiro");
            System.out.println("5. Ver extrato");
            System.out.println("6. Alterar senha");
            System.out.println("7. Sair");
            System.out.print("Escolha uma opção: ");
            
            try {
                int opcao = Integer.parseInt(scanner.nextLine());
                
                switch (opcao) {
                    case 1:
                        consultarSaldo();
                        break;
                    case 2:
                        realizarSaque();
                        break;
                    case 3:
                        fazerDeposito();
                        break;
                    case 4:
                        transferirDinheiro();
                        break;
                    case 5:
                        verExtrato();
                        break;
                    case 6:
                        alterarSenha();
                        break;
                    case 7:
                        salvarDados();
                        System.out.println("Obrigado por usar nosso caixa eletrônico!");
                        return;
                    default:
                        System.out.println("Opção inválida!");
                }
            } catch (NumberFormatException e) {
                System.out.println("Por favor, digite um número válido!");
            }
        }
    }
    
    private static void consultarSaldo() {
        System.out.println("\n=== CONSULTA DE SALDO ===");
        System.out.printf("Seu saldo atual é: R$ %.2f\n", saldo);
        adicionarExtrato("Consulta de saldo");
    }
    
    private static void realizarSaque() {
        System.out.println("\n=== REALIZAR SAQUE ===");
        System.out.printf("Saldo disponível: R$ %.2f\n", saldo);
        System.out.print("Digite o valor para saque: R$ ");
        
        try {
            double valor = Double.parseDouble(scanner.nextLine().replace(",", "."));
            
            if (valor <= 0) {
                System.out.println("Valor inválido!");
                return;
            }
            
            if (valor > saldo) {
                System.out.println("Saldo insuficiente!");
                return;
            }
            
            saldo -= valor;
            System.out.printf("Saque realizado com sucesso! Novo saldo: R$ %.2f\n", saldo);
            adicionarExtrato("Saque: R$ " + String.format("%.2f", valor));
            
        } catch (NumberFormatException e) {
            System.out.println("Valor inválido!");
        }
    }
    
    private static void fazerDeposito() {
        System.out.println("\n=== FAZER DEPÓSITO ===");
        System.out.print("Digite o valor para depósito: R$ ");
        
        try {
            double valor = Double.parseDouble(scanner.nextLine().replace(",", "."));
            
            if (valor <= 0) {
                System.out.println("Valor inválido!");
                return;
            }
            
            saldo += valor;
            System.out.printf("Depósito realizado com sucesso! Novo saldo: R$ %.2f\n", saldo);
            adicionarExtrato("Depósito: R$ " + String.format("%.2f", valor));
            
        } catch (NumberFormatException e) {
            System.out.println("Valor inválido!");
        }
    }
    
    private static void transferirDinheiro() {
        System.out.println("\n=== TRANSFERIR DINHEIRO ===");
        System.out.printf("Saldo disponível: R$ %.2f\n", saldo);
        System.out.print("Digite o valor para transferência: R$ ");
        
        try {
            double valor = Double.parseDouble(scanner.nextLine().replace(",", "."));
            
            if (valor <= 0) {
                System.out.println("Valor inválido!");
                return;
            }
            
            if (valor > saldo) {
                System.out.println("Saldo insuficiente!");
                return;
            }
            
            System.out.print("Digite o número da conta de destino: ");
            String contaDestino = scanner.nextLine();
            
            saldo -= valor;
            System.out.printf("Transferência realizada com sucesso! Novo saldo: R$ %.2f\n", saldo);
            adicionarExtrato("Transferência para " + contaDestino + ": R$ " + String.format("%.2f", valor));
            
        } catch (NumberFormatException e) {
            System.out.println("Valor inválido!");
        }
    }
    
    private static void verExtrato() {
        System.out.println("\n=== EXTRATO DE OPERAÇÕES ===");
        
        if (extrato.isEmpty()) {
            System.out.println("Nenhuma operação realizada ainda.");
            return;
        }
        
        for (int i = 0; i < extrato.size(); i++) {
            System.out.println((i + 1) + ". " + extrato.get(i));
        }
    }
    
    private static void alterarSenha() {
        System.out.println("\n=== ALTERAR SENHA ===");
        System.out.print("Digite a senha atual: ");
        String senhaAtual = scanner.nextLine();
        
        if (!senhaAtual.equals(senha)) {
            System.out.println("Senha incorreta!");
            return;
        }
        
        System.out.print("Digite a nova senha: ");
        String novaSenha = scanner.nextLine();
        
        if (novaSenha.length() < 4) {
            System.out.println("A senha deve ter pelo menos 4 caracteres!");
            return;
        }
        
        senha = novaSenha;
        System.out.println("Senha alterada com sucesso!");
        adicionarExtrato("Alteração de senha");
    }
    
    private static void adicionarExtrato(String operacao) {
        String timestamp = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date());
        extrato.add(timestamp + " - " + operacao);
        
        if (extrato.size() > 50) {
            extrato.remove(0);
        }
    }
    
    private static void carregarDados() {
        try (BufferedReader reader = new BufferedReader(new FileReader(ARQUIVO_DADOS))) {
            saldo = Double.parseDouble(reader.readLine());
            senha = reader.readLine();
            
            String linha;
            while ((linha = reader.readLine()) != null) {
                extrato.add(linha);
            }
        } catch (FileNotFoundException e) {
            System.out.println("Arquivo de dados não encontrado. Usando configurações padrão.");
        } catch (IOException e) {
            System.out.println("Erro ao carregar dados: " + e.getMessage());
        }
    }
    
    private static void salvarDados() {
        try (PrintWriter writer = new PrintWriter(new FileWriter(ARQUIVO_DADOS))) {
            writer.println(saldo);
            writer.println(senha);
            
            for (String operacao : extrato) {
                writer.println(operacao);
            }
        } catch (IOException e) {
            System.out.println("Erro ao salvar dados: " + e.getMessage());
        }
    }
} 