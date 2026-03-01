import java.util.*;
import java.util.regex.*;

public class ValidadorPlacaCarro {
    private static Scanner scanner = new Scanner(System.in);
    private static List<String> historico = new ArrayList<>();
    
    public static void main(String[] args) {
        System.out.println("=== VALIDADOR DE PLACA DE CARRO ===");
        exibirMenu();
    }
    
    private static void exibirMenu() {
        while (true) {
            System.out.println("\nEscolha uma opção:");
            System.out.println("1. Validar placa");
            System.out.println("2. Ver histórico");
            System.out.println("3. Informações sobre padrões");
            System.out.println("4. Sair");
            System.out.print("Opção: ");
            
            try {
                int opcao = Integer.parseInt(scanner.nextLine());
                
                switch (opcao) {
                    case 1:
                        validarPlaca();
                        break;
                    case 2:
                        mostrarHistorico();
                        break;
                    case 3:
                        mostrarInformacoes();
                        break;
                    case 4:
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
    
    private static void validarPlaca() {
        System.out.println("\n=== VALIDAR PLACA ===");
        System.out.print("Digite a placa (ex: ABC-1234 ou ABC1D23): ");
        String placa = scanner.nextLine().trim().toUpperCase();
        
        boolean validaMercosul = validarPlacaMercosul(placa);
        boolean validaAntiga = validarPlacaAntiga(placa);
        
        System.out.println("\nResultado da validação:");
        System.out.println("Placa: " + placa);
        
        if (validaMercosul) {
            System.out.println("✅ VÁLIDA - Padrão Mercosul");
            System.out.println("Formato: 3 letras + 1 número + 1 letra + 2 números");
        } else if (validaAntiga) {
            System.out.println("✅ VÁLIDA - Padrão Antigo");
            System.out.println("Formato: 3 letras + hífen + 4 números");
        } else {
            System.out.println("❌ INVÁLIDA");
            System.out.println("A placa não segue nenhum padrão válido.");
        }
        
        String resultado = String.format("Placa: %s | Mercosul: %s | Antiga: %s", 
            placa, validaMercosul ? "Válida" : "Inválida", validaAntiga ? "Válida" : "Inválida");
        adicionarHistorico(resultado);
    }
    
    private static boolean validarPlacaMercosul(String placa) {
        // Padrão Mercosul: ABC1D23 (3 letras + 1 número + 1 letra + 2 números)
        String padraoMercosul = "^[A-Z]{3}[0-9][A-Z][0-9]{2}$";
        return Pattern.matches(padraoMercosul, placa);
    }
    
    private static boolean validarPlacaAntiga(String placa) {
        // Padrão Antigo: ABC-1234 (3 letras + hífen + 4 números)
        String padraoAntigo = "^[A-Z]{3}-[0-9]{4}$";
        return Pattern.matches(padraoAntigo, placa);
    }
    
    private static void mostrarHistorico() {
        System.out.println("\n=== HISTÓRICO DE VALIDAÇÕES ===");
        
        if (historico.isEmpty()) {
            System.out.println("Nenhuma validação realizada ainda.");
            return;
        }
        
        for (int i = 0; i < historico.size(); i++) {
            System.out.println((i + 1) + ". " + historico.get(i));
        }
    }
    
    private static void mostrarInformacoes() {
        System.out.println("\n=== INFORMAÇÕES SOBRE PADRÕES ===");
        System.out.println("Existem dois padrões de placa válidos no Brasil:");
        System.out.println();
        System.out.println("1. PADRÃO MERCOSUL:");
        System.out.println("   - Formato: ABC1D23");
        System.out.println("   - 3 letras + 1 número + 1 letra + 2 números");
        System.out.println("   - Exemplos: ABC1D23, XYZ5A89, DEF2B45");
        System.out.println();
        System.out.println("2. PADRÃO ANTIGO:");
        System.out.println("   - Formato: ABC-1234");
        System.out.println("   - 3 letras + hífen + 4 números");
        System.out.println("   - Exemplos: ABC-1234, XYZ-5678, DEF-9012");
        System.out.println();
        System.out.println("NOTA: O padrão Mercosul é o mais recente e está sendo");
        System.out.println("gradualmente adotado em todo o Brasil.");
    }
    
    private static void adicionarHistorico(String registro) {
        historico.add(registro);
        if (historico.size() > 50) {
            historico.remove(0);
        }
    }
} 