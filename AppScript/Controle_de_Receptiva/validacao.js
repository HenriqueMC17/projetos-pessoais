/**
 * Funções de Validação e Entrada de Dados
 * 
 * Este arquivo contém todas as funções relacionadas à validação e entrada de dados
 */

// ================================
// FUNÇÕES DE VALIDAÇÃO E ENTRADA
// ================================

/**
 * Solicita o mês ao usuário
 * @param {GoogleAppsScript.Base.Ui} ui - Interface do usuário
 * @returns {number|null} Número do mês ou null se cancelado
 */
function solicitarMes(ui) {
  const resposta = ui.prompt(
    "Mês",
    MENSAGENS.PROMPT_MES,
    ui.ButtonSet.OK_CANCEL
  );
  
  if (resposta.getSelectedButton() !== ui.Button.OK) {
    return null;
  }
  
  const texto = resposta.getResponseText().trim();
  const mes = parseInt(texto, 10);
  
  // Validar se é um número válido
  if (isNaN(mes)) {
    ui.alert("Erro", MENSAGENS.MES_INVALIDO, ui.ButtonSet.OK);
    return null;
  }
  
  return mes;
}

/**
 * Solicita o ano ao usuário
 * @param {GoogleAppsScript.Base.Ui} ui - Interface do usuário
 * @returns {number|null} Ano ou null se cancelado
 */
function solicitarAno(ui) {
  const resposta = ui.prompt(
    "Ano",
    MENSAGENS.PROMPT_ANO,
    ui.ButtonSet.OK_CANCEL
  );
  
  if (resposta.getSelectedButton() !== ui.Button.OK) {
    return null;
  }
  
  const texto = resposta.getResponseText().trim();
  const ano = parseInt(texto, 10);
  
  // Validar se é um número válido
  if (isNaN(ano)) {
    ui.alert("Erro", MENSAGENS.ANO_INVALIDO, ui.ButtonSet.OK);
    return null;
  }
  
  return ano;
}

/**
 * Valida as entradas de mês e ano
 * @param {number} mes - Número do mês
 * @param {number} ano - Ano
 * @returns {Object} Objeto com propriedade 'valido' (boolean) e 'mensagem' (string)
 */
function validarEntradas(mes, ano) {
  // Validar mês
  if (isNaN(mes) || mes < CONFIG.MIN_MONTH || mes > CONFIG.MAX_MONTH) {
    return {
      valido: false,
      mensagem: MENSAGENS.MES_INVALIDO
    };
  }
  
  // Validar ano
  if (isNaN(ano) || ano < CONFIG.MIN_YEAR || ano > CONFIG.MAX_YEAR) {
    return {
      valido: false,
      mensagem: MENSAGENS.ANO_INVALIDO
    };
  }
  
  return {
    valido: true,
    mensagem: ""
  };
}

/**
 * Solicita a seleção de vendedoras ao usuário
 * @param {GoogleAppsScript.Base.Ui} ui - Interface do usuário
 * @param {Array<string>} vendedorasDisponiveis - Lista de vendedoras disponíveis
 * @returns {Array<string>|null} Array com vendedoras selecionadas ou null se cancelado
 */
function solicitarVendedoras(ui, vendedorasDisponiveis) {
  if (!vendedorasDisponiveis || vendedorasDisponiveis.length === 0) {
    ui.alert("Erro", "Nenhuma vendedora disponível para seleção.", ui.ButtonSet.OK);
    return null;
  }
  
  // Criar lista numerada de vendedoras
  let listaVendedoras = "Vendedoras disponíveis:\n\n";
  vendedorasDisponiveis.forEach((vendedora, index) => {
    listaVendedoras += `${index + 1}. ${vendedora}\n`;
  });
  
  const mensagem = listaVendedoras + "\n" + MENSAGENS.PROMPT_VENDEDORAS;
  
  const resposta = ui.prompt(
    "Seleção de Vendedoras",
    mensagem,
    ui.ButtonSet.OK_CANCEL
  );
  
  if (resposta.getSelectedButton() !== ui.Button.OK) {
    return null; // Usuário cancelou
  }
  
  const texto = resposta.getResponseText().trim();
  
  if (!texto || texto === "") {
    ui.alert("Erro", MENSAGENS.ERRO_SELECAO_VENDEDORAS, ui.ButtonSet.OK);
    return null;
  }
  
  // Processar seleção (números separados por vírgula)
  const indices = texto.split(',').map(item => {
    const num = parseInt(item.trim(), 10);
    return isNaN(num) ? null : num;
  }).filter(num => num !== null && num >= 1 && num <= vendedorasDisponiveis.length);
  
  if (indices.length === 0) {
    ui.alert("Erro", MENSAGENS.ERRO_SELECAO_INVALIDA, ui.ButtonSet.OK);
    return null;
  }
  
  // Converter índices em nomes de vendedoras (índices são 1-based)
  const vendedorasSelecionadas = indices.map(index => vendedorasDisponiveis[index - 1]);
  
  // Remover duplicatas
  const vendedorasUnicas = [...new Set(vendedorasSelecionadas)];
  
  return vendedorasUnicas;
}

/**
 * Pergunta ao usuário se deseja continuar gerando mais tabelas
 * @param {GoogleAppsScript.Base.Ui} ui - Interface do usuário
 * @returns {boolean} true se deseja continuar, false caso contrário
 */
function perguntarContinuar(ui) {
  const resposta = ui.alert(
    "Continuar?",
    MENSAGENS.PROMPT_CONTINUAR,
    ui.ButtonSet.YES_NO
  );
  
  return resposta === ui.Button.YES;
}
