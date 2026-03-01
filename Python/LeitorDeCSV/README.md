# Leitor de CSV

## Descrição
Este projeto implementa um leitor e analisador de arquivos CSV (Comma-Separated Values). Permite carregar, visualizar, filtrar e analisar dados de arquivos CSV de forma interativa.

## Funcionalidades
- Carregar arquivos CSV
- Visualizar dados em formato tabular
- Filtrar dados por coluna e valor
- Estatísticas básicas dos dados
- Exportar dados filtrados
- Validação de arquivos CSV
- Suporte a diferentes delimitadores
- Interface amigável no terminal

## Como usar
1. Execute o arquivo `leitor_csv.py`
2. Escolha um arquivo CSV para carregar
3. Use as opções do menu para analisar os dados
4. Visualize estatísticas e filtre informações
5. Exporte resultados se necessário

## Tecnologias utilizadas
- Python 3.x
- Biblioteca csv (para leitura de arquivos CSV)
- Biblioteca pandas (para análise de dados)
- Biblioteca tabulate (para exibição tabular)

## Estrutura do projeto
```
LeitorDeCSV/
├── README.md
├── leitor_csv.py
├── dados_exemplo.csv
└── requirements.txt
```

## Funcionalidades de análise
- Contagem de linhas e colunas
- Tipos de dados por coluna
- Valores únicos
- Valores nulos/missing
- Estatísticas descritivas
- Filtros por condições

## Formatos suportados
- CSV padrão (vírgula como delimitador)
- TSV (tab como delimitador)
- Arquivos com diferentes encodings
- Headers opcionais 