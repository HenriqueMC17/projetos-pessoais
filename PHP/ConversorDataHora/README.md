# Conversor de Data e Hora

## Descrição
Aplicação web em PHP para conversão de datas e horários entre diferentes formatos e fusos horários. Permite visualizar uma data/hora em múltiplos formatos simultaneamente, facilitando a compreensão e manipulação de datas para diferentes contextos.

## Funcionalidades
- Conversão de data/hora para múltiplos formatos (Brasil, EUA, ISO, SQL, etc.)
- Suporte a diferentes fusos horários (Brasil, EUA, Europa, Ásia, Austrália, UTC)
- Ações rápidas: agora, hoje às 00:00, amanhã às 00:00, próxima segunda-feira
- Exibição de informações detalhadas: dia da semana, mês por extenso, timestamp, semana do ano, etc.
- Interface responsiva e intuitiva

## Tecnologias Utilizadas
- PHP 7.4+
- HTML5
- CSS3 (Grid Layout)
- DateTime (PHP)
- Manipulação de Timezone

## Estrutura do Projeto
```
ConversorDataHora/
├── index.php          # Arquivo principal da aplicação
└── README.md          # Documentação do projeto
```

## Como Usar
1. Coloque os arquivos em um servidor web com PHP
2. Acesse o arquivo `index.php` no navegador
3. Selecione uma data/hora ou utilize as ações rápidas
4. Escolha o fuso horário desejado
5. Clique em "Converter" para visualizar todos os formatos

## Exemplos de Formatos Disponíveis
- **Brasil:** 31/12/2024 23:59:59
- **EUA:** 12/31/2024 11:59:59 PM
- **ISO:** 2024-12-31 23:59:59
- **SQL:** 2024-12-31 23:59:59
- **Dia da semana:** Terça-feira
- **Mês por extenso:** Dezembro
- **Timestamp Unix:** 1735689599
- **Semana do ano:** 53

## Fusos Horários Suportados
- Brasil (São Paulo)
- EUA (Nova York)
- Reino Unido (Londres)
- França (Paris)
- Japão (Tóquio)
- Austrália (Sydney)
- UTC (Tempo Universal)

## Recursos Especiais
- Conversão automática entre fusos
- Visualização simultânea em vários padrões
- Ações rápidas para datas comuns
- Exibição do offset UTC e sigla do fuso

## Melhorias Possíveis
- Adicionar mais fusos horários
- Conversão entre duas datas (diferença)
- Histórico de conversões
- Exportação dos resultados
- API para integração

## Requisitos do Sistema
- Servidor web (Apache, Nginx, etc.)
- PHP 7.4 ou superior
- Navegador web moderno com suporte a CSS Grid

## Licença
Este projeto é de uso livre para fins educacionais. 