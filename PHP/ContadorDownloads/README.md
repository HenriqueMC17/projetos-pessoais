# Contador de Downloads

## Descrição
Sistema web em PHP para gerenciar arquivos e contar downloads. Permite upload de arquivos e rastreamento de quantas vezes cada arquivo foi baixado.

## Funcionalidades
- Upload de arquivos via interface web
- Contagem automática de downloads por arquivo
- Estatísticas detalhadas (total de arquivos, downloads, tamanho)
- Interface responsiva e intuitiva
- Armazenamento persistente de estatísticas
- Download direto dos arquivos

## Tecnologias Utilizadas
- PHP 7.4+
- HTML5
- CSS3 (Grid Layout)
- JSON para armazenamento de dados
- Sistema de arquivos

## Estrutura do Projeto
```
ContadorDownloads/
├── index.php              # Arquivo principal da aplicação
├── uploads/               # Diretório para arquivos (criado automaticamente)
├── download_stats.json    # Arquivo de estatísticas (criado automaticamente)
└── README.md              # Documentação do projeto
```

## Como Usar
1. Coloque os arquivos em um servidor web com PHP
2. Acesse o arquivo `index.php` no navegador
3. Use o formulário para enviar arquivos
4. Clique em "Download" para baixar arquivos e incrementar contador
5. Visualize estatísticas na parte inferior da página

## Instalação
1. Certifique-se de ter PHP instalado (versão 7.4 ou superior)
2. Copie os arquivos para o diretório do seu servidor web
3. Certifique-se de que o diretório tem permissões de escrita
4. Acesse via navegador: `http://localhost/ContadorDownloads/`

## Funcionalidades Detalhadas

### Upload de Arquivos
- Interface drag-and-drop para seleção de arquivos
- Validação de arquivos enviados
- Prevenção de duplicatas
- Armazenamento seguro em diretório específico

### Contagem de Downloads
- Incremento automático do contador
- Rastreamento por arquivo individual
- Persistência de dados em JSON
- Histórico de uploads com data/hora

### Estatísticas
- Total de arquivos armazenados
- Total de downloads realizados
- Tamanho total dos arquivos
- Interface visual com cards organizados

## Armazenamento de Dados
- **Arquivos**: Armazenados no diretório `uploads/`
- **Estatísticas**: Salvas em `download_stats.json`
- **Estrutura JSON**:
```json
{
  "arquivo.pdf": {
    "downloads": 15,
    "size": 1024000,
    "upload_date": "2024-01-15 10:30:00"
  }
}
```

## Segurança
- Validação de tipos de arquivo
- Sanitização de nomes de arquivo
- Controle de acesso ao diretório de uploads
- Prevenção de upload de arquivos maliciosos

## Melhorias Possíveis
- Sistema de autenticação
- Categorização de arquivos
- Limite de tamanho de arquivo
- Sistema de busca
- Relatórios detalhados
- Backup automático de estatísticas

## Requisitos do Sistema
- Servidor web (Apache, Nginx, etc.)
- PHP 7.4 ou superior
- Permissões de escrita no diretório
- Navegador web moderno

## Limitações
- Não há limite de tamanho de arquivo configurado
- Estatísticas são armazenadas localmente
- Não há sistema de backup automático

## Licença
Este projeto é de uso livre para fins educacionais. 