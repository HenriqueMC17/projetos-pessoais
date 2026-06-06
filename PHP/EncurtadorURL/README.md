# Encurtador de URLs

## Descrição
Sistema web em PHP para encurtar URLs longas. Permite criar links curtos e rastrear cliques, com interface amigável e estatísticas detalhadas.

## Funcionalidades
- Encurtamento de URLs com códigos únicos de 6 caracteres
- Redirecionamento automático para URLs originais
- Contagem de cliques por URL
- Interface responsiva e intuitiva
- Botão para copiar URLs encurtadas
- Estatísticas gerais do sistema
- Histórico de URLs criadas

## Tecnologias Utilizadas
- PHP 7.4+
- HTML5
- CSS3 (Grid Layout)
- JavaScript (Clipboard API)
- JSON para armazenamento de dados

## Estrutura do Projeto
```
EncurtadorURL/
├── index.php          # Arquivo principal da aplicação
├── urls.json          # Arquivo de armazenamento (criado automaticamente)
└── README.md          # Documentação do projeto
```

## Como Usar
1. Coloque os arquivos em um servidor web com PHP
2. Acesse o arquivo `index.php` no navegador
3. Cole a URL longa no campo de entrada
4. Clique em "Encurtar URL" para gerar o link curto
5. Use o botão "Copiar" para copiar a URL encurtada
6. Acesse a URL encurtada para ser redirecionado

## Instalação
1. Certifique-se de ter PHP instalado (versão 7.4 ou superior)
2. Copie os arquivos para o diretório do seu servidor web
3. Certifique-se de que o diretório tem permissões de escrita
4. Acesse via navegador: `http://localhost/EncurtadorURL/`

## Funcionalidades Detalhadas

### Encurtamento de URLs
- Validação de URLs usando `filter_var()`
- Geração de códigos únicos de 6 caracteres
- Prevenção de códigos duplicados
- Armazenamento persistente em JSON

### Redirecionamento
- Sistema de redirecionamento automático
- Incremento automático do contador de cliques
- Tratamento de URLs inexistentes
- Log de data/hora de criação

### Interface
- Design responsivo com CSS Grid
- Lista organizada de URLs encurtadas
- Estatísticas em tempo real
- Botões de ação para cada URL

## Armazenamento de Dados
- **Estrutura JSON**:
```json
{
  "abc123": {
    "url_original": "https://exemplo.com/url-muito-longa",
    "data_criacao": "2024-01-15 10:30:00",
    "cliques": 15
  }
}
```

## Recursos Especiais
- 🔗 Geração de códigos únicos
- 📊 Contagem de cliques em tempo real
- 📋 Botão de copiar para área de transferência
- 🎯 Redirecionamento automático
- 📈 Estatísticas detalhadas

## Segurança
- Validação de URLs de entrada
- Sanitização de dados
- Prevenção de XSS
- Controle de acesso básico

## Melhorias Possíveis
- Sistema de autenticação
- URLs personalizadas
- Expiração de links
- Relatórios detalhados
- API REST
- Integração com redes sociais

## Limitações
- URLs encurtadas dependem do domínio atual
- Não há sistema de backup automático
- Limite de 6 caracteres para códigos
- Sem sistema de categorização

## Requisitos do Sistema
- Servidor web (Apache, Nginx, etc.)
- PHP 7.4 ou superior
- Permissões de escrita no diretório
- Navegador web moderno com suporte a Clipboard API

## Licença
Este projeto é de uso livre para fins educacionais. 