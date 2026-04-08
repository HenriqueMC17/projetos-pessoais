/**
 * Menu e Inicialização do Sistema de Controle de Receptivas
 * 
 * Este arquivo contém as funções de menu e inicialização do sistema
 */

// ================================
// FUNÇÕES PRINCIPAIS
// ================================

/**
 * Função executada quando a planilha é aberta
 * Cria o menu personalizado na interface
 * @returns {void}
 */
function onOpen() {
  try {
    const ui = SpreadsheetApp.getUi();
    
    // Validar se as constantes estão carregadas
    if (typeof CONFIG === 'undefined' || typeof VENDEDORAS === 'undefined' || typeof MENSAGENS === 'undefined') {
      console.error("Configurações não carregadas. Verifique se o arquivo config.js está presente.");
      ui.alert("Erro de Configuração", "Arquivos de configuração não encontrados. Verifique se todos os arquivos estão carregados.", ui.ButtonSet.OK);
      return;
    }
    
    // Validar configurações básicas
    if (!VENDEDORAS || VENDEDORAS.length === 0) {
      console.error("Nenhuma vendedora configurada no sistema.");
      const mensagemErro = (typeof MENSAGENS !== 'undefined' && MENSAGENS.ERRO_VAZIO) 
        ? MENSAGENS.ERRO_VAZIO 
        : "Nenhuma vendedora configurada no sistema.";
      ui.alert("Erro de Configuração", mensagemErro, ui.ButtonSet.OK);
      return;
    }
    
    // Criar menu
    const menuTitle = (typeof CONFIG !== 'undefined' && CONFIG.MENU_TITLE) ? CONFIG.MENU_TITLE : "📊 Gerar Tabelas";
    const menuItem = (typeof CONFIG !== 'undefined' && CONFIG.MENU_ITEM) ? CONFIG.MENU_ITEM : "Gerar Tabelas";
    
    ui.createMenu(menuTitle)
      .addItem(menuItem, "gerarTabelasComPrompt")
      .addToUi();
      
  } catch (error) {
    ErrorHandler.handle(error, (typeof MENSAGENS !== 'undefined' && MENSAGENS.ERRO_INICIALIZACAO) ? MENSAGENS.ERRO_INICIALIZACAO : "Erro ao inicializar o sistema.");
  }
}

/**
 * Função principal para gerar tabelas com interface de usuário
 * Solicita mês e ano ao usuário e valida as entradas
 * 
 * Esta função pode ser chamada:
 * - Via menu: "📊 Gerar Tabelas" > "Gerar Tabelas"
 * - Via botão da planilha (quando associado a esta função)
 * - Diretamente pelo nome da função
 * 
 * IMPORTANTE: Esta função deve estar no escopo global para ser encontrada pelos botões.
 * 
 * @returns {void}
 */
function gerarTabelasComPrompt() {
  try {
    const ui = SpreadsheetApp.getUi();
    
    // Validar se há vendedoras configuradas
    if (typeof VENDEDORAS === 'undefined' || !VENDEDORAS || VENDEDORAS.length === 0) {
      ui.alert("Erro", MENSAGENS.ERRO_VAZIO || "Nenhuma vendedora configurada no sistema.", ui.ButtonSet.OK);
      return;
    }
    
    // Validar se as funções auxiliares estão disponíveis
    if (typeof solicitarMes !== 'function' || typeof solicitarAno !== 'function' || 
        typeof validarEntradas !== 'function' || typeof solicitarVendedoras !== 'function' ||
        typeof gerarTabelasPorMesAnoEmLotes !== 'function') {
      ui.alert("Erro", "Funções auxiliares não encontradas. Verifique se todos os arquivos estão carregados.", ui.ButtonSet.OK);
      console.error("Funções faltando:", {
        solicitarMes: typeof solicitarMes,
        solicitarAno: typeof solicitarAno,
        validarEntradas: typeof validarEntradas,
        solicitarVendedoras: typeof solicitarVendedoras,
        gerarTabelasPorMesAnoEmLotes: typeof gerarTabelasPorMesAnoEmLotes
      });
      return;
    }
    
    // Solicitar mês
    const mes = solicitarMes(ui);
    if (mes === null) {
      return; // Usuário cancelou
    }
    
    // Solicitar ano
    const ano = solicitarAno(ui);
    if (ano === null) {
      return; // Usuário cancelou
    }
    
    // Validar entradas
    const validacao = validarEntradas(mes, ano);
    if (!validacao.valido) {
      ui.alert("Validação", validacao.mensagem, ui.ButtonSet.OK);
      return;
    }
    
    // Solicitar seleção de vendedoras
    const vendedorasSelecionadas = solicitarVendedoras(ui, VENDEDORAS);
    if (!vendedorasSelecionadas || vendedorasSelecionadas.length === 0) {
      return; // Usuário cancelou ou não selecionou nenhuma
    }
    
    // Gerar tabelas em lotes de até 5
    try {
      gerarTabelasPorMesAnoEmLotes(mes, ano, vendedorasSelecionadas);
      
      // Feedback de sucesso (já exibido durante a geração em lotes)
      // Não precisa exibir novamente aqui
    } catch (error) {
      ErrorHandler.handle(error, "Ocorreu um erro ao gerar as tabelas em lotes.");
    }
    
  } catch (error) {
    ErrorHandler.handle(error, (typeof MENSAGENS !== 'undefined' && MENSAGENS.ERRO_GERAR_TABELAS) ? MENSAGENS.ERRO_GERAR_TABELAS : "Ocorreu um erro ao gerar as tabelas.");
  }
}

