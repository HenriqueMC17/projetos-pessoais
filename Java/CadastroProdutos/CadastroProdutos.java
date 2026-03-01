import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

class Produto {
    private String codigo;
    private String nome;
    private double preco;
    private int quantidade;
    private String dataCadastro;
    
    public Produto(String codigo, String nome, double preco, int quantidade) {
        this.codigo = codigo;
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
        this.dataCadastro = new SimpleDateFormat("dd/MM/yyyy HH:mm").format(new Date());
    }
    
    // Getters e Setters
    public String getCodigo() { return codigo; }
    public String getNome() { return nome; }
    public double getPreco() { return preco; }
    public int getQuantidade() { return quantidade; }
    public String getDataCadastro() { return dataCadastro; }
    
    public void setNome(String nome) { this.nome = nome; }
    public void setPreco(double preco) { this.preco = preco; }
    public void setQuantidade(int quantidade) { this.quantidade = quantidade; }
    
    @Override
    public String toString() {
        return String.format("Código: %s | Nome: %s | Preço: R$ %.2f | Quantidade: %d | Cadastro: %s",
                codigo, nome, preco, quantidade, dataCadastro);
    }
    
    public String toFileString() {
        return codigo + ";" + nome + ";" + preco + ";" + quantidade + ";" + dataCadastro;
    }
}

