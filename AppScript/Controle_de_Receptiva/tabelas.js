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
    // Preparar dados (API de feriados otimizada com cache)
    const feriados = obterFeriados(ano);
    const diasUteis = calcularDiasUteis(mes, ano, feriados);
    
    if (diasUteis.length === 0) {
      throw new Error("Não há dias úteis no período especificado");
    }
    
    // Configurar aba
    configurarAba(aba, mes, ano);
    
    // Gerar todas as tabelas em um único lote otimizado
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
 * Gera as tabelas em lotes de até 5 tabelas por vez (Mantido para compatibilidade, agora chama a versão otimizada direta)
 * @param {number} mes - Número do mês (1-12)
 * @param {number} ano - Ano
 * @param {Array<string>} vendedorasSelecionadas - Vendedoras selecionadas
 * @returns {void}
 */
function gerarTabelasPorMesAnoEmLotes(mes, ano, vendedorasSelecionadas) {
  console.log("Chamando gerarTabelasPorMesAnoEmLotes (redirecionado para a versão otimizada em lote único)");
  gerarTabelasPorMesAno(mes, ano, vendedorasSelecionadas);
}

/**
 * Gera as tabelas para todos os dias úteis usando escrita em lote
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
  
  const numVendedoras = vendedorasSelecionadas.length;
  const alturaTabela = numVendedoras + 2; // Cabeçalho + subcabeçalho + linhas de vendedoras
  const alturaGrupo = alturaTabela + 1;   // Tabela + linha de espaçamento
  
  const totalDias = diasUteis.length;
  const numTableRows = Math.ceil(totalDias / CONFIG.COLUMNS_PER_ROW);
  const totalLinhasGrid = numTableRows * alturaGrupo;
  const totalColunasGrid = 19; // 5 colunas de tabelas * 3 larguras + 4 colunas de espaçamento = 19
  
  // 1. Inicializar matrizes de formatação em memória
  const values = Array.from({length: totalLinhasGrid}, () => Array(totalColunasGrid).fill(""));
  const backgrounds = Array.from({length: totalLinhasGrid}, () => Array(totalColunasGrid).fill(null));
  const fontWeights = Array.from({length: totalLinhasGrid}, () => Array(totalColunasGrid).fill("normal"));
  const fontSizes = Array.from({length: totalLinhasGrid}, () => Array(totalColunasGrid).fill(CONFIG.FONT_SIZES.NORMAL));
  const horizontalAlignments = Array.from({length: totalLinhasGrid}, () => Array(totalColunasGrid).fill("center"));
  const verticalAlignments = Array.from({length: totalLinhasGrid}, () => Array(totalColunasGrid).fill("middle"));
  
  // 2. Preencher as matrizes
  for (let k = 0; k < totalDias; k++) {
    const diaUtil = diasUteis[k];
    const tableRow = Math.floor(k / CONFIG.COLUMNS_PER_ROW);
    const tableCol = k % CONFIG.COLUMNS_PER_ROW;
    
    const startR = tableRow * alturaGrupo;
    const startC = tableCol * CONFIG.COLUMN_SPACING;
    
    // Cabeçalho da Data (Mesclado nas 3 colunas)
    for (let c = 0; c < 3; c++) {
      values[startR][startC + c] = (c === 0) ? diaUtil.dataFormatada : "";
      backgrounds[startR][startC + c] = CONFIG.COLORS.HEADER;
      fontWeights[startR][startC + c] = "bold";
      fontSizes[startR][startC + c] = CONFIG.FONT_SIZES.HEADER;
    }
    
    // Subcabeçalhos
    for (let c = 0; c < 3; c++) {
      values[startR + 1][startC + c] = CABECALHOS[c];
      backgrounds[startR + 1][startC + c] = CONFIG.COLORS.HEADER;
      fontWeights[startR + 1][startC + c] = "bold";
      fontSizes[startR + 1][startC + c] = CONFIG.FONT_SIZES.NORMAL;
    }
    
    // Linhas das vendedoras
    for (let s = 0; s < numVendedoras; s++) {
      values[startR + 2 + s][startC] = vendedorasSelecionadas[s];
      values[startR + 2 + s][startC + 1] = "";
      values[startR + 2 + s][startC + 2] = "";
      
      for (let c = 0; c < 3; c++) {
        fontSizes[startR + 2 + s][startC + c] = CONFIG.FONT_SIZES.NORMAL;
      }
    }
  }
  
  // 3. Gravação em lote única na planilha
  const rangeGrid = aba.getRange(CONFIG.START_ROW, 1, totalLinhasGrid, totalColunasGrid);
  rangeGrid.setValues(values);
  rangeGrid.setBackgrounds(backgrounds);
  rangeGrid.setFontWeights(fontWeights);
  rangeGrid.setFontSizes(fontSizes);
  rangeGrid.setHorizontalAlignments(horizontalAlignments);
  rangeGrid.setVerticalAlignments(verticalAlignments);
  
  // 4. Aplicar mesclagens e bordas por tabela (operações rápidas de layout no Sheets)
  for (let k = 0; k < totalDias; k++) {
    const tableRow = Math.floor(k / CONFIG.COLUMNS_PER_ROW);
    const tableCol = k % CONFIG.COLUMNS_PER_ROW;
    
    const linha = CONFIG.START_ROW + tableRow * alturaGrupo;
    const coluna = 1 + tableCol * CONFIG.COLUMN_SPACING;
    
    try {
      // Mesclar linha de cabeçalho da data
      aba.getRange(linha, coluna, 1, 3).merge();
      
      // Aplicar bordas ao redor e dentro da tabela
      aba.getRange(linha, coluna, alturaTabela, 3).setBorder(
        true,  // top
        true,  // left
        true,  // bottom
        true,  // right
        true,  // vertical
        true,  // horizontal
        CONFIG.COLORS.BORDER,
        SpreadsheetApp.BorderStyle.SOLID
      );
    } catch (e) {
      console.warn(`Erro de layout para tabela do dia ${diasUteis[k].dataFormatada}:`, e);
    }
  }
}

/**
 * Gera um lote de tabelas (Mantido para compatibilidade legado)
 */
