# Gerador de Senha

## Descrição
Este projeto implementa um gerador de senhas aleatórias e seguras. O programa permite personalizar os critérios da senha, incluindo comprimento, tipos de caracteres e requisitos de segurança.

## Funcionalidades
- Geração de senhas aleatórias com diferentes comprimentos
- Opções de caracteres (letras maiúsculas, minúsculas, números, símbolos)
- Validação de força da senha
- Histórico de senhas geradas
- Interface amigável no terminal
- Geração de múltiplas senhas de uma vez

## Como usar
1. Execute o arquivo `gerador_senha.py`
2. Escolha o comprimento da senha
3. Selecione os tipos de caracteres desejados
4. Visualize a senha gerada
5. Opcionalmente, salve a senha no histórico

## Tecnologias utilizadas
- Python 3.x
- Biblioteca random (para geração aleatória)
- Biblioteca string (para conjuntos de caracteres)

## Estrutura do projeto
```
GeradorDeSenha/
├── README.md
├── gerador_senha.py
└── requirements.txt
```

## Critérios de segurança
- Senhas com pelo menos 8 caracteres
- Mistura de diferentes tipos de caracteres
- Geração verdadeiramente aleatória
- Validação de força da senha 