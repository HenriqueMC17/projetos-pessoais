/**
 * Lógica de Registro de Atendimentos
 * 
 * Este arquivo contém todas as funções relacionadas ao registro de atendimentos
 */

// ================================
// FUNÇÕES DE REGISTRO
// ================================

/**
 * Registra atendimento e envia notificação por e-mail
 * Cria evento no calendário e atualiza indicadores
 * @returns {void}
 */
function registrarAtendimento() {
  const ui = SpreadsheetApp.getUi();
  
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error("Nenhuma planilha ativa encontrada");
    }
    
    const form = obterAba(ss, CONFIG.SHEETS.FORM);
    const dados = obterAba(ss, CONFIG.SHEETS.DADOS);
    
    // Obter dados do formulário
    const { dadosBasicos, valoresForm } = obterDadosFormulario(form);
    const [data, telefone, nomeCliente] = dadosBasicos;
    
    // Validação de campos obrigatórios
    if (!validarFormulario(valoresForm, dadosBasicos, ui)) {
      return;
    }
    
    // Obter próximo ID e registrar
    const novoId = obterProximoId(dados);
    dados.appendRow([data, telefone, nomeCliente, novoId, ...valoresForm]);
    
    // Atualizar indicadores
    contarIndicadores();
    
    // Processar notificação e evento no calendário
    const resultado = processarNotificacao(form, dadosBasicos, valoresForm, ui);
    
    // Exibir resultado
    exibirResultadoRegistro(ui, resultado);
    
    // Limpar formulário
    limparFormulario(form);
    SpreadsheetApp.flush();
    
  } catch (error) {
    ErrorHandler.handle(error, CONFIG.MENSAGENS.ERRO_REGISTRO);
  }
}

/**
 * Valida o formulário antes de registrar
 * @param {Array} valoresForm - Valores do formulário
 * @param {Array} dadosBasicos - Dados básicos [data, telefone, nomeCliente]
 * @param {GoogleAppsScript.Base.Ui} ui - Interface do usuário
 * @returns {boolean} True se válido, false caso contrário
 */
function validarFormulario(valoresForm, dadosBasicos, ui) {
  // Validar campos obrigatórios do formulário
  const camposObrigatorios = valoresForm.slice(0, CONFIG.FORM.CAMPOS_OBRIGATORIOS);
  if (camposObrigatorios.some(v => !validarCampoObrigatorio(v))) {
    ui.alert(
      "Validação",
      CONFIG.MENSAGENS.CAMPOS_OBRIGATORIOS,
      ui.ButtonSet.OK
    );
    return false;
  }
  
  // Validar dados básicos
  const [data, , nomeCliente] = dadosBasicos;
  if (!validarCampoObrigatorio(data) || !validarCampoObrigatorio(nomeCliente)) {
    ui.alert(
      "Validação",
      "Data e Nome do Cliente são obrigatórios.",
      ui.ButtonSet.OK
    );
    return false;
  }
  
  return true;
}

/**
 * Processa a notificação e criação de evento no calendário
 * @param {GoogleAppsScript.Spreadsheet.Sheet} form - Aba do formulário
 * @param {Array} dadosBasicos - Array com [data, telefone, nomeCliente]
 * @param {Array} valoresForm - Array com valores do formulário
 * @param {GoogleAppsScript.Base.Ui} ui - Interface do usuário
 * @returns {Object} Objeto com resultado do processamento
 */
function processarNotificacao(form, dadosBasicos, valoresForm, ui) {
  const [data, telefone, nomeCliente] = dadosBasicos;
  const [atendente, , tipo, , , , horaChegada] = valoresForm;
  
  // Solicitar setor
  const setor = solicitarSetor(ui);
  if (!setor) {
    return {
      sucesso: false,
      registrado: true,
      mensagem: CONFIG.MENSAGENS.REGISTRO_SALVO
    };
  }
  
  // Validar data e hora
  if (!validarCampoObrigatorio(data) || !validarCampoObrigatorio(horaChegada)) {
    return {
      sucesso: false,
      registrado: true,
      mensagem: CONFIG.MENSAGENS.DATA_INVALIDA
    };
  }
  
  try {
    // Criar evento no calendário
    criarEventoCalendario(data, horaChegada, setor, nomeCliente, telefone, atendente, tipo);
    
    return {
      sucesso: true,
      registrado: true,
      mensagem: ""
    };
    
  } catch (error) {
    console.error("Erro ao criar evento no calendário:", error);
    return {
      sucesso: false,
      registrado: true,
      mensagem: CONFIG.MENSAGENS.ERRO_CALENDARIO
    };
  }
}

/**
 * Solicita o setor ao usuário
 * @param {GoogleAppsScript.Base.Ui} ui - Interface do usuário
 * @returns {string|null} Setor selecionado ou null se cancelado
 */
function solicitarSetor(ui) {
  const setores = Object.keys(EMAILS_POR_SETOR);
  const resposta = ui.prompt(
    'Selecione o setor para receber a notificação',
    `Digite exatamente um dos seguintes setores:\n\n${setores.join('\n')}`,
    ui.ButtonSet.OK_CANCEL
  );
  
  if (resposta.getSelectedButton() !== ui.Button.OK) {
    return null;
  }
  
  const setor = resposta.getResponseText().trim();
  if (!EMAILS_POR_SETOR[setor]) {
    ui.alert(
      "Setor Inválido",
      CONFIG.MENSAGENS.SETOR_INVALIDO + `\n\nSetores disponíveis:\n${setores.join('\n')}`,
      ui.ButtonSet.OK
    );
    return null;
  }
  
  return setor;
}

/**
 * Exibe o resultado do registro
 * @param {GoogleAppsScript.Base.Ui} ui - Interface do usuário
 * @param {Object} resultado - Resultado do processamento
 * @returns {void}
 */
function exibirResultadoRegistro(ui, resultado) {
  if (resultado.sucesso) {
    ui.alert(
      "Sucesso",
      CONFIG.MENSAGENS.SUCESSO_REGISTRO,
      ui.ButtonSet.OK
    );
  } else if (resultado.registrado) {
    ui.alert(
      "Aviso",
      resultado.mensagem,
      ui.ButtonSet.OK
    );
  }
}

