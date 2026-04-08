/**
 * Menu e Inicialização do Sistema de Distribuição de Leads
 * 
 * Este arquivo contém as funções de menu e inicialização do sistema
 */

// ================================
// FUNÇÕES DE INTERFACE
// ================================

/**
 * Função executada quando a planilha é aberta
 * Cria o menu personalizado na interface
 */
function onOpen() {
  try {
    const ui = SpreadsheetApp.getUi();
    
    // Menu de Leads
    ui.createMenu(CONFIG.MENU_TITLE)
      .addItem(CONFIG.MENU_ITEM, "abrirDialogDistribuicao")
      .addSeparator()
      .addItem(CONFIG.MENU_PERMISSOES, "aplicarPermissoes")
      .addSeparator()
      .addItem(CONFIG.MENU_AUDITORIA, "abrirAuditoria")
      .addToUi();

    // Menu de Vendedores
    ui.createMenu(CONFIG.MENU_VENDEDORES_TITLE)
      .addItem(CONFIG.MENU_CADASTRO_VENDEDOR, "abrirCadastroVendedor")
      .addSeparator()
      .addItem(CONFIG.MENU_RENOMEAR_VENDEDOR, "abrirRenomearVendedor")
      .addItem(CONFIG.MENU_REMOVER_VENDEDOR, "abrirRemoverVendedor")
      .addSeparator()
      .addItem(CONFIG.MENU_REATRIBUIR_VENDEDOR, "abrirReatribuirVendedor")
      .addToUi();
      
  } catch (error) {
    ErrorHandler.handle(error, "Erro ao inicializar o sistema de distribuição de leads. Verifique o console.");
  }
}

/**
 * Abre o diálogo HTML para distribuição de leads
 */
function abrirDialogDistribuicao() {
  try {
    // Verificar se a planilha base existe
    const ss = obterPlanilhaAtiva();
    const base = obterAba(ss, CONFIG.SHEET_BASE_GERAL);
    
    if (!base) {
      SpreadsheetApp.getUi().alert(
        "Erro: A planilha '" + CONFIG.SHEET_BASE_GERAL + "' não foi encontrada.\n" +
        "Por favor, verifique se a planilha existe."
      );
      return;
    }

    // Usar HTML inline ao invés de arquivo externo
    const htmlContent = obterHTMLDialogo();
    const html = HtmlService.createHtmlOutput(htmlContent)
      .setWidth(CONFIG.DIALOG_WIDTH)
      .setHeight(CONFIG.DIALOG_HEIGHT)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);

    SpreadsheetApp.getUi().showModalDialog(html, CONFIG.DIALOG_TITLE);
  } catch (error) {
    ErrorHandler.handle(error, "Erro ao abrir o diálogo de distribuição");
  }
}

