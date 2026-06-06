# Agenda de Contatos

## Descrição

Este projeto implementa uma agenda de contatos simples com funcionalidades CRUD (Create, Read, Update, Delete). Permite gerenciar contatos pessoais com informações como nome, telefone, email e endereço.

## Funcionalidades

- Adicionar novos contatos
- Listar todos os contatos
- Buscar contatos por nome ou telefone
- Editar informações de contatos existentes
- Excluir contatos
- Salvar contatos em arquivo JSON
- Carregar contatos do arquivo
- Validação de dados de entrada
- Interface amigável no terminal

## Como usar

1. Execute o arquivo `agenda_contatos.py`
2. Escolha uma opção do menu principal
3. Siga as instruções para cada operação
4. Os contatos são salvos automaticamente

## Tecnologias utilizadas

- Python 3.x
- Biblioteca json (para persistência de dados)
- Biblioteca re (para validação de email)

## Estrutura do projeto

```
AgendaDeContatos/
├── README.md
├── agenda_contatos.py
├── contatos.json
└── requirements.txt
```

## Estrutura de dados

Cada contato contém:
- Nome completo
- Telefone
- Email
- Endereço
- Data de cadastro
- ID único

## Funcionalidades de validação

- Validação de formato de email
- Validação de formato de telefone
- Verificação de duplicatas
- Campos obrigatórios 