function gerarLoteTabelas(aba, loteDiasUteis, linhaInicial, colunaInicial, vendedorasSelecionadas) {
  console.warn("gerarLoteTabelas está obsoleta e foi substituída por gerarTabelasDiasUteis.");
  gerarTabelasDiasUteis(aba, loteDiasUteis, 0, 0, vendedorasSelecionadas);
  return {
    linha: linhaInicial,
    coluna: colunaInicial
  };
}

/**
 * Cria uma tabela para um dia específico (Mantido para compatibilidade legado)
 */
function criarTabelaDia(aba, diaUtil, linha, coluna, vendedorasSelecionadas) {
  console.warn("criarTabelaDia está obsoleta e foi substituída pela escrita em lote.");
  const numVendedoras = vendedorasSelecionadas.length;
  const alturaTabela = numVendedoras + 2;
  
  aba.getRange(linha, coluna, 1, CONFIG.TABLE_COLUMNS).merge().setValue(diaUtil.dataFormatada).setBackground(CONFIG.COLORS.HEADER).setFontWeight("bold");
  aba.getRange(linha + 1, coluna, 1, CONFIG.TABLE_COLUMNS).setValues([CABECALHOS]).setBackground(CONFIG.COLORS.HEADER);
  
  const linhasVendedoras = vendedorasSelecionadas.map(v => [v, "", ""]);
  aba.getRange(linha + 2, coluna, linhasVendedoras.length, CONFIG.TABLE_COLUMNS).setValues(linhasVendedoras);
  
  aba.getRange(linha, coluna, alturaTabela, CONFIG.TABLE_COLUMNS).setBorder(
    true, true, true, true, true, true, CONFIG.COLORS.BORDER, SpreadsheetApp.BorderStyle.SOLID
  );
}
