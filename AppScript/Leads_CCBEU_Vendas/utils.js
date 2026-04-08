/**
 * Funções Utilitárias do Sistema de Distribuição de Leads
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
 * Obtém a planilha ativa de forma segura
 * @returns {GoogleAppsScript.Spreadsheet.Spreadsheet} Planilha ativa
 * @throws {Error} Se não houver planilha ativa
 */
function obterPlanilhaAtiva() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("Nenhuma planilha ativa encontrada.");
  }
  return ss;
}

/**
 * Obtém uma aba por nome de forma segura
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss - Planilha
 * @param {string} nomeAba - Nome da aba
 * @returns {GoogleAppsScript.Spreadsheet.Sheet|null} Aba encontrada ou null
 */
function obterAba(ss, nomeAba) {
  try {
    return ss.getSheetByName(nomeAba);
  } catch (error) {
    console.warn("Erro ao obter aba '" + nomeAba + "':", error);
    return null;
  }
}

/**
 * Valida se uma string não está vazia
 * @param {string} valor - Valor a validar
 * @param {string} nomeCampo - Nome do campo para mensagem de erro
 * @throws {Error} Se o valor for inválido
 */
function validarCampoObrigatorio(valor, nomeCampo) {
  if (!valor || typeof valor !== 'string' || valor.trim() === '') {
    throw new Error(nomeCampo + " é obrigatório e não pode estar vazio.");
  }
}

/**
 * Valida formato de e-mail
 * @param {string} email - E-mail a validar
 * @throws {Error} Se o e-mail for inválido
 */
function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("E-mail inválido: " + email);
  }
}

/**
 * Atualiza valores em lote de forma eficiente
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Aba
 * @param {number} coluna - Coluna a atualizar (1-based)
 * @param {Object} mapaAtualizacoes - Mapa linha -> valor
 * @param {number} primeiraLinha - Primeira linha de dados (sem cabeçalho)
 */
function atualizarColunaEmLote(sheet, coluna, mapaAtualizacoes, primeiraLinha) {
  if (Object.keys(mapaAtualizacoes).length === 0) return;
  
  const ultimaLinha = sheet.getLastRow();
  if (ultimaLinha < primeiraLinha) return;
  
  const numLinhas = ultimaLinha - primeiraLinha + 1;
  const dadosAtuais = sheet.getRange(primeiraLinha, 1, numLinhas, sheet.getLastColumn()).getValues();
  
  // Preparar valores atualizados
  const valoresColuna = dadosAtuais.map((linha, idx) => {
    const linhaReal = idx + primeiraLinha;
    return mapaAtualizacoes[linhaReal] !== undefined 
      ? mapaAtualizacoes[linhaReal] 
      : linha[coluna - 1];
  });
  
  // Atualizar em uma única operação
  sheet.getRange(primeiraLinha, coluna, valoresColuna.length, 1)
    .setValues(valoresColuna.map(v => [v]));
}

/**
 * Processa operações em lotes para evitar timeout
 * @param {Array} itens - Array de itens a processar
 * @param {Function} processador - Função que processa cada item
 * @param {number} tamanhoLote - Tamanho do lote
 * @returns {Array} Resultados do processamento
 */
function processarEmLotes(itens, processador, tamanhoLote) {
  tamanhoLote = tamanhoLote || CONFIG.BATCH_SIZE;
  const resultados = [];
  
  for (let i = 0; i < itens.length; i += tamanhoLote) {
    const lote = itens.slice(i, i + tamanhoLote);
    const resultadosLote = lote.map(processador);
    resultados.push(...resultadosLote);
    
    // Pequena pausa para evitar timeout
    if (i + tamanhoLote < itens.length) {
      Utilities.sleep(100);
    }
  }
  
  return resultados;
}

