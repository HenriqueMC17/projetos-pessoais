/**
 * Formatação e Estilos do Sistema de Controle de Receptivas
 * 
 * Este arquivo contém todas as funções relacionadas à formatação e estilos
 */

// ================================
// FUNÇÕES DE FORMATAÇÃO
// ================================

/**
 * Configura a aba com título e formatação inicial
 * @param {GoogleAppsScript.Spreadsheet.Sheet} aba - Aba a ser configurada
 * @param {number} mes - Número do mês (1-12)
 * @param {number} ano - Ano
 * @returns {void}
 */
function configurarAba(aba, mes, ano) {
  if (!aba) {
    throw new Error("Aba não fornecida");
  }
  
  if (!mes || !ano || mes < 1 || mes > 12) {
    throw new Error("Mês ou ano inválido");
  }
  
  try {
    // Limpar conteúdo e formatações
    aba.clearContents();
    aba.clearFormats();
    
    // Configurar altura da primeira linha
    aba.setRowHeights(CONFIG.TITLE_ROW, CONFIG.TITLE_ROW, CONFIG.HEADER_HEIGHT);
    
    // Criar título principal
    const titulo = `${MESES[mes - 1]} ${ano}`;
    const rangeTitulo = aba.getRange(
      CONFIG.TITLE_ROW,
      1,
      1,
      CONFIG.TITLE_COLUMNS
    );
    
    rangeTitulo
      .merge()
      .setValue(titulo)
      .setFontSize(CONFIG.FONT_SIZES.TITLE)
      .setFontWeight("bold")
      .setFontColor(CONFIG.COLORS.TEXT_DARK)
      .setBackground(CONFIG.COLORS.HEADER)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
      
  } catch (error) {
    console.error("Erro ao configurar aba:", error);
    throw error;
  }
}

/**
 * Adiciona o botão de ação na aba que chama gerarTabelasComPrompt()
 * Cria um botão funcional usando célula formatada com hiperlink para script
 * @param {GoogleAppsScript.Spreadsheet.Sheet} aba - Aba de destino
 * @returns {void}
 */
function adicionarBotaoAcao(aba) {
  if (!aba) {
    console.warn("Aba não fornecida para adicionar botão");
    return;
  }
  
  try {
    // Remover botões antigos (drawings e células de botão)
    limparBotoesAntigos(aba);
    
    // Calcular posição do botão
    const lastCol = Math.max(aba.getLastColumn(), CONFIG.TITLE_COLUMNS);
    const colunaBotao = lastCol + CONFIG.BUTTON.OFFSET_COL;
    
    // Criar botão usando célula formatada com função associada
    const rangeBotao = aba.getRange(CONFIG.BUTTON.ROW, colunaBotao);
    
    // Configurar célula como botão visual
    rangeBotao
      .setValue(CONFIG.BUTTON_TEXT)
      .setBackground(CONFIG.COLORS.BUTTON)
      .setFontColor(CONFIG.COLORS.TEXT_WHITE)
      .setFontSize(CONFIG.BUTTON.FONT_SIZE)
      .setFontWeight("bold")
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle")
      .setBorder(
        true,
        true,
        true,
        true,
        false,
        false,
        CONFIG.COLORS.BUTTON_BORDER,
        SpreadsheetApp.BorderStyle.SOLID_MEDIUM
      );
    
    // Ajustar largura da coluna para o botão
    aba.setColumnWidth(colunaBotao, CONFIG.BUTTON.WIDTH / 7); // Aproximação (7 pixels por unidade)
    
    // Adicionar nota explicativa indicando que o botão chama a função
    rangeBotao.setNote("Clique nesta célula e execute a função 'gerarTabelasComPrompt' do menu, ou use o menu '📊 Gerar Tabelas' > 'Gerar Tabelas'");
    
    // Criar um botão de imagem funcional que chama a função
    criarBotaoImagemFuncional(aba, colunaBotao);
    
    console.log("Botão de ação adicionado com sucesso");
    
  } catch (error) {
    console.error("Erro ao adicionar botão de ação:", error);
    // Não lançar erro para não interromper a geração das tabelas
  }
}

