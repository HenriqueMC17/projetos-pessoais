/**
 * Geração de Tabelas do Sistema de Controle de Receptivas
 * 
 * Este arquivo contém todas as funções relacionadas à geração de tabelas
 */

// ================================
// FUNÇÕES DE GERAÇÃO DE TABELAS
// ================================

/**
 * Gera as tabelas de controle para o mês e ano especificados
 * @param {number} mes - Número do mês (1-12)
 * @param {number} ano - Ano
 * @param {Array<string>} vendedorasSelecionadas - Vendedoras selecionadas
 * @throws {Error} Se houver erro na geração das tabelas
 * @returns {void}
 */
function gerarTabelasPorMesAno(mes, ano, vendedorasSelecionadas) {
  if (!mes || !ano) {
    throw new Error("Mês e ano são obrigatórios");
  }
  
  if (!vendedorasSelecionadas || vendedorasSelecionadas.length === 0) {
    throw new Error("Nenhuma vendedora selecionada");
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("Nenhuma planilha ativa encontrada");
  }
  
  const aba = obterOuCriarAba(ss, CONFIG.SHEET_NAME);
  
  try {
    // Preparar dados
    const feriados = obterFeriados(ano);
    const diasUteis = calcularDiasUteis(mes, ano, feriados);
    
    if (diasUteis.length === 0) {
      throw new Error("Não há dias úteis no período especificado");
    }
    
    // Configurar aba
    configurarAba(aba, mes, ano);
    
    // Gerar tabelas
    gerarTabelasDiasUteis(aba, diasUteis, mes, ano, vendedorasSelecionadas);
    
    // Adicionar botão de ação
    adicionarBotaoAcao(aba);
    
    console.log(`Tabelas geradas com sucesso: ${diasUteis.length} dias úteis`);
    
  } catch (error) {
    console.error("Erro ao gerar tabelas:", error);
    throw error;
  }
}

/**
 * Gera as tabelas em lotes de até 5 tabelas por vez
 * @param {number} mes - Número do mês (1-12)
 * @param {number} ano - Ano
 * @param {Array<string>} vendedorasSelecionadas - Vendedoras selecionadas
 * @returns {void}
 */
function gerarTabelasPorMesAnoEmLotes(mes, ano, vendedorasSelecionadas) {
  if (!mes || !ano) {
    throw new Error("Mês e ano são obrigatórios");
  }
  
  if (!vendedorasSelecionadas || vendedorasSelecionadas.length === 0) {
    throw new Error("Nenhuma vendedora selecionada");
  }
  
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("Nenhuma planilha ativa encontrada");
  }
  
  const aba = obterOuCriarAba(ss, CONFIG.SHEET_NAME);
  
  try {
    // Preparar dados
    const feriados = obterFeriados(ano);
    const diasUteis = calcularDiasUteis(mes, ano, feriados);
    
    if (diasUteis.length === 0) {
      throw new Error("Não há dias úteis no período especificado");
    }
    
    // Configurar aba apenas na primeira vez
    configurarAba(aba, mes, ano);
    
    // Processar em lotes de até 5 tabelas
    const maxTabelasPorLote = CONFIG.MAX_TABELAS_POR_LOTE || 5;
    let linhaAtual = CONFIG.START_ROW;
    let colunaAtual = 1;
    let tabelasGeradas = 0;
    let loteAtual = [];
    
    for (let i = 0; i < diasUteis.length; i++) {
      loteAtual.push(diasUteis[i]);
      
      // Quando atingir o limite do lote ou for o último dia
      if (loteAtual.length >= maxTabelasPorLote || i === diasUteis.length - 1) {
        // Gerar lote de tabelas
        const posicaoInicial = gerarLoteTabelas(aba, loteAtual, linhaAtual, colunaAtual, vendedorasSelecionadas);
        
        tabelasGeradas += loteAtual.length;
        
        // Atualizar posição para próximo lote
        linhaAtual = posicaoInicial.linha;
        colunaAtual = posicaoInicial.coluna;
        
        // Feedback ao usuário
        const mensagemLote = MENSAGENS.SUCESSO_LOTE.replace("{quantidade}", loteAtual.length.toString());
        ui.alert("Lote Gerado", mensagemLote + `\n\nTotal: ${tabelasGeradas} de ${diasUteis.length} tabelas`, ui.ButtonSet.OK);
        
        // Perguntar se deseja continuar (exceto se for o último lote)
        if (i < diasUteis.length - 1) {
          if (typeof perguntarContinuar === 'function') {
            const continuar = perguntarContinuar(ui);
            if (!continuar) {
              console.log(`Geração interrompida pelo usuário. ${tabelasGeradas} tabelas geradas.`);
              break;
            }
          }
        }
        
        // Limpar lote atual
        loteAtual = [];
      }
    }
    
    // Adicionar botão de ação
    adicionarBotaoAcao(aba);
    
    console.log(`Geração concluída: ${tabelasGeradas} tabelas geradas de ${diasUteis.length} dias úteis`);
    
  } catch (error) {
    console.error("Erro ao gerar tabelas em lotes:", error);
    throw error;
  }
}

