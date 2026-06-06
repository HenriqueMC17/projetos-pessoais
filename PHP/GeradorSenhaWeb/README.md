# Gerador de Senhas Web

## Descrição
Aplicação web em PHP para geração de senhas seguras e aleatórias. Permite personalizar o comprimento e tipos de caracteres incluídos na senha.

## Funcionalidades
- Geração de senhas com comprimento personalizável (4-50 caracteres)
- Opções de caracteres configuráveis:
  - Letras maiúsculas (A-Z)
  - Letras minúsculas (a-z)
  - Números (0-9)
  - Símbolos especiais (!@#$%^&*)
- Avaliação da força da senha gerada
- Botão para copiar senha para área de transferência
- Interface responsiva e intuitiva

## Tecnologias Utilizadas
- PHP 7.4+
- HTML5
- CSS3
- JavaScript (para funcionalidade de copiar)

## Estrutura do Projeto
```
GeradorSenhaWeb/
├── index.php          # Arquivo principal da aplicação
└── README.md          # Documentação do projeto
```

## Como Usar
1. Coloque os arquivos em um servidor web com PHP
2. Acesse o arquivo `index.php` no navegador
3. Configure o comprimento e tipos de caracteres desejados
4. Clique em "Gerar Senha" para criar uma nova senha
5. Use o botão "Copiar Senha" para copiar a senha gerada

## Instalação
1. Certifique-se de ter PHP instalado (versão 7.4 ou superior)
2. Copie os arquivos para o diretório do seu servidor web
3. Acesse via navegador: `http://localhost/GeradorSenhaWeb/`

## Avaliação de Força da Senha
O sistema avalia a força da senha baseado em:
- **Fraca**: 1-2 critérios atendidos
- **Média**: 3-4 critérios atendidos
- **Forte**: 5+ critérios atendidos

Critérios considerados:
- Inclusão de letras maiúsculas
- Inclusão de letras minúsculas
- Inclusão de números
- Inclusão de símbolos
- Comprimento mínimo de 12 caracteres

## Segurança
- Utiliza `random_int()` para geração criptograficamente segura
- Validação de entrada do usuário
- Escape adequado de saída HTML
- Não armazena senhas geradas

## Melhorias Possíveis
- Histórico de senhas geradas
- Exportação de senhas
- Geração de múltiplas senhas
- Verificação de senhas contra dicionários
- Integração com gerenciadores de senha

## Requisitos do Sistema
- Servidor web (Apache, Nginx, etc.)
- PHP 7.4 ou superior
- Navegador web moderno com suporte a Clipboard API

## Licença
Este projeto é de uso livre para fins educacionais. 