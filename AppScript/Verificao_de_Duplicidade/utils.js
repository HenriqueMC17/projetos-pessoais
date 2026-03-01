/**
 * Funções Utilitárias do Sistema de Verificação de Duplicidade
 * 
 * Este arquivo contém funções auxiliares reutilizáveis
 */

// ================================
// FUNÇÕES UTILITÁRIAS
// ================================

/**
 * Normaliza um texto para comparação, removendo acentos, espaços extras e convertendo para minúsculas
 * @param {*} texto - Texto a ser normalizado
 * @returns {string} Texto normalizado ou string vazia se o texto for inválido
 */
function normalizarTexto(texto) {
  if (!texto) return "";
  
  try {
    return String(texto)
      .trim()
      .replace(/\s+/g, " ")           // Remove espaços múltiplos
      .normalize("NFD")               // Normaliza para NFD (Normalization Form Decomposed)
      .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos (acentos)
      .toLowerCase();                 // Converte para minúsculas
  } catch (error) {
    console.warn("Erro ao normalizar texto:", texto, error);
    return String(texto || "").trim().toLowerCase();
  }
}

/**
 * Obtém a planilha ativa de forma segura
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} Planilha ativa
 * @throws {Error} Se não houver planilha ativa
 */
function obterPlanilhaAtiva() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error("Nenhuma planilha ativa encontrada");
    }
    
    const sheet = ss.getActiveSheet();
    if (!sheet) {
      throw new Error("Nenhuma aba ativa encontrada");
    }
    
    return sheet;
  } catch (error) {
    console.error("Erro ao obter planilha ativa:", error);
    throw error;
  }
}

/**
 * Obtém os valores das colunas especificadas a partir da linha inicial
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Planilha
 * @param {number} linhaInicial - Linha inicial (1-based)
 * @returns {Object} Objeto com arrays de valores das colunas D e C
 */
function obterValoresColunas(sheet, linhaInicial) {
  if (!sheet || !linhaInicial || linhaInicial < 1) {
    throw new Error("Parâmetros inválidos para obter valores");
  }
  
  try {
    const lastRow = sheet.getLastRow();
    
    // Verificar se há dados para processar
    if (lastRow < linhaInicial) {
      return {
        valores: [],
        responsaveis: []
      };
    }
    
    const numLinhas = lastRow - linhaInicial + 1;
    
    // Obter valores das colunas D e C
    const rangeValores = sheet.getRange(linhaInicial, CONFIG.COLUNA_VALOR, numLinhas, 1);
    const rangeResponsaveis = sheet.getRange(linhaInicial, CONFIG.COLUNA_RESPONSAVEL, numLinhas, 1);
    
    const valores = rangeValores.getValues().flat();
    const responsaveis = rangeResponsaveis.getValues().flat();
    
    return {
      valores,
      responsaveis
    };
  } catch (error) {
    console.error("Erro ao obter valores das colunas:", error);
    throw error;
  }
}