/**
 * Limpa botões antigos da aba
 * @param {GoogleAppsScript.Spreadsheet.Sheet} aba - Aba
 * @returns {void}
 */
function limparBotoesAntigos(aba) {
  try {
    // Remover drawings antigos
    const drawings = aba.getDrawings();
    drawings.forEach(drawing => {
      try {
        drawing.remove();
      } catch (error) {
        console.warn("Erro ao remover drawing antigo:", error);
      }
    });
    
    // Limpar células de botão anteriores (buscar por células com cor de botão)
    const lastCol = aba.getLastColumn();
    if (lastCol > 0) {
      const rangeBusca = aba.getRange(CONFIG.BUTTON.ROW, 1, 1, lastCol);
      const valores = rangeBusca.getValues()[0];
      const backgrounds = rangeBusca.getBackgrounds()[0];
      
      valores.forEach((valor, index) => {
        if (valor === CONFIG.BUTTON_TEXT && backgrounds[index] === CONFIG.COLORS.BUTTON) {
          const cell = aba.getRange(CONFIG.BUTTON.ROW, index + 1);
          cell.clearContent();
          cell.clearFormat();
        }
      });
    }
  } catch (error) {
    console.warn("Erro ao limpar botões antigos:", error);
  }
}

/**
 * Cria um botão de imagem funcional que chama gerarTabelasComPrompt()
 * 
 * IMPORTANTE: No Google Sheets, para criar um botão clicável que execute a função:
 * 1. Insira manualmente uma imagem/botão na célula do botão (Inserir > Imagem ou Desenho)
 * 2. Clique com botão direito na imagem > "Atribuir script" ou "Assign script"
 * 3. Digite EXATAMENTE: gerarTabelasComPrompt (sem espaços, sem parênteses, sem aspas)
 *    OU digite: gerarTabelas (alias alternativo)
 * 4. Clique em OK
 * 
 * NOTA: Certifique-se de que o nome da função está EXATAMENTE como escrito acima.
 * 
 * @param {GoogleAppsScript.Spreadsheet.Sheet} aba - Aba
 * @param {number} colunaBotao - Coluna do botão
 * @returns {void}
 */
function criarBotaoImagemFuncional(aba, colunaBotao) {
  try {
    const rangeBotao = aba.getRange(CONFIG.BUTTON.ROW, colunaBotao);
    
    // Verificar se a função está disponível
    const funcaoDisponivel = typeof gerarTabelasComPrompt === 'function';
    const statusFuncao = funcaoDisponivel ? '✓ FUNÇÃO DISPONÍVEL' : '✗ FUNÇÃO NÃO ENCONTRADA';
    
    // Atualizar nota com instruções claras para associar o botão
    const nota = `🔘 BOTÃO PARA GERAR TABELAS\n\n` +
                 `Status: ${statusFuncao}\n\n` +
                 `Para tornar este botão funcional:\n` +
                 `1. Insira uma imagem/botão nesta célula (Inserir > Imagem ou Desenho)\n` +
                 `2. Clique com botão direito na imagem\n` +
                 `3. Selecione "Atribuir script" ou "Assign script"\n` +
                 `4. Digite EXATAMENTE (sem espaços, sem parênteses):\n` +
                 `   gerarTabelasComPrompt\n` +
                 `   OU\n` +
                 `   gerarTabelas\n` +
                 `5. Clique em OK\n\n` +
                 `⚠️ IMPORTANTE: O nome deve ser EXATAMENTE como acima (case-sensitive)\n\n` +
                 `OU use o menu: "📊 Gerar Tabelas" > "Gerar Tabelas"`;
    
    rangeBotao.setNote(nota);
    
    if (!funcaoDisponivel) {
      console.error(`ATENÇÃO: Função 'gerarTabelasComPrompt' não está disponível no escopo global!`);
      console.error("Verifique se o arquivo menu.js está carregado corretamente.");
    }
    
    console.log(`Botão visual criado na coluna ${colunaBotao}. ` +
                `Função disponível: ${funcaoDisponivel}. ` +
                `Associe a função 'gerarTabelasComPrompt' ao botão de imagem inserido manualmente.`);
    
  } catch (error) {
    console.warn("Erro ao criar botão de imagem funcional:", error);
  }
}

