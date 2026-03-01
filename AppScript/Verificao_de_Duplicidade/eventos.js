/**
 * Eventos e Inicialização do Sistema de Verificação de Duplicidade
 * 
 * Este arquivo contém todas as funções relacionadas a eventos e inicialização
 */

// ================================
// FUNÇÕES DE INICIALIZAÇÃO
// ================================

/**
 * Função executada quando a planilha é aberta
 * Cria o menu personalizado na interface
 * @returns {void}
 */
function onOpen() {
  try {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu(CONFIG.MENU_TITLE)
      .addItem(CONFIG.MENU_ITEM, CONFIG.MENU_FUNCTION)
      .addToUi();
  } catch (error) {
    console.error("Erro ao criar menu:", error);
    SpreadsheetApp.getUi().alert(
      "Erro",
      CONFIG.MENSAGENS.ERRO_INICIALIZACAO,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

// ================================
// FUNÇÕES DE EVENTO
// ================================

/**
 * Função executada quando uma célula é editada
 * Verifica automaticamente se o valor editado é duplicado
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e - Evento de edição
 * @returns {void}
 */
function onEdit(e) {
  try {
    // Validar evento
    if (!e || !e.range) {
      return;
    }
    
    const sheet = e.range.getSheet();
    if (!sheet) {
      return;
    }
    
    const editedCol = e.range.getColumn();
    const editedRow = e.range.getRow();
    
    // Verificar se a edição é na coluna D a partir da linha inicial
    if (editedCol !== CONFIG.COLUNA_VALOR || editedRow < CONFIG.LINHA_INICIAL) {
      return;
    }
    
    const valorEditado = e.range.getValue();
    
    // Ignorar se o valor estiver vazio
    if (!valorEditado) {
      // Limpar marcação se o valor foi removido
      limparMarcacaoCelula(sheet, editedRow);
      return;
    }
    
    // Verificar duplicados em tempo real
    verificarDuplicadoEmTempoReal(sheet, editedRow, valorEditado);
    
  } catch (error) {
    console.error("Erro no evento onEdit:", error);
    // Não exibir erro ao usuário para não interromper o trabalho
  }
}

/**
 * Verifica se um valor editado é duplicado em tempo real
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Planilha
 * @param {number} linhaEditada - Linha que foi editada (1-based)
 * @param {*} valorEditado - Valor que foi editado
 * @returns {void}
 */
function verificarDuplicadoEmTempoReal(sheet, linhaEditada, valorEditado) {
  try {
    const valorNorm = normalizarTexto(valorEditado);
    
    if (!valorNorm) {
      return;
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow < CONFIG.LINHA_INICIAL) {
      return;
    }
    
    // Obter valores das colunas
    const { valores, responsaveis } = obterValoresColunas(sheet, CONFIG.LINHA_INICIAL);
    
    // Verificar duplicados
    for (let i = 0; i < valores.length; i++) {
      const linhaVerificada = CONFIG.LINHA_INICIAL + i;
      
      // Pular a linha que foi editada
      if (linhaVerificada === linhaEditada) {
        continue;
      }
      
      const valorNormVerificado = normalizarTexto(valores[i]);
      
      // Se encontrar duplicado
      if (valorNormVerificado === valorNorm) {
        const responsavel = responsaveis[i] || CONFIG.MENSAGENS.RESPONSAVEL_NAO_INFORMADO;
        
        // Marcar visualmente
        marcarCelulaDuplicada(
          sheet,
          linhaEditada,
          linhaVerificada,
          CONFIG.CORES.DUPLICADO_EDIT
        );
        
        // Exibir alerta
        const mensagem = `O valor digitado na linha ${linhaEditada} já existe na linha ${linhaVerificada}.\n` +
          `Responsável original: ${responsavel}.\n\n` +
          `O valor foi mantido, mas marcado visualmente.`;
        
        SpreadsheetApp.getUi().alert(
          CONFIG.MENSAGENS.TITULO_DUPLICADO_EDIT,
          mensagem,
          SpreadsheetApp.getUi().ButtonSet.OK
        );
        
        break;
      }
    }
  } catch (error) {
    console.error("Erro ao verificar duplicado em tempo real:", error);
  }
}