/**
 * Gera as tabelas para todos os dias úteis
 * @param {GoogleAppsScript.Spreadsheet.Sheet} aba - Aba de destino
 * @param {Array<Object>} diasUteis - Array com dias úteis
 * @param {number} mes - Número do mês
 * @param {number} ano - Ano
 * @param {Array<string>} vendedorasSelecionadas - Vendedoras selecionadas
 * @returns {void}
 */
function gerarTabelasDiasUteis(aba, diasUteis, mes, ano, vendedorasSelecionadas) {
  if (!aba || !diasUteis || diasUteis.length === 0) {
    throw new Error("Parâmetros inválidos para gerar tabelas");
  }
  
  if (!vendedorasSelecionadas || vendedorasSelecionadas.length === 0) {
    throw new Error("Nenhuma vendedora selecionada");
  }
  
  let linha = CONFIG.START_ROW;
  let coluna = 1;
  let colunasPorLinha = 0;
  const alturaTabela = vendedorasSelecionadas.length + 2; // Cabeçalho + linhas de vendedoras
  
  for (const diaUtil of diasUteis) {
    try {
      // Criar tabela para o dia
      criarTabelaDia(aba, diaUtil, linha, coluna, vendedorasSelecionadas);
      
      // Atualizar posição para próxima tabela
      colunasPorLinha++;
      if (colunasPorLinha === CONFIG.COLUMNS_PER_ROW) {
        colunasPorLinha = 0;
        linha += alturaTabela + 1; // +1 para espaçamento entre linhas
        coluna = 1;
      } else {
        coluna += CONFIG.COLUMN_SPACING;
      }
    } catch (error) {
      console.error(`Erro ao criar tabela para ${diaUtil.dataFormatada}:`, error);
      // Continuar com próximo dia
    }
  }
}

/**
 * Gera um lote de tabelas (até 5 tabelas)
 * @param {GoogleAppsScript.Spreadsheet.Sheet} aba - Aba de destino
 * @param {Array<Object>} loteDiasUteis - Array com dias úteis do lote
 * @param {number} linhaInicial - Linha inicial
 * @param {number} colunaInicial - Coluna inicial
 * @param {Array<string>} vendedorasSelecionadas - Vendedoras selecionadas
 * @returns {Object} Objeto com linha e coluna finais
 */
