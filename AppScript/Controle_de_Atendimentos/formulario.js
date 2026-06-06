/**
 * Gerenciamento de Formulário do Sistema de Controle de Atendimentos
 * 
 * Este arquivo contém todas as funções relacionadas ao formulário
 */

// ================================
// FUNÇÕES DO FORMULÁRIO
// ================================

/**
 * Prepara a aba Form para novo atendimento
 * Limpa os campos do formulário
 * @returns {void}
 */
function novoAtendimento() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error("Nenhuma planilha ativa encontrada");
    }
    
    const form = obterAba(ss, CONFIG.SHEETS.FORM);
    limparFormulario(form);
    SpreadsheetApp.flush();
    
    SpreadsheetApp.getUi().alert(
      "Formulário",
      CONFIG.MENSAGENS.FORM_PRONTO,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    
  } catch (error) {
    ErrorHandler.handle(error, "Erro ao preparar formulário");
  }
}

/**
 * Limpa o formulário
 * @param {GoogleAppsScript.Spreadsheet.Sheet} form - Aba do formulário
 * @returns {void}
 */
function limparFormulario(form) {
  try {
    const range = form.getRange(
      CONFIG.FORM.LINHA_DADOS,
      CONFIG.FORM.COLUNA_INICIAL,
      1,
      CONFIG.FORM.COLUNA_FINAL
    );
    range.clearContent();
  } catch (error) {
    console.warn("Erro ao limpar formulário:", error);
  }
}

/**
 * Obtém os dados do formulário
 * @param {GoogleAppsScript.Spreadsheet.Sheet} form - Aba do formulário
 * @returns {Object} Objeto com dados básicos e valores do formulário
 */
function obterDadosFormulario(form) {
  // Obter todos os valores da linha em uma única chamada de API
  const todosValores = form.getRange(
    CONFIG.FORM.LINHA_DADOS,
    CONFIG.FORM.COLUNA_INICIAL,
    1,
    CONFIG.FORM.COLUNA_FINAL
  ).getValues()[0];
  
  // Dividir os dados básicos (colunas A a C) e os valores do formulário (colunas D a M)
  const dadosBasicos = todosValores.slice(0, 3);
  const valoresForm = todosValores.slice(3);
  
  return {
    dadosBasicos,
    valoresForm
  };
}

