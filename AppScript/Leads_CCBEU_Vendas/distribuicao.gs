/**
 * Lógica de Distribuição de Leads
 * 
 * Este arquivo contém todas as funções relacionadas à distribuição de leads
 */

// ================================
// FUNÇÕES DE DISTRIBUIÇÃO
// ================================

/**
 * Função principal chamada pelo HTML para distribuir leads
 * @param {number|string} quantidade - Quantidade de leads por vendedor
 * @param {Array<string>} vendedoresSelecionados - Array com nomes dos vendedores selecionados
 * @returns {Object} Resultado da distribuição com estatísticas
 */
function distribuirLeadsViaHTML(quantidade, vendedoresSelecionados) {
  try {
    // Validações iniciais
    const validacao = validarEntradas(quantidade, vendedoresSelecionados);
    if (!validacao.valido) {
      throw new Error(validacao.mensagem);
    }

    const ss = obterPlanilhaAtiva();
    const base = obterAba(ss, CONFIG.SHEET_BASE_GERAL);

    if (!base) {
      throw new Error("A planilha '" + CONFIG.SHEET_BASE_GERAL + "' não foi encontrada.");
    }

    // Verificar se as abas dos vendedores existem
    const vendedoresValidos = verificarVendedores(vendedoresSelecionados, ss);
    if (vendedoresValidos.length === 0) {
      throw new Error("Nenhum vendedor válido encontrado. Verifique se as abas existem.");
    }

    const qtd = Number(quantidade);
    const totalNecessario = qtd * vendedoresValidos.length;

    // Verificar limite de segurança
    if (totalNecessario > CONFIG.MAX_LEADS_POR_OPERACAO) {
      throw new Error("Quantidade solicitada excede o limite de " + CONFIG.MAX_LEADS_POR_OPERACAO + " leads por operação.");
    }

    // Obter leads disponíveis (sem responsável atribuído)
    const leadsDisponiveis = obterLeadsDisponiveis(base);

    if (leadsDisponiveis.length === 0) {
      throw new Error("Não há leads disponíveis para distribuição.\nTodos os leads já possuem responsável atribuído.");
    }

    if (leadsDisponiveis.length < totalNecessario) {
      console.warn("Atenção: Há apenas " + leadsDisponiveis.length + " leads disponíveis, mas são necessários " + totalNecessario);
    }

    // Distribuir leads de forma balanceada
    const resultado = distribuirLeadsBalanceado(
      base, 
      leadsDisponiveis, 
      vendedoresValidos, 
      qtd
    );

    // Retornar resultado para o HTML
    return {
      sucesso: true,
      mensagem: formatarMensagemSucesso(resultado),
      estatisticas: resultado
    };

  } catch (error) {
    console.error("Erro na distribuição de leads:", error);
    throw error;
  }
}

/**
 * Valida as entradas do formulário
 * @param {number|string} quantidade - Quantidade informada
 * @param {Array<string>} vendedoresSelecionados - Vendedores selecionados
 * @returns {Object} Objeto com validação e mensagem
 */
function validarEntradas(quantidade, vendedoresSelecionados) {
  // Validar quantidade
  const qtd = Number(quantidade);
  if (isNaN(qtd) || qtd <= 0 || !Number.isInteger(qtd)) {
    return {
      valido: false,
      mensagem: "Quantidade inválida. Informe um número inteiro maior que zero."
    };
  }

  // Validar vendedores
  if (!vendedoresSelecionados || !Array.isArray(vendedoresSelecionados) || vendedoresSelecionados.length === 0) {
    return {
      valido: false,
      mensagem: "Nenhum vendedor selecionado. Selecione pelo menos um vendedor."
    };
  }

  // Verificar se os vendedores existem dinamicamente
  const vendedoresDisponiveis = obterVendedoresDisponiveis();
  const nomesVendedoresDisponiveis = vendedoresDisponiveis.map(v => v.nome);
  const vendedoresInvalidos = vendedoresSelecionados.filter(v => !nomesVendedoresDisponiveis.includes(v));
  
  if (vendedoresInvalidos.length > 0) {
    return {
      valido: false,
      mensagem: "Vendedores inválidos ou não encontrados: " + vendedoresInvalidos.join(", ")
    };
  }

  return { valido: true, mensagem: "" };
}

/**
 * Verifica se as abas dos vendedores existem
 * Usa listagem dinâmica de vendedores
 * @param {Array<string>} vendedoresSelecionados - Vendedores selecionados
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss - Planilha ativa
 * @returns {Array<string>} Array com vendedores válidos (com abas existentes)
 */
function verificarVendedores(vendedoresSelecionados, ss) {
  const vendedoresValidos = [];
  const vendedoresDisponiveis = obterVendedoresDisponiveis();
  const nomesVendedoresDisponiveis = vendedoresDisponiveis.map(v => v.nome);
  
  for (const vendedor of vendedoresSelecionados) {
    // Verificar se o vendedor existe na listagem dinâmica
    if (nomesVendedoresDisponiveis.includes(vendedor)) {
      // Verificar se a aba realmente existe
      const aba = ss.getSheetByName(vendedor);
      if (aba) {
        vendedoresValidos.push(vendedor);
      } else {
        console.warn("Aba não encontrada para vendedor:", vendedor);
      }
    } else {
      console.warn("Vendedor não encontrado na listagem:", vendedor);
    }
  }
  
  return vendedoresValidos;
}

/**
 * Obtém os leads disponíveis (sem responsável atribuído)
 * @param {GoogleAppsScript.Spreadsheet.Sheet} base - Aba base
 * @returns {Array<Object>} Array de objetos com informações dos leads
 */
function obterLeadsDisponiveis(base) {
  const ultimaLinha = base.getLastRow();
  
  if (ultimaLinha <= 1) {
    return []; // Sem dados além do cabeçalho
  }

  const dados = base.getRange(2, 1, ultimaLinha - 1, base.getLastColumn()).getValues();
  const leadsDisponiveis = [];

  for (let i = 0; i < dados.length; i++) {
    // Coluna E (índice 4) = Responsável
    const responsavel = dados[i][CONFIG.COLUNA_RESPONSAVEL - 1];
    
    if (!responsavel || responsavel.toString().trim() === "") {
      leadsDisponiveis.push({
        linha: i + 2, // +2 porque começamos na linha 2 (pós cabeçalho)
        dados: dados[i]
      });
    }
  }

  return leadsDisponiveis;
}

/**
 * Distribui leads de forma balanceada entre os vendedores
 * @param {GoogleAppsScript.Spreadsheet.Sheet} base - Aba base
 * @param {Array<Object>} leadsDisponiveis - Leads disponíveis
 * @param {Array<string>} vendedores - Vendedores selecionados
 * @param {number} quantidadePorVendedor - Quantidade por vendedor
 * @returns {Object} Estatísticas da distribuição
 */
function distribuirLeadsBalanceado(base, leadsDisponiveis, vendedores, quantidadePorVendedor) {
  const estatisticas = {};
  const totalNecessario = quantidadePorVendedor * vendedores.length;
  const totalDisponivel = leadsDisponiveis.length;
  const totalDistribuir = Math.min(totalNecessario, totalDisponivel);

  // Inicializar estatísticas
  vendedores.forEach(vendedor => {
    estatisticas[vendedor] = 0;
  });

  // Distribuir de forma round-robin (balanceada)
  let indiceLead = 0;
  let indiceVendedor = 0;
  const atualizacoes = [];

  while (indiceLead < totalDistribuir && indiceLead < leadsDisponiveis.length) {
    const lead = leadsDisponiveis[indiceLead];
    const vendedor = vendedores[indiceVendedor];

    // Atualizar o lead
    lead.dados[CONFIG.COLUNA_RESPONSAVEL - 1] = vendedor;
    atualizacoes.push({
      linha: lead.linha,
      dados: lead.dados
    });

    estatisticas[vendedor]++;
    indiceLead++;

    // Próximo vendedor (round-robin)
    indiceVendedor = (indiceVendedor + 1) % vendedores.length;
  }

  // Aplicar atualizações na planilha de forma eficiente usando função utilitária
  if (atualizacoes.length > 0) {
    const mapaAtualizacoes = {};
    atualizacoes.forEach(upd => {
      mapaAtualizacoes[upd.linha] = upd.dados[CONFIG.COLUNA_RESPONSAVEL - 1];
    });

    // Usar função utilitária para atualização em lote
    atualizarColunaEmLote(base, CONFIG.COLUNA_RESPONSAVEL, mapaAtualizacoes, 2);
  }

  return {
    totalDisponivel: totalDisponivel,
    totalDistribuido: indiceLead,
    totalNecessario: totalNecessario,
    porVendedor: estatisticas
  };
}

/**
 * Formata mensagem de sucesso com estatísticas
 * @param {Object} resultado - Resultado da distribuição
 * @returns {string} Mensagem formatada
 */
function formatarMensagemSucesso(resultado) {
  let mensagem = "Distribuição concluída com sucesso!\n\n";
  mensagem += "Total distribuído: " + resultado.totalDistribuido + " leads\n";
  mensagem += "Total disponível: " + resultado.totalDisponivel + " leads\n\n";
  mensagem += "Distribuição por vendedor:\n";
  
  for (const [vendedor, quantidade] of Object.entries(resultado.porVendedor)) {
    mensagem += "• " + vendedor + ": " + quantidade + " leads\n";
  }

  if (resultado.totalDistribuido < resultado.totalNecessario) {
    mensagem += "\n⚠ Atenção: Nem todos os leads solicitados puderam ser distribuídos.\n";
    mensagem += "Não há leads suficientes disponíveis.";
  }

  return mensagem;
}

