# Cadastro de Produtos

## Descrição
Este projeto implementa um sistema de cadastro de produtos via console em Java. Permite realizar operações CRUD (Create, Read, Update, Delete) completas para gerenciar produtos com informações como código, nome, preço e quantidade.

## Funcionalidades
- Cadastrar novos produtos
- Listar todos os produtos
- Buscar produto por código
- Atualizar informações de produtos
- Excluir produtos
- Validação de entrada
- Persistência em arquivo
- Menu interativo
- Relatórios básicos

## Como usar
1. Compile o arquivo `CadastroProdutos.java`
2. Execute o programa: `java CadastroProdutos`
3. Use o menu interativo para navegar pelas opções
4. Os dados são salvos automaticamente em arquivo

## Tecnologias utilizadas
- Java 8+
- File I/O para persistência
- Scanner para entrada de dados
- ArrayList para armazenamento
- Exceções para tratamento de erros

## Estrutura do projeto
```
CadastroProdutos/
├── README.md
├── CadastroProdutos.java
└── produtos.txt (criado automaticamente)
```

## Funcionalidades do sistema
- Validação de dados de entrada
- Código único para cada produto
- Preços com duas casas decimais
- Quantidade em estoque
- Histórico de operações
- Backup automático de dados
- Interface amigável

## Características do produto
- Código: identificador único
- Nome: descrição do produto
- Preço: valor em reais
- Quantidade: estoque disponível
- Data de cadastro: registro automático 