/**
 * Função auxiliar para ser associada ao botão da planilha
 * Esta função é um alias para gerarTabelasComPrompt()
 * e pode ser facilmente associada a um botão de imagem na planilha
 * 
 * INSTRUÇÕES PARA ASSOCIAR AO BOTÃO:
 * 1. Insira uma imagem/botão na planilha (Inserir > Imagem ou Desenho)
 * 2. Clique com o botão direito na imagem/botão
 * 3. Selecione "Atribuir script" ou "Assign script"
 * 4. Digite: gerarTabelasComPrompt (ou gerarTabelas)
 * 5. Clique em OK
 * 
 * IMPORTANTE: Esta função deve estar no escopo global para ser encontrada pelos botões.
 * 
 * @returns {void}
 */
function gerarTabelas() {
  try {
    // Esta função é um alias para facilitar a associação ao botão
    // Chama diretamente gerarTabelasComPrompt() que está no mesmo escopo
    if (typeof gerarTabelasComPrompt === 'function') {
      gerarTabelasComPrompt();
    } else {
      const ui = SpreadsheetApp.getUi();
      ui.alert("Erro", "Função gerarTabelasComPrompt não encontrada. Verifique se todos os arquivos estão carregados.", ui.ButtonSet.OK);
      console.error("Função gerarTabelasComPrompt não está disponível");
    }
  } catch (error) {
    ErrorHandler.handle(error, "Ocorreu um erro ao executar a função gerarTabelas.");
  }
}

/**
 * Função de teste para verificar se todas as funções e constantes estão carregadas
 * Útil para diagnosticar problemas de carregamento
 * @returns {void}
 */
function testarSistema() {
  try {
    const ui = SpreadsheetApp.getUi();
    const resultados = [];
    
    // Verificar constantes
    resultados.push(`CONFIG: ${typeof CONFIG !== 'undefined' ? '✓' : '✗'}`);
    resultados.push(`VENDEDORAS: ${typeof VENDEDORAS !== 'undefined' ? '✓' : '✗'}`);
    resultados.push(`MENSAGENS: ${typeof MENSAGENS !== 'undefined' ? '✓' : '✗'}`);
    resultados.push(`MESES: ${typeof MESES !== 'undefined' ? '✓' : '✗'}`);
    resultados.push(`CABECALHOS: ${typeof CABECALHOS !== 'undefined' ? '✓' : '✗'}`);
    
    // Verificar funções principais
    resultados.push(`gerarTabelasComPrompt: ${typeof gerarTabelasComPrompt === 'function' ? '✓' : '✗'}`);
    resultados.push(`gerarTabelas: ${typeof gerarTabelas === 'function' ? '✓' : '✗'}`);
    resultados.push(`solicitarMes: ${typeof solicitarMes === 'function' ? '✓' : '✗'}`);
    resultados.push(`solicitarAno: ${typeof solicitarAno === 'function' ? '✓' : '✗'}`);
    resultados.push(`validarEntradas: ${typeof validarEntradas === 'function' ? '✓' : '✗'}`);
    resultados.push(`gerarTabelasPorMesAno: ${typeof gerarTabelasPorMesAno === 'function' ? '✓' : '✗'}`);
    resultados.push(`obterFeriados: ${typeof obterFeriados === 'function' ? '✓' : '✗'}`);
    resultados.push(`calcularDiasUteis: ${typeof calcularDiasUteis === 'function' ? '✓' : '✗'}`);
    resultados.push(`obterOuCriarAba: ${typeof obterOuCriarAba === 'function' ? '✓' : '✗'}`);
    resultados.push(`configurarAba: ${typeof configurarAba === 'function' ? '✓' : '✗'}`);
    
    const mensagem = "Resultado do Teste do Sistema:\n\n" + resultados.join("\n");
    ui.alert("Teste do Sistema", mensagem, ui.ButtonSet.OK);
    console.log("Teste do Sistema:", resultados);
    
  } catch (error) {
    ErrorHandler.handle(error, "Erro ao testar sistema");
  }
}

