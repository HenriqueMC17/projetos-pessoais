/**
 * Lógica de Verificação de Duplicados
 * 
 * Este arquivo contém todas as funções relacionadas à verificação de duplicados
 */

// ================================
// FUNÇÕES DE VERIFICAÇÃO
// ================================

/**
 * Verifica valores duplicados na coluna D a partir da linha inicial
 * Marca visualmente as células duplicadas e exibe relatório
 * @returns {void}
 */
function verificarDuplicadosManual() {
  const ui = SpreadsheetApp.getUi();
  
  try {
    const sheet = obterPlanilhaAtiva();
    const linhaInicial = CONFIG.LINHA_INICIAL;
    
    // Obter valores das colunas
    const { valores, responsaveis } = obterValoresColunas(sheet, linhaInicial);
    
    if (valores.length === 0) {
      ui.alert(
        "Informação",
        CONFIG.MENSAGENS.SEM_DADOS,
        ui.ButtonSet.OK
      );
      return;
    }
    
    // Limpar marcações anteriores (opcional - pode ser comentado se quiser manter)
    limparMarcacoesDuplicados(sheet, linhaInicial);
    
    // Verificar duplicados
    const resultado = processarDuplicados(sheet, valores, responsaveis, linhaInicial);
    
    // Exibir resultado
    exibirResultadoVerificacao(ui, resultado);
    
    console.log(`Verificação concluída: ${resultado.duplicados.length} duplicados encontrados`);
    
  } catch (error) {
    ErrorHandler.handle(error, CONFIG.MENSAGENS.ERRO_VERIFICACAO);
  }
}

/**
 * Processa os valores e identifica duplicados
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Planilha
 * @param {Array} valores - Array de valores da coluna D
 * @param {Array} responsaveis - Array de responsáveis da coluna C
 * @param {number} linhaInicial - Linha inicial (1-based)
 * @returns {Object} Objeto com array de duplicados e estatísticas
 */
function processarDuplicados(sheet, valores, responsaveis, linhaInicial) {
  const valoresMap = new Map();
  const duplicados = [];
  let totalProcessados = 0;
  let totalVazios = 0;
  
  for (let i = 0; i < valores.length; i++) {
    const linhaAtual = linhaInicial + i;
    const valor = valores[i];
    const valorNorm = normalizarTexto(valor);
    const responsavel = responsaveis[i] || CONFIG.MENSAGENS.RESPONSAVEL_NAO_INFORMADO;
    
    // Pular valores vazios
    if (!valorNorm) {
      totalVazios++;
      continue;
    }
    
    totalProcessados++;
    
    // Verificar se já existe duplicado
    if (valoresMap.has(valorNorm)) {
      const { linha: linhaOriginal, responsavel: respOriginal } = valoresMap.get(valorNorm);
      
      // Adicionar à lista de duplicados
      duplicados.push({
        linha: linhaAtual,
        valor: valor,
        linhaOriginal: linhaOriginal,
        responsavelOriginal: respOriginal,
        responsavel: responsavel
      });
      
      // Marcar célula como duplicada
      marcarCelulaDuplicada(
        sheet,
        linhaAtual,
        linhaOriginal,
        CONFIG.CORES.DUPLICADO_MANUAL
      );
    } else {
      // Primeira ocorrência - adicionar ao mapa
      valoresMap.set(valorNorm, {
        linha: linhaAtual,
        responsavel: responsavel
      });
    }
  }
  
  return {
    duplicados,
    totalProcessados,
    totalVazios,
    totalUnicos: valoresMap.size
  };
}

/**
 * Exibe o resultado da verificação de duplicados
 * @param {GoogleAppsScript.Base.Ui} ui - Interface do usuário
 * @param {Object} resultado - Resultado do processamento
 * @returns {void}
 */
function exibirResultadoVerificacao(ui, resultado) {
  if (resultado.duplicados.length === 0) {
    ui.alert(
      CONFIG.MENSAGENS.TITULO_VERIFICACAO,
      CONFIG.MENSAGENS.SEM_DUPLICADOS + 
      `\n\nEstatísticas:\n` +
      `• Valores processados: ${resultado.totalProcessados}\n` +
      `• Valores únicos: ${resultado.totalUnicos}\n` +
      `• Valores vazios: ${resultado.totalVazios}`,
      ui.ButtonSet.OK
    );
    return;
  }
  
  // Formatar lista de duplicados
  const listaDuplicados = resultado.duplicados.map(dup => {
    return `• Linha ${dup.linha}: "${dup.valor}"\n  └─ Já existe na linha ${dup.linhaOriginal} (Responsável: ${dup.responsavelOriginal})`;
  });
  
  const mensagem = `Os seguintes valores na coluna D são duplicados:\n\n${listaDuplicados.join("\n\n")}\n\n` +
    `Estatísticas:\n` +
    `• Total de duplicados: ${resultado.duplicados.length}\n` +
    `• Valores processados: ${resultado.totalProcessados}\n` +
    `• Valores únicos: ${resultado.totalUnicos}`;
  
  ui.alert(
    CONFIG.MENSAGENS.TITULO_DUPLICADOS,
    mensagem,
    ui.ButtonSet.OK
  );
}

