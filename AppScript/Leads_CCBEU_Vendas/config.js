/**
 * Configurações e Constantes do Sistema de Distribuição de Leads
 * 
 * Este arquivo contém todas as constantes e configurações do sistema
 */

// ================================
// CONSTANTES E CONFIGURAÇÕES
// ================================

const CONFIG = Object.freeze({
  SHEET_BASE_GERAL: "Base_Geral",
  COLUNA_RESPONSAVEL: 5, // Coluna E (índice 4, mas vamos usar 1-based para clareza)
  COLUNA_ID: 1, // Coluna A
  COLUNA_STATUS: 6, // Coluna F
  COLUNA_PRIMEIRO_CONTATO: 7, // Coluna G
  MENU_TITLE: "📊 Leads",
  MENU_ITEM: "📌 Distribuir Leads",
  MENU_PERMISSOES: "🔐 Gerenciar Permissões",
  MENU_AUDITORIA: "🕵️ Auditoria dos Leads",
  MENU_VENDEDORES_TITLE: "👤 Vendedores",
  MENU_CADASTRO_VENDEDOR: "➕ Cadastrar Novo Vendedor",
  MENU_RENOMEAR_VENDEDOR: "✏️ Renomear Vendedor",
  MENU_REMOVER_VENDEDOR: "❌ Remover Vendedor",
  MENU_REATRIBUIR_VENDEDOR: "🔄 Reatribuir Leads (Vendedor Inativo)",
  DIALOG_TITLE: "Distribuir Leads",
  HTML_FILE: "distribuicao_leads",
  DIALOG_WIDTH: 500,
  DIALOG_HEIGHT: 600,
  MAX_LEADS_POR_OPERACAO: 10000, // Limite de segurança
  BATCH_SIZE: 500 // Tamanho do lote para operações em batch
});

/**
 * E-mails oficiais dos usuários do sistema
 */
const EMAILS = Object.freeze({
  jose: "jose.fares@ccbeu.org",
  francine: "francine.santos@ccbeu.org",
  thayna: "thayna.santos@ccbeu.org",
  natalia: "natalia.camargo@ccbeu.org",
  gestora: "gerente.comercial@ccbeu.org",
  voce: "henrique.cardoso@ccbeu.org"
});

/**
 * Mapeamento de vendedores para suas respectivas abas
 * 
 * @deprecated Este objeto está sendo substituído por listagem dinâmica
 * A função obterVendedoresDisponiveis() agora busca vendedores diretamente das abas
 * Mantido apenas para compatibilidade com código legado
 * 
 * NOTA: Novos vendedores são automaticamente detectados ao cadastrar uma nova aba
 */
const VENDEDORES = {
  "Jose": "Base_Jose",
  "Francine": "Base_Francine",
  "Thayna": "Base_Thayna",
  "Natalia": "Base_Natalia"
};

