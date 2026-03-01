# Conversor de Moedas Web

## Descrição
Aplicação web em PHP para conversão de moedas com interface amigável. Permite converter entre diferentes moedas usando taxas de câmbio simuladas.

## Funcionalidades
- Conversão entre 5 moedas principais (BRL, USD, EUR, GBP, JPY)
- Interface web responsiva e intuitiva
- Formulário com validação
- Exibição da taxa de câmbio utilizada
- Formatação adequada dos valores

## Tecnologias Utilizadas
- PHP 7.4+
- HTML5
- CSS3
- JavaScript (opcional para melhorias)

## Estrutura do Projeto
```
ConversorMoedaWeb/
├── index.php          # Arquivo principal da aplicação
└── README.md          # Documentação do projeto
```

## Como Usar
1. Coloque os arquivos em um servidor web com PHP
2. Acesse o arquivo `index.php` no navegador
3. Preencha o valor e selecione as moedas
4. Clique em "Converter" para ver o resultado

## Instalação
1. Certifique-se de ter PHP instalado (versão 7.4 ou superior)
2. Copie os arquivos para o diretório do seu servidor web
3. Acesse via navegador: `http://localhost/ConversorMoedaWeb/`

## Moedas Suportadas
- **BRL** - Real Brasileiro
- **USD** - Dólar Americano
- **EUR** - Euro
- **GBP** - Libra Esterlina
- **JPY** - Iene Japonês

## Taxas de Câmbio
As taxas utilizadas são simuladas para fins educacionais. Em produção, recomenda-se:
- Integração com APIs de câmbio (ex: Fixer.io, ExchangeRate-API)
- Atualização automática das taxas
- Cache das taxas para melhor performance

## Melhorias Possíveis
- Integração com API real de câmbio
- Histórico de conversões
- Gráficos de variação cambial
- Conversão em tempo real
- Suporte a mais moedas
- Cache de taxas de câmbio

## Requisitos do Sistema
- Servidor web (Apache, Nginx, etc.)
- PHP 7.4 ou superior
- Navegador web moderno

## Licença
Este projeto é de uso livre para fins educacionais. 