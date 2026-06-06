/**
 * Funções Utilitárias do Sistema de Controle de Atendimentos
 * 
 * Este arquivo contém funções auxiliares reutilizáveis
 */

// ================================
// FUNÇÕES UTILITÁRIAS
// ================================

/**
 * Handle system errors consistently and optionally alert the user.
 * @type {Object}
 */
const ErrorHandler = {
  /**
   * Logs and handles errors, alerting through UI when possible.
   * @param {Error} error - The caught exception.
   * @param {string} [customMessage] - Substituted error title to display.
   */
  handle: function(error, customMessage) {
    console.error(`[System Error] ${customMessage ? customMessage + ' - ' : ''}`, error);
    try {
      const ui = SpreadsheetApp.getUi();
      ui.alert(
        "Atenção / Erro",
        (customMessage ? customMessage + "\\n\\nDetalhes: " : "") + error.message,
        ui.ButtonSet.OK
      );
    } catch (e) {
      console.warn("Unable to display UI alert for error:", error);
    }
  }
};

/**
 * Obtém uma aba por nome de forma segura
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss - Planilha
 * @param {string} nomeAba - Nome da aba
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} Aba encontrada
 * @throws {Error} Se a aba não for encontrada
 */
function obterAba(ss, nomeAba) {
  if (!ss) {
    throw new Error("Planilha não fornecida");
  }
  
  const aba = ss.getSheetByName(nomeAba);
  if (!aba) {
    throw new Error(CONFIG.MENSAGENS.ERRO_SHEET.replace("{aba}", nomeAba));
  }
  
  return aba;
}

/**
 * Valida se um valor não está vazio
 * @param {*} valor - Valor a validar
 * @returns {boolean} True se o valor não estiver vazio
 */
function validarCampoObrigatorio(valor) {
  return valor !== null && valor !== undefined && String(valor).trim() !== '';
}

/**
 * Obtém o próximo ID disponível
 * @param {GoogleAppsScript.Spreadsheet.Sheet} dados - Aba de dados
 * @returns {number} Próximo ID disponível
 */
function obterProximoId(dados) {
  try {
    const lastRow = dados.getLastRow();
    if (lastRow < CONFIG.DADOS.LINHA_CABECALHO + 1) {
      return 1;
    }
    
    const ultimoId = dados.getRange(lastRow, CONFIG.DADOS.COLUNA_ID).getValue();
    return (ultimoId || 0) + 1;
  } catch (error) {
    console.error("Erro ao obter próximo ID:", error);
    return 1; // Retorna 1 como fallback
  }
}

