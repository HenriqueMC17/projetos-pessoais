/**
 * Eventos do Sistema de Controle de Atendimentos
 * 
 * Este arquivo contém todas as funções relacionadas a eventos
 */

// ================================
// FUNÇÕES DE EVENTO
// ================================

/**
 * Gatilho para atualizar indicadores ao editar a aba Dados
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
    
    // Verificar se a edição foi na aba Dados
    if (sheet.getName() === CONFIG.SHEETS.DADOS) {
      contarIndicadores();
    }
    
  } catch (error) {
    console.error("Erro no evento onEdit:", error);
    // Não exibir erro ao usuário para não interromper o trabalho
  }
}

