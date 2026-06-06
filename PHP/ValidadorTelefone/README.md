# Validador de Telefone Brasileiro

## Descrição
Aplicação web em PHP para validação de números de telefone brasileiros (fixo e celular) com ou sem formatação.

## Funcionalidades
- Validação de telefones fixos e celulares
- Aceita números com ou sem DDD, com ou sem máscara
- Exibe mensagem de validade
- Interface simples e responsiva
- Exemplos de formatos válidos

## Tecnologias Utilizadas
- PHP 7.4+
- HTML5
- CSS3
- Expressões regulares (regex)

## Estrutura do Projeto
```
ValidadorTelefone/
├── index.php          # Arquivo principal da aplicação
└── README.md          # Documentação do projeto
```

## Como Usar
1. Coloque os arquivos em um servidor web com PHP
2. Acesse o arquivo `index.php` no navegador
3. Digite o telefone no campo indicado
4. Clique em "Validar Telefone" para verificar

## Instalação
1. Certifique-se de ter PHP instalado (versão 7.4 ou superior)
2. Copie os arquivos para o diretório do seu servidor web
3. Acesse via navegador: `http://localhost/ValidadorTelefone/`

## Formatos Aceitos
- (11) 91234-5678
- (21) 2345-6789
- 11912345678
- 2123456789

## Validações Realizadas
- DDD válido (2 dígitos)
- Celular: começa com 9 e tem 9 dígitos
- Fixo: começa com 2-8 e tem 8 dígitos
- Aceita com ou sem máscara

## Melhorias Possíveis
- Máscara automática de entrada
- Validação em tempo real com JavaScript
- Consulta à base da Anatel
- Histórico de validações

## Requisitos do Sistema
- Servidor web (Apache, Nginx, etc.)
- PHP 7.4 ou superior
- Navegador web moderno

## Licença
Este projeto é de uso livre para fins educacionais. 