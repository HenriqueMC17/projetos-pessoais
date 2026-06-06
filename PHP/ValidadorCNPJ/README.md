# Validador de CNPJ

## Descrição
Aplicação web em PHP para validação de CNPJ (Cadastro Nacional da Pessoa Jurídica). Verifica se um CNPJ é válido usando o algoritmo oficial de validação.

## Funcionalidades
- Validação completa de CNPJ usando algoritmo oficial
- Aceita CNPJ com ou sem formatação
- Exibe CNPJ formatado quando válido
- Mostra informações detalhadas do CNPJ
- Interface intuitiva e responsiva
- Validação em tempo real

## Tecnologias Utilizadas
- PHP 7.4+
- HTML5
- CSS3
- Algoritmo oficial de validação de CNPJ

## Estrutura do Projeto
```
ValidadorCNPJ/
├── index.php          # Arquivo principal da aplicação
└── README.md          # Documentação do projeto
```

## Como Usar
1. Coloque os arquivos em um servidor web com PHP
2. Acesse o arquivo `index.php` no navegador
3. Digite o CNPJ no campo de entrada
4. Clique em "Validar CNPJ" para verificar
5. O resultado será exibido imediatamente

## Instalação
1. Certifique-se de ter PHP instalado (versão 7.4 ou superior)
2. Copie os arquivos para o diretório do seu servidor web
3. Acesse via navegador: `http://localhost/ValidadorCNPJ/`

## Algoritmo de Validação
O sistema implementa o algoritmo oficial de validação de CNPJ:

1. **Limpeza**: Remove caracteres não numéricos
2. **Verificação de tamanho**: Confirma se tem exatamente 14 dígitos
3. **Verificação de sequência**: Rejeita CNPJs com todos os dígitos iguais
4. **Cálculo do primeiro DV**: Aplica fórmula com pesos 5,4,3,2,9,8,7,6,5,4,3,2
5. **Cálculo do segundo DV**: Aplica fórmula com pesos 6,5,4,3,2,9,8,7,6,5,4,3,2
6. **Comparação**: Verifica se os dígitos verificadores calculados coincidem

## Formatos Aceitos
- Com formatação: `00.000.000/0000-00`
- Sem formatação: `00000000000000`
- Com espaços: `00 000 000 0000 00`

## Exemplos de CNPJ Válidos
- `11.222.333/0001-81`
- `00.000.000/0001-91`
- `12.345.678/0001-95`

## Validações Realizadas
- ✅ Verificação de comprimento (14 dígitos)
- ✅ Verificação de sequência repetida
- ✅ Cálculo do primeiro dígito verificador
- ✅ Cálculo do segundo dígito verificador
- ✅ Formatação automática do resultado

## Melhorias Possíveis
- Validação em tempo real com JavaScript
- Consulta à Receita Federal (API)
- Histórico de validações
- Exportação de resultados
- Validação em lote

## Requisitos do Sistema
- Servidor web (Apache, Nginx, etc.)
- PHP 7.4 ou superior
- Navegador web moderno

## Licença
Este projeto é de uso livre para fins educacionais. 