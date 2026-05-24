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
  
  // Adicionar a opção de cadastrar novo vendedor
  const indiceAdicionar = vendedorasDisponiveis.length + 1;
  listaVendedoras += `${indiceAdicionar}. [+ ADICIONAR NOVO VENDEDOR]\n`;
  
  const mensagem = listaVendedoras + "\n" + "Selecione as vendedoras que deseja incluir nas tabelas.\n\nDigite os números separados por vírgula (ex: 1,2,3,4,5) ou escolha a opção para adicionar um novo vendedor:";
  
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
    return solicitarVendedoras(ui, vendedorasDisponiveis);
  }
  
  // Separar as escolhas do usuário
  const partes = texto.split(',');
  let selecionouAdicionar = false;
  const indices = [];
  
  for (let i = 0; i < partes.length; i++) {
    const num = parseInt(partes[i].trim(), 10);
    if (!isNaN(num)) {
      if (num === indiceAdicionar) {
        selecionouAdicionar = true;
      } else if (num >= 1 && num <= vendedorasDisponiveis.length) {
        indices.push(num);
      }
    }
  }
  
  // Se o usuário selecionou a opção de adicionar novo vendedor
  if (selecionouAdicionar) {
    const promptNovo = ui.prompt(
      "Adicionar Novo Vendedor",
      "Digite o nome do novo vendedor/vendedora:",
      ui.ButtonSet.OK_CANCEL
    );
    
    if (promptNovo.getSelectedButton() === ui.Button.OK) {
      const nomeNovo = promptNovo.getResponseText().trim().toUpperCase();
      if (nomeNovo !== "") {
        const adicionado = adicionarNovoVendedor(nomeNovo);
        if (adicionado) {
          ui.alert("Sucesso", `Vendedor "${nomeNovo}" adicionado com sucesso!`, ui.ButtonSet.OK);
          // Atualizar a variável global VENDEDORAS
          if (typeof obterListaVendedoras === 'function') {
            VENDEDORAS = obterListaVendedoras();
          } else {
            VENDEDORAS.push(nomeNovo);
          }
          // Chamar solicitarVendedoras novamente com a lista atualizada
          return solicitarVendedoras(ui, VENDEDORAS);
        } else {
          ui.alert("Aviso", `O vendedor "${nomeNovo}" já existe ou não pôde ser adicionado.`, ui.ButtonSet.OK);
          return solicitarVendedoras(ui, vendedorasDisponiveis);
        }
      } else {
        ui.alert("Erro", "Nome do vendedor não pode estar em branco.", ui.ButtonSet.OK);
        return solicitarVendedoras(ui, vendedorasDisponiveis);
      }
    } else {
      // Se cancelou o prompt de adição, volta à tela de seleção original
      return solicitarVendedoras(ui, vendedorasDisponiveis);
    }
  }
  
  if (indices.length === 0) {
    ui.alert("Erro", MENSAGENS.ERRO_SELECAO_INVALIDA, ui.ButtonSet.OK);
    return solicitarVendedoras(ui, vendedorasDisponiveis);
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