function gerarLoteTabelas(aba, loteDiasUteis, linhaInicial, colunaInicial, vendedorasSelecionadas) {
  if (!aba || !loteDiasUteis || loteDiasUteis.length === 0) {
    throw new Error("Parâmetros inválidos para gerar lote");
  }
  
  if (!vendedorasSelecionadas || vendedorasSelecionadas.length === 0) {
    throw new Error("Nenhuma vendedora selecionada");
  }
  
  let linha = linhaInicial;
  let coluna = colunaInicial;
  let colunasPorLinha = 0;
  const alturaTabela = vendedorasSelecionadas.length + 2; // Cabeçalho + linhas de vendedoras
  
  for (const diaUtil of loteDiasUteis) {
    try {
      // Criar tabela para o dia
      criarTabelaDia(aba, diaUtil, linha, coluna, vendedorasSelecionadas);
      
      // Atualizar posição para próxima tabela
      colunasPorLinha++;
      if (colunasPorLinha === CONFIG.COLUMNS_PER_ROW) {
        colunasPorLinha = 0;
        linha += alturaTabela + 1; // +1 para espaçamento entre linhas
        coluna = 1;
      } else {
        coluna += CONFIG.COLUMN_SPACING;
      }
    } catch (error) {
      console.error(`Erro ao criar tabela para ${diaUtil.dataFormatada}:`, error);
      // Continuar com próximo dia
    }
  }
  
  return {
    linha: linha,
    coluna: coluna
  };
}

/**
 * Cria uma tabela para um dia específico
 * @param {GoogleAppsScript.Spreadsheet.Sheet} aba - Aba de destino
 * @param {Object} diaUtil - Informações do dia útil
 * @param {number} linha - Linha inicial
 * @param {number} coluna - Coluna inicial
 * @param {Array<string>} vendedorasSelecionadas - Vendedoras selecionadas
 * @returns {void}
 */
function criarTabelaDia(aba, diaUtil, linha, coluna, vendedorasSelecionadas) {
  if (!aba || !diaUtil || !linha || !coluna) {
    throw new Error("Parâmetros inválidos para criar tabela");
  }
  
  if (!vendedorasSelecionadas || vendedorasSelecionadas.length === 0) {
    throw new Error("Nenhuma vendedora selecionada");
  }
  
  const numVendedoras = vendedorasSelecionadas.length;
  const alturaTabela = numVendedoras + 2; // Cabeçalho + linhas de vendedoras
  
  try {
    // Cabeçalho da data
    const rangeData = aba.getRange(linha, coluna, 1, CONFIG.TABLE_COLUMNS);
    rangeData
      .merge()
      .setValue(diaUtil.dataFormatada)
      .setBackground(CONFIG.COLORS.HEADER)
      .setFontWeight("bold")
      .setFontSize(CONFIG.FONT_SIZES.HEADER)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
    
    // Subcabeçalhos
    const rangeCabecalhos = aba.getRange(linha + 1, coluna, 1, CONFIG.TABLE_COLUMNS);
    rangeCabecalhos
      .setValues([CABECALHOS])
      .setFontWeight("bold")
      .setFontSize(CONFIG.FONT_SIZES.NORMAL)
      .setBackground(CONFIG.COLORS.HEADER)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
    
    // Linhas das vendedoras selecionadas
    const linhasVendedoras = vendedorasSelecionadas.map(vendedora => [vendedora, "", ""]);
    const rangeVendedoras = aba.getRange(
      linha + 2,
      coluna,
      linhasVendedoras.length,
      CONFIG.TABLE_COLUMNS
    );
    rangeVendedoras
      .setValues(linhasVendedoras)
      .setFontSize(CONFIG.FONT_SIZES.NORMAL)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
    
    // Aplicar bordas em toda a tabela
    const rangeTabela = aba.getRange(
      linha,
      coluna,
      alturaTabela,
      CONFIG.TABLE_COLUMNS
    );
    rangeTabela.setBorder(
      true,  // top
      true,  // left
      true,  // bottom
      true,  // right
      true,  // vertical
      true,  // horizontal
      CONFIG.COLORS.BORDER,
      SpreadsheetApp.BorderStyle.SOLID
    );
    
  } catch (error) {
    console.error(`Erro ao criar tabela na linha ${linha}, coluna ${coluna}:`, error);
    throw error;
  }
}

