/**
 * Gerenciamento de Dashboard do Sistema de Controle de Atendimentos
 * 
 * Este arquivo contém todas as funções relacionadas ao dashboard
 */

// ================================
// FUNÇÕES DO DASHBOARD
// ================================

/**
 * Atualiza indicadores no Dashboard
 * Conta status e tipos de atendimento
 * @returns {void}
 */
function contarIndicadores(silencioso) {
  silencioso = (silencioso === true);
  let ui = null;
  if (!silencioso) {
    try {
      ui = SpreadsheetApp.getUi();
    } catch (uiError) {
      console.warn("Não foi possível acessar a UI:", uiError);
      silencioso = true; // Força silêncio se a UI não puder ser instanciada (ex: gatilho simples)
    }
  }
  
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error("Nenhuma planilha ativa encontrada");
    }
    
    const dados = obterAba(ss, CONFIG.SHEETS.DADOS);
    const dashboard = obterAba(ss, CONFIG.SHEETS.DASHBOARD);
    
    const totalLinhas = dados.getLastRow();
    if (totalLinhas < CONFIG.DADOS.LINHA_CABECALHO + 1) {
      if (!silencioso && ui) {
        ui.alert(
          "Informação",
          CONFIG.MENSAGENS.SEM_DADOS,
          ui.ButtonSet.OK
        );
      }
      return;
    }
    
    // Obter registros
    const numRegistros = totalLinhas - CONFIG.DADOS.LINHA_CABECALHO;
    const registros = dados.getRange(
      CONFIG.DADOS.LINHA_CABECALHO + 1,
      1,
      numRegistros,
      CONFIG.DADOS.TOTAL_COLUNAS
    ).getValues();
    
    // Processar contadores
    const resultado = processarContadores(registros);
    
    // Atualizar dashboard
    atualizarDashboard(dashboard, resultado);
    
    console.log(`Dashboard atualizado: ${resultado.totalRegistros} registros processados`);
    
    if (!silencioso && ui) {
      ui.alert(
        "Sucesso",
        CONFIG.MENSAGENS.SUCESSO_DASHBOARD,
        ui.ButtonSet.OK
      );
    }
    
  } catch (error) {
    console.error("Erro ao atualizar dashboard:", error);
    if (!silencioso) {
      try {
        const fallbackUi = ui || SpreadsheetApp.getUi();
        fallbackUi.alert(
          "Erro",
          CONFIG.MENSAGENS.ERRO_DASHBOARD + "\n\n" + error.message,
          fallbackUi.ButtonSet.OK
        );
      } catch (e) {
        console.warn("Não foi possível alertar o erro na UI:", error);
      }
    }
  }
}

/**
 * Processa os contadores de status e tipos
 * @param {Array<Array>} registros - Array de registros
 * @returns {Object} Objeto com contadores processados
 */
function processarContadores(registros) {
  const statusCount = {
    [CONFIG.STATUS.EM_ESPERA]: 0,
    [CONFIG.STATUS.EM_ATENDIMENTO]: 0,
    [CONFIG.STATUS.FINALIZADO]: 0
  };
  const tipoCount = {};
  
  registros.forEach(registro => {
    // Índices: [data, telefone, nomeCliente, id, atendente, tipo, status, ...]
    const tipo = registro[5]; // Coluna F (índice 5)
    const status = registro[6]; // Coluna G (índice 6)
    
    // Contar status
    if (status && statusCount.hasOwnProperty(status)) {
      statusCount[status]++;
    }
    
    // Contar tipos
    if (tipo && validarCampoObrigatorio(tipo)) {
      tipoCount[tipo] = (tipoCount[tipo] || 0) + 1;
    }
  });
  
  return {
    statusCount,
    tipoCount,
    totalRegistros: registros.length
  };
}

/**
 * Atualiza o dashboard com os contadores processados
 * @param {GoogleAppsScript.Spreadsheet.Sheet} dashboard - Aba do dashboard
 * @param {Object} resultado - Resultado do processamento
 * @returns {void}
 */
function atualizarDashboard(dashboard, resultado) {
  try {
    // Atualizar contadores de status
    atualizarStatusDashboard(dashboard, resultado.statusCount);
    
    // Atualizar contadores de tipos
    atualizarTiposDashboard(dashboard, resultado.tipoCount);
    
  } catch (error) {
    console.error("Erro ao atualizar dashboard:", error);
    throw error;
  }
}

/**
 * Atualiza os contadores de status no dashboard
 * @param {GoogleAppsScript.Spreadsheet.Sheet} dashboard - Aba do dashboard
 * @param {Object} statusCount - Objeto com contadores de status
 * @returns {void}
 */
function atualizarStatusDashboard(dashboard, statusCount) {
  const statuses = [
    CONFIG.STATUS.EM_ESPERA,
    CONFIG.STATUS.EM_ATENDIMENTO,
    CONFIG.STATUS.FINALIZADO
  ];
  
  statuses.forEach((status, index) => {
    const linha = CONFIG.DASHBOARD.LINHA_INICIAL + index;
    const valor = statusCount[status] || 0;
    dashboard.getRange(linha, CONFIG.DASHBOARD.COLUNA_STATUS).setValue(valor);
  });
}

/**
 * Atualiza os contadores de tipos no dashboard
 * @param {GoogleAppsScript.Spreadsheet.Sheet} dashboard - Aba do dashboard
 * @param {Object} tipoCount - Objeto com contadores de tipos
 * @returns {void}
 */
function atualizarTiposDashboard(dashboard, tipoCount) {
  // Limpar área de tipos
  dashboard.getRange(CONFIG.DASHBOARD.RANGE_TIPOS).clearContent();
  
  // Ordenar tipos por quantidade (decrescente)
  const tiposOrdenados = Object.entries(tipoCount)
    .sort((a, b) => b[1] - a[1]);
  
  // Atualizar contadores de tipos
  tiposOrdenados.forEach(([tipo, quantidade], index) => {
    const linha = CONFIG.DASHBOARD.LINHA_INICIAL + index;
    dashboard.getRange(linha, CONFIG.DASHBOARD.COLUNA_TIPO).setValue(tipo);
    dashboard.getRange(linha, CONFIG.DASHBOARD.COLUNA_QUANTIDADE).setValue(quantidade);
  });
}

