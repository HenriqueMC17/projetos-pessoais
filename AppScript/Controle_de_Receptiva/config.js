/**
 * Configurações e Constantes do Sistema de Controle de Receptivas
 * 
 * Este arquivo contém todas as constantes e configurações do sistema
 */

// ================================
// CONSTANTES E CONFIGURAÇÕES
// ================================

/**
 * Configurações do sistema
 * @type {Object}
 */
const CONFIG = Object.freeze({
  SHEET_NAME: "CONTROLE DE RECEPTIVAS",
  MENU_TITLE: "📊 Gerar Tabelas",
  MENU_ITEM: "Gerar Tabelas",
  BUTTON_TEXT: "▶ Gerar Tabelas",
  
  // Layout da tabela
  COLUMNS_PER_ROW: 5, // 5 tabelas por linha (conforme modelo de referência)
  COLUMN_SPACING: 4,
  MAX_TABELAS_POR_LOTE: 5, // Máximo de tabelas por lote
  HEADER_HEIGHT: 30,
  TITLE_ROW: 1,
  START_ROW: 3,
  TITLE_COLUMNS: 30,
  TABLE_COLUMNS: 3,
  
  // Validações
  MIN_YEAR: 1900,
  MAX_YEAR: 2100,
  MIN_MONTH: 1,
  MAX_MONTH: 12,
  
  // API de feriados
  HOLIDAYS_API: 'https://rodriguesfas.github.io/holidays/national.json',
  API_TIMEOUT: 10000, // 10 segundos
  
  // Cores e estilos
  COLORS: {
    HEADER: "#D9CCE3",
    BUTTON: "#8E7CC3",
    BUTTON_BORDER: "#5F497A",
    TEXT_DARK: "#3c3c3c",
    TEXT_WHITE: "#FFFFFF",
    BORDER: "#CCCCCC"
  },
  
  // Dimensões do botão
  BUTTON: {
    WIDTH: 180,
    HEIGHT: 50,
    FONT_SIZE: 14,
    ROW: 1,
    OFFSET_COL: 1
  },
  
  // Formatação
  FONT_SIZES: {
    TITLE: 16,
    HEADER: 11,
    NORMAL: 10
  },
  
  // Dias da semana
  DOMINGO: 0
});

/**
 * Obtém a lista de vendedoras (padrão + customizadas salvas nas propriedades do documento)
 * @returns {Array<string>}
 */
function obterListaVendedoras() {
  const defaults = [
    "ROBSON", "NATALIA", "FRANCINE", "JOSE", 
    "KARINA", "THATIELLE", "GIOVANNA", "THAYNA"
  ];
  try {
    const props = PropertiesService.getDocumentProperties();
    const custom = props.getProperty("VENDEDORAS_CUSTOM");
    if (custom) {
      const customArray = JSON.parse(custom);
      if (Array.isArray(customArray)) {
        const combinada = [...defaults];
        customArray.forEach(v => {
          const nomeLimpo = String(v).trim().toUpperCase();
          if (nomeLimpo && !combinada.includes(nomeLimpo)) {
            combinada.push(nomeLimpo);
          }
        });
        return combinada;
      }
    }
  } catch (e) {
    console.error("Erro ao obter lista de vendedoras customizadas:", e);
  }
  return defaults;
}

/**
 * Adiciona um novo vendedor na lista persistente do documento
 * @param {string} nome - Nome do novo vendedor
 * @returns {boolean} true se adicionado com sucesso, false se já existia ou houve erro
 */
function adicionarNovoVendedor(nome) {
  if (!nome || nome.trim() === "") return false;
  const nomeLimpo = nome.trim().toUpperCase();
  
  const defaults = [
    "ROBSON", "NATALIA", "FRANCINE", "JOSE", 
    "KARINA", "THATIELLE", "GIOVANNA", "THAYNA"
  ];
  
  try {
    const props = PropertiesService.getDocumentProperties();
    let customArray = [];
    const custom = props.getProperty("VENDEDORAS_CUSTOM");
    if (custom) {
      try {
        customArray = JSON.parse(custom);
        if (!Array.isArray(customArray)) {
          customArray = [];
        }
      } catch (err) {
        customArray = [];
      }
    }
    
    // Verificar se já existe nos defaults ou nos customizados
    if (defaults.includes(nomeLimpo) || customArray.includes(nomeLimpo)) {
      return false;
    }
    
    customArray.push(nomeLimpo);
    props.setProperty("VENDEDORAS_CUSTOM", JSON.stringify(customArray));
    return true;
  } catch (e) {
    console.error("Erro ao salvar novo vendedor:", e);
    return false;
  }
}

/**
 * Lista de vendedoras do sistema
 * @type {Array<string>}
 */
let VENDEDORAS = obterListaVendedoras();

/**
 * Cabeçalhos das colunas da tabela
 * @type {Array<string>}
 */
const CABECALHOS = Object.freeze(["VENDEDORA", "QUANTIDADE", "FECHOU"]);

/**
 * Nomes dos meses em português
 * @type {Array<string>}
 */
const MESES = Object.freeze([
  "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
  "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
]);

/**
 * Mensagens do sistema
 * @type {Object}
 */
const MENSAGENS = Object.freeze({
  ERRO_INICIALIZACAO: "Erro ao inicializar o sistema. Verifique o console para mais detalhes.",
  ERRO_GERAR_TABELAS: "Ocorreu um erro ao gerar as tabelas. Verifique o console para mais detalhes.",
  SUCESSO_GERACAO: "Tabelas geradas com sucesso para {mes} de {ano}!",
  ENTRADA_INVALIDA: "Entrada inválida. Por favor, insira valores numéricos válidos.",
  MES_INVALIDO: "Mês inválido. Digite um número entre 1 e 12.",
  ANO_INVALIDO: "Ano inválido. Digite um ano válido (ex: 2025).",
  PROMPT_MES: "Digite o número do mês (1 a 12):",
  PROMPT_ANO: "Digite o ano (ex: 2025):",
  PROMPT_VENDEDORAS: "Selecione as vendedoras que deseja incluir nas tabelas.\n\nDigite os números separados por vírgula (ex: 1,2,3,4,5):",
  ERRO_FERIADOS: "Aviso: Não foi possível obter a lista de feriados. Continuando sem excluir feriados.",
  ERRO_VAZIO: "Nenhuma vendedora configurada no sistema.",
  ERRO_SELECAO_VENDEDORAS: "Nenhuma vendedora selecionada. Selecione pelo menos uma vendedora.",
  ERRO_SELECAO_INVALIDA: "Seleção inválida. Digite números separados por vírgula (ex: 1,2,3).",
  SUCESSO_LOTE: "Lote de {quantidade} tabela(s) gerado(s) com sucesso!",
  PROMPT_CONTINUAR: "Deseja gerar mais tabelas? (Sim/Não)"
});