public class CadastroProdutos {
    private static List<Produto> produtos = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);
    private static final String ARQUIVO_PRODUTOS = "produtos.txt";
    
    public static void main(String[] args) {
        carregarProdutos();
        exibirMenu();
    }
    
    private static void exibirMenu() {
        while (true) {
            System.out.println("\n=== SISTEMA DE CADASTRO DE PRODUTOS ===");
            System.out.println("1. Cadastrar novo produto");
            System.out.println("2. Listar todos os produtos");
            System.out.println("3. Buscar produto por código");
            System.out.println("4. Atualizar produto");
            System.out.println("5. Excluir produto");
            System.out.println("6. Relatório de estoque");
            System.out.println("7. Sair");
            System.out.print("Escolha uma opção: ");
            
            try {
                int opcao = Integer.parseInt(scanner.nextLine());
                
                switch (opcao) {
                    case 1:
                        cadastrarProduto();
                        break;
                    case 2:
                        listarProdutos();
                        break;
                    case 3:
                        buscarProduto();
                        break;
                    case 4:
                        atualizarProduto();
                        break;
                    case 5:
                        excluirProduto();
                        break;
                    case 6:
                        relatorioEstoque();
                        break;
                    case 7:
                        salvarProdutos();
                        System.out.println("Sistema encerrado. Dados salvos!");
                        return;
                    default:
                        System.out.println("Opção inválida!");
                }
            } catch (NumberFormatException e) {
                System.out.println("Por favor, digite um número válido!");
            }
        }
    }
    
    private static void cadastrarProduto() {
        System.out.println("\n=== CADASTRAR NOVO PRODUTO ===");
        
        // Código do produto
        String codigo;
        do {
            System.out.print("Digite o código do produto: ");
            codigo = scanner.nextLine().trim();
            if (codigo.isEmpty()) {
                System.out.println("Código não pode estar vazio!");
                continue;
            }
            if (produtoExiste(codigo)) {
                System.out.println("Produto com este código já existe!");
                continue;
            }
            break;
        } while (true);
        
        // Nome do produto
        String nome;
        do {
            System.out.print("Digite o nome do produto: ");
            nome = scanner.nextLine().trim();
            if (nome.isEmpty()) {
                System.out.println("Nome não pode estar vazio!");
            } else {
                break;
            }
        } while (true);
        
        // Preço do produto
        double preco;
        do {
            try {
                System.out.print("Digite o preço do produto (R$): ");
                preco = Double.parseDouble(scanner.nextLine().replace(",", "."));
                if (preco < 0) {
                    System.out.println("Preço não pode ser negativo!");
                } else {
                    break;
                }
            } catch (NumberFormatException e) {
                System.out.println("Digite um preço válido!");
            }
        } while (true);
        
        // Quantidade do produto
        int quantidade;
        do {
            try {
                System.out.print("Digite a quantidade em estoque: ");
                quantidade = Integer.parseInt(scanner.nextLine());
                if (quantidade < 0) {
                    System.out.println("Quantidade não pode ser negativa!");
                } else {
                    break;
                }
            } catch (NumberFormatException e) {
                System.out.println("Digite uma quantidade válida!");
            }
        } while (true);
        
        Produto produto = new Produto(codigo, nome, preco, quantidade);
        produtos.add(produto);
        salvarProdutos();
        
        System.out.println("\nProduto cadastrado com sucesso!");
        System.out.println(produto);
    }
    
    private static void listarProdutos() {
        System.out.println("\n=== LISTA DE PRODUTOS ===");
        
        if (produtos.isEmpty()) {
            System.out.println("Nenhum produto cadastrado!");
            return;
        }
        
        for (int i = 0; i < produtos.size(); i++) {
            System.out.println((i + 1) + ". " + produtos.get(i));
        }
        
        System.out.println("\nTotal de produtos: " + produtos.size());
    }
    
    private static void buscarProduto() {
        System.out.println("\n=== BUSCAR PRODUTO ===");
        System.out.print("Digite o código do produto: ");
        String codigo = scanner.nextLine().trim();
        
        Produto produto = encontrarProduto(codigo);
        if (produto != null) {
            System.out.println("\nProduto encontrado:");
            System.out.println(produto);
        } else {
            System.out.println("Produto não encontrado!");
        }
    }
    
    private static void atualizarProduto() {
        System.out.println("\n=== ATUALIZAR PRODUTO ===");
        System.out.print("Digite o código do produto: ");
        String codigo = scanner.nextLine().trim();
        
        Produto produto = encontrarProduto(codigo);
        if (produto == null) {
            System.out.println("Produto não encontrado!");
            return;
        }
        
        System.out.println("Produto atual: " + produto);
        System.out.println("\nDigite as novas informações (deixe em branco para manter o atual):");
        
        // Novo nome
        System.out.print("Novo nome: ");
        String novoNome = scanner.nextLine().trim();
        if (!novoNome.isEmpty()) {
            produto.setNome(novoNome);
        }
        
        // Novo preço
        System.out.print("Novo preço (R$): ");
        String novoPrecoStr = scanner.nextLine().trim();
        if (!novoPrecoStr.isEmpty()) {
            try {
                double novoPreco = Double.parseDouble(novoPrecoStr.replace(",", "."));
                if (novoPreco >= 0) {
                    produto.setPreco(novoPreco);
                } else {
                    System.out.println("Preço inválido! Mantendo o preço atual.");
                }
            } catch (NumberFormatException e) {
                System.out.println("Preço inválido! Mantendo o preço atual.");
            }
        }
        
        // Nova quantidade
        System.out.print("Nova quantidade: ");
        String novaQuantidadeStr = scanner.nextLine().trim();
        if (!novaQuantidadeStr.isEmpty()) {
            try {
                int novaQuantidade = Integer.parseInt(novaQuantidadeStr);
                if (novaQuantidade >= 0) {
                    produto.setQuantidade(novaQuantidade);
                } else {
                    System.out.println("Quantidade inválida! Mantendo a quantidade atual.");
                }
            } catch (NumberFormatException e) {
                System.out.println("Quantidade inválida! Mantendo a quantidade atual.");
            }
        }
        
        salvarProdutos();
        System.out.println("\nProduto atualizado com sucesso!");
        System.out.println("Produto atualizado: " + produto);
    }
    
    private static void excluirProduto() {
        System.out.println("\n=== EXCLUIR PRODUTO ===");
        System.out.print("Digite o código do produto: ");
        String codigo = scanner.nextLine().trim();
        
        Produto produto = encontrarProduto(codigo);
        if (produto == null) {
            System.out.println("Produto não encontrado!");
            return;
        }
        
        System.out.println("Produto a ser excluído: " + produto);
        System.out.print("Tem certeza? (s/n): ");
        String confirmacao = scanner.nextLine().trim().toLowerCase();
        
        if (confirmacao.equals("s") || confirmacao.equals("sim")) {
            produtos.remove(produto);
            salvarProdutos();
            System.out.println("Produto excluído com sucesso!");
        } else {
            System.out.println("Operação cancelada!");
        }
    }
    
    private static void relatorioEstoque() {
        System.out.println("\n=== RELATÓRIO DE ESTOQUE ===");
        
        if (produtos.isEmpty()) {
            System.out.println("Nenhum produto cadastrado!");
            return;
        }
        
        double valorTotal = 0;
        int totalItens = 0;
        int produtosSemEstoque = 0;
        
        for (Produto produto : produtos) {
            valorTotal += produto.getPreco() * produto.getQuantidade();
            totalItens += produto.getQuantidade();
            if (produto.getQuantidade() == 0) {
                produtosSemEstoque++;
            }
        }
        
        System.out.println("Total de produtos cadastrados: " + produtos.size());
        System.out.println("Total de itens em estoque: " + totalItens);
        System.out.println("Valor total do estoque: R$ " + String.format("%.2f", valorTotal));
        System.out.println("Produtos sem estoque: " + produtosSemEstoque);
        
        // Produtos com estoque baixo (menos de 5 unidades)
        System.out.println("\nProdutos com estoque baixo (menos de 5 unidades):");
        boolean encontrou = false;
        for (Produto produto : produtos) {
            if (produto.getQuantidade() > 0 && produto.getQuantidade() < 5) {
                System.out.println("- " + produto.getNome() + " (" + produto.getQuantidade() + " unidades)");
                encontrou = true;
            }
        }
        if (!encontrou) {
            System.out.println("Nenhum produto com estoque baixo.");
        }
    }
    
    private static boolean produtoExiste(String codigo) {
        return encontrarProduto(codigo) != null;
    }
    
    private static Produto encontrarProduto(String codigo) {
        for (Produto produto : produtos) {
            if (produto.getCodigo().equalsIgnoreCase(codigo)) {
                return produto;
            }
        }
        return null;
    }
    
    private static void carregarProdutos() {
        try (BufferedReader reader = new BufferedReader(new FileReader(ARQUIVO_PRODUTOS))) {
            String linha;
            while ((linha = reader.readLine()) != null) {
                String[] dados = linha.split(";");
                if (dados.length >= 4) {
                    String codigo = dados[0];
                    String nome = dados[1];
                    double preco = Double.parseDouble(dados[2]);
                    int quantidade = Integer.parseInt(dados[3]);
                    
                    Produto produto = new Produto(codigo, nome, preco, quantidade);
                    produtos.add(produto);
                }
            }
            System.out.println("Produtos carregados com sucesso!");
        } catch (FileNotFoundException e) {
            System.out.println("Arquivo de produtos não encontrado. Será criado automaticamente.");
        } catch (IOException e) {
            System.out.println("Erro ao carregar produtos: " + e.getMessage());
        }
    }
    
    private static void salvarProdutos() {
        try (PrintWriter writer = new PrintWriter(new FileWriter(ARQUIVO_PRODUTOS))) {
            for (Produto produto : produtos) {
                writer.println(produto.toFileString());
            }
        } catch (IOException e) {
            System.out.println("Erro ao salvar produtos: " + e.getMessage());
        }
    }
} 