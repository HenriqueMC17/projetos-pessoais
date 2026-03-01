/**
 * Funções Utilitárias do Sistema de Controle de Receptivas
 * 
 * Este arquivo contém funções auxiliares reutilizáveis
 */

// ================================
// FUNÇÕES UTILITÁRIAS
// ================================

/**
 * Obtém ou cria a aba de controle
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss - Planilha ativa
 * @param {string} nomeAba - Nome da aba
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} Aba de controle
 * @throws {Error} Se não conseguir criar ou obter a aba
 */
function obterOuCriarAba(ss, nomeAba) {
  if (!ss) {
    throw new Error("Planilha não fornecida");
  }
  
  if (!nomeAba || nomeAba.trim() === "") {
    throw new Error("Nome da aba não pode estar vazio");
  }
  
  let aba = ss.getSheetByName(nomeAba);
  if (!aba) {
    try {
      aba = ss.insertSheet(nomeAba);
      console.log(`Aba "${nomeAba}" criada com sucesso`);
    } catch (error) {
      console.error(`Erro ao criar aba "${nomeAba}":`, error);
      throw new Error(`Não foi possível criar a aba "${nomeAba}"`);
    }
  }
  
  return aba;
}

