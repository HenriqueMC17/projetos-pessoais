# Calculadora de Idade

## Descrição
Aplicação web em PHP para calcular idade a partir da data de nascimento. Fornece informações detalhadas sobre o tempo de vida em diferentes unidades de medida.

## Funcionalidades
- Cálculo preciso de idade em anos, meses e dias
- Exibição de estatísticas detalhadas:
  - Dias vividos
  - Semanas vividas
  - Meses vividos
  - Anos completos
- Cálculo do próximo aniversário
- Interface responsiva e amigável
- Suporte a nomes personalizados

## Tecnologias Utilizadas
- PHP 7.4+
- HTML5
- CSS3 (Grid Layout)
- DateTime (PHP)

## Estrutura do Projeto
```
CalculadoraIdade/
├── index.php          # Arquivo principal da aplicação
└── README.md          # Documentação do projeto
```

## Como Usar
1. Coloque os arquivos em um servidor web com PHP
2. Acesse o arquivo `index.php` no navegador
3. Digite seu nome (opcional)
4. Selecione sua data de nascimento
5. Clique em "Calcular Idade" para ver os resultados

## Instalação
1. Certifique-se de ter PHP instalado (versão 7.4 ou superior)
2. Copie os arquivos para o diretório do seu servidor web
3. Acesse via navegador: `http://localhost/CalculadoraIdade/`

## Informações Calculadas
- **Idade atual**: Anos, meses e dias desde o nascimento
- **Dias vividos**: Total de dias desde o nascimento
- **Semanas vividas**: Total de semanas completas
- **Meses vividos**: Total de meses completos
- **Próximo aniversário**: Dias restantes e data do próximo aniversário

## Recursos Especiais
- 🎂 Exibição visual da idade em destaque
- 🎉 Mensagem especial no dia do aniversário
- 🎁 Contagem regressiva para o próximo aniversário
- 📊 Estatísticas detalhadas em cards organizados

## Cálculos Realizados
- Uso da classe `DateTime` do PHP para cálculos precisos
- Diferença entre data atual e data de nascimento
- Cálculo do próximo aniversário considerando o ano atual
- Conversões para diferentes unidades de tempo

## Interface
- Design responsivo com CSS Grid
- Cards organizados para diferentes informações
- Cores temáticas para melhor experiência visual
- Layout adaptável para diferentes tamanhos de tela

## Melhorias Possíveis
- Cálculo de signo do zodíaco
- Estatísticas de vida (batimentos cardíacos, respirações)
- Comparação com datas históricas
- Exportação de relatório de idade
- Integração com calendário

## Requisitos do Sistema
- Servidor web (Apache, Nginx, etc.)
- PHP 7.4 ou superior
- Navegador web moderno com suporte a CSS Grid

## Licença
Este projeto é de uso livre para fins educacionais. 