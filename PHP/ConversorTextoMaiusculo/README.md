# Conversor de Texto para Maiúsculo

## Descrição
Aplicação web em PHP para converter qualquer texto digitado para letras maiúsculas, com suporte a acentuação e caracteres especiais.

## Funcionalidades
- Conversão de texto para maiúsculo (UTF-8)
- Suporte a acentuação e caracteres especiais
- Interface simples e responsiva
- Botão para copiar o texto convertido

## Tecnologias Utilizadas
- PHP 7.4+
- HTML5
- CSS3
- mbstring (função mb_strtoupper)
- JavaScript (Clipboard API)

## Estrutura do Projeto
```
ConversorTextoMaiusculo/
├── index.php          # Arquivo principal da aplicação
└── README.md          # Documentação do projeto
```

## Como Usar
1. Coloque os arquivos em um servidor web com PHP
2. Acesse o arquivo `index.php` no navegador
3. Digite ou cole o texto desejado
4. Clique em "Converter para MAIÚSCULO"
5. Use o botão "Copiar Texto" para copiar o resultado

## Instalação
1. Certifique-se de ter PHP instalado (versão 7.4 ou superior)
2. Certifique-se de que a extensão mbstring está habilitada
3. Copie os arquivos para o diretório do seu servidor web
4. Acesse via navegador: `http://localhost/ConversorTextoMaiusculo/`

## Recursos Especiais
- Conversão correta de acentos e caracteres especiais
- Botão de cópia rápida para área de transferência
- Layout responsivo

## Melhorias Possíveis
- Conversão para minúsculo
- Contador de caracteres
- Histórico de conversões
- Exportação do texto convertido

## Requisitos do Sistema
- Servidor web (Apache, Nginx, etc.)
- PHP 7.4 ou superior
- Extensão mbstring habilitada
- Navegador web moderno

## Licença
Este projeto é de uso livre para fins educacionais. 