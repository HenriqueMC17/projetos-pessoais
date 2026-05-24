/**
 * Formatação e Marcação Visual do Sistema de Verificação de Duplicidade
 * 
 * Este arquivo contém todas as funções relacionadas à formatação e marcação visual
 */

// ================================
// FUNÇÕES DE FORMATAÇÃO
// ================================

/**
 * Marca uma célula como duplicada visualmente
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Planilha
 * @param {number} linha - Linha da célula (1-based)
 * @param {number} linhaOriginal - Linha do valor original
 * @param {string} cor - Cor de fundo para marcação
 * @returns {void}
 */
function marcarCelulaDuplicada(sheet, linha, linhaOriginal, cor) {
  try {
    const cell = sheet.getRange(linha, CONFIG.COLUNA_VALOR);
    const nota = CONFIG.MENSAGENS.NOTA_DUPLICADO.replace("{linha}", linhaOriginal);
    
    cell.setNote(nota);
  } catch (error) {
    console.warn(`Erro ao marcar célula duplicada na linha ${linha}:`, error);
  }
}

/**
 * Limpa as marcações de duplicados anteriores
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Planilha
 * @param {number} linhaInicial - Linha inicial (1-based)
 * @returns {void}
 */
function limparMarcacoesDuplicados(sheet, linhaInicial) {
  try {
    const lastRow = sheet.getLastRow();
    if (lastRow < linhaInicial) return;
    
    const numLinhas = lastRow - linhaInicial + 1;
    const range = sheet.getRange(linhaInicial, CONFIG.COLUNA_VALOR, numLinhas, 1);
    
    // Obter as notas atuais
    const currentNotes = range.getNotes();
    const updatedNotes = currentNotes.map(row => {
      const note = row[0];
      // Se a nota contiver o texto padrão de duplicado, nós a limpamos (preservando notas manuais do usuário)
      if (note && note.indexOf("Duplicado de linha") !== -1) {
        return [""];
      }
      return [note];
    });
    
    // Escrever notas de volta
    range.setNotes(updatedNotes);
  } catch (error) {
    console.warn("Erro ao limpar marcações:", error);
  }
}

/**
 * Limpa a marcação de uma célula específica
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Planilha
 * @param {number} linha - Linha da célula (1-based)
 * @returns {void}
 */
function limparMarcacaoCelula(sheet, linha) {
  try {
    const cell = sheet.getRange(linha, CONFIG.COLUNA_VALOR);
    const note = cell.getNote();
    if (note && note.indexOf("Duplicado de linha") !== -1) {
      cell.clearNote();
    }
  } catch (error) {
    console.warn(`Erro ao limpar marcação da célula na linha ${linha}:`, error);
  }
}

