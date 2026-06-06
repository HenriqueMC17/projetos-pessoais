# Validador de CPF

## Descrição
Este projeto implementa um validador de CPF (Cadastro de Pessoa Física) que verifica se um número de CPF é válido de acordo com o algoritmo oficial brasileiro. O programa também pode gerar CPFs válidos para fins de teste.

## Funcionalidades
- Validação de CPF usando o algoritmo oficial brasileiro
- Geração de CPFs válidos para teste
- Verificação de CPFs com formatação (com pontos e hífen)
- Interface amigável no terminal
- Histórico de validações realizadas
- Detecção de CPFs inválidos comuns

## Como usar
1. Execute o arquivo `validador_cpf.py`
2. Escolha entre validar um CPF ou gerar um CPF válido
3. Digite o CPF a ser validado (com ou sem formatação)
4. Visualize o resultado da validação

## Tecnologias utilizadas
- Python 3.x
- Biblioteca re (para expressões regulares)
- Biblioteca random (para geração de CPFs)

## Estrutura do projeto
```
ValidadorCPF/
├── README.md
├── validador_cpf.py
└── requirements.txt
```

## Algoritmo de validação
O CPF é validado seguindo o algoritmo oficial brasileiro:
1. Multiplica-se os 9 primeiros dígitos pelos pesos (10 a 2)
2. Calcula-se o primeiro dígito verificador
3. Multiplica-se os 10 primeiros dígitos pelos pesos (11 a 2)
4. Calcula-se o segundo dígito verificador
5. Compara-se com os dígitos fornecidos 