# Validador de Placa de Carro

## Descrição
Este projeto implementa um validador de placas de carro brasileiras via console em Java. Verifica placas no padrão Mercosul e padrão antigo.

## Funcionalidades
- Validação de placas Mercosul (ABC1D23)
- Validação de placas antigas (ABC-1234)
- Verificação de formato
- Validação de caracteres
- Histórico de validações
- Menu interativo
- Explicação dos padrões

## Como usar
1. Compile o arquivo `ValidadorPlacaCarro.java`
2. Execute o programa: `java ValidadorPlacaCarro`
3. Digite uma placa para validar
4. Veja o resultado e explicação

## Tecnologias utilizadas
- Java 8+
- Regex para validação
- Scanner para entrada de dados
- String manipulation
- Pattern matching

## Estrutura do projeto
```
ValidadorPlacaCarro/
├── README.md
└── ValidadorPlacaCarro.java
```

## Padrões de placa
- **Mercosul**: 3 letras + 1 número + 1 letra + 2 números (ABC1D23)
- **Antiga**: 3 letras + hífen + 4 números (ABC-1234) 