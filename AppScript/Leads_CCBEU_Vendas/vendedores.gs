/**
 * Gerenciamento de Vendedores
 * 
 * Este arquivo contém todas as funções relacionadas ao cadastro, edição e remoção de vendedores
 */

// ================================
// FUNÇÕES DE LISTAGEM DE VENDEDORES
// ================================

/**
 * Obtém lista dinâmica de vendedores disponíveis para distribuição
 * 
 * Esta função busca todas as abas da planilha que não são abas do sistema
 * (como Base_Geral) e as retorna como vendedores disponíveis.
 * 
 * Vantagens:
 * - Listagem sempre atualizada automaticamente
 * - Novos vendedores aparecem imediatamente após cadastro
 * - Vendedores removidos desaparecem automaticamente
 * - Não requer manutenção manual do objeto VENDEDORES
 * 
 * @returns {Array<Object>} Array de objetos com:
 *   - nome: Nome do vendedor (nome da aba)
 *   - nomeAba: Nome da aba (mesmo que nome)
 *   - visivel: Boolean indicando se a aba está visível
 */
function obterVendedoresDisponiveis() {
  try {
    const ss = obterPlanilhaAtiva();
    const todasAbas = ss.getSheets();
    const vendedores = [];
    
    // Filtrar abas que não são a Base_Geral e outras abas do sistema
    const abasExcluidas = [CONFIG.SHEET_BASE_GERAL];
    
    todasAbas.forEach(aba => {
      const nomeAba = aba.getName();
      
      // Ignorar abas do sistema
      if (abasExcluidas.includes(nomeAba)) {
        return;
      }
      
      // Adicionar vendedor à lista
      vendedores.push({
        nome: nomeAba,
        nomeAba: nomeAba,
        visivel: !aba.isSheetHidden()
      });
    });
    
    // Ordenar alfabeticamente para melhor organização
    vendedores.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    
    console.log("Vendedores disponíveis encontrados:", vendedores.length);
    return vendedores;
    
  } catch (error) {
    console.error("Erro ao obter vendedores disponíveis:", error);
    return [];
  }
}

/**
 * Obtém apenas os nomes dos vendedores (para compatibilidade)
 * @returns {Array<string>} Array com nomes dos vendedores
 */
function obterNomesVendedores() {
  const vendedores = obterVendedoresDisponiveis();
  return vendedores.map(v => v.nome);
}

// ================================
// FUNÇÕES DE CADASTRO DE VENDEDORES
// ================================

/**
 * Abre a interface de cadastro de novo vendedor
 */
function abrirCadastroVendedor() {
  try {
    // Usar HTML inline para a interface de cadastro
    const htmlContent = obterHTMLCadastroVendedor();
    const html = HtmlService.createHtmlOutput(htmlContent)
      .setWidth(450)
      .setHeight(300)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);

    SpreadsheetApp.getUi().showModalDialog(html, "➕ Cadastrar Novo Vendedor");
  } catch (error) {
    console.error("Erro ao abrir cadastro de vendedor:", error);
    SpreadsheetApp.getUi().alert(
      "Erro",
      "Ocorreu um erro ao abrir o cadastro de vendedor:\n\n" + error.message,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * Cadastra um novo vendedor no sistema
 * @param {string} nome - Nome do vendedor
 * @param {string} email - E-mail do vendedor
 * @returns {string} Mensagem de sucesso
 */
function cadastrarVendedor(nome, email) {
  try {
    // Validações usando funções utilitárias
    validarCampoObrigatorio(nome, "Nome do vendedor");
    validarCampoObrigatorio(email, "E-mail do vendedor");
    validarEmail(email);

    const ss = obterPlanilhaAtiva();
    const nomeNormalizado = nome.trim();
    const emailNormalizado = email.trim().toLowerCase();

    // Verificar se já existe uma aba com este nome
    const abaExistente = obterAba(ss, nomeNormalizado);
    
    if (abaExistente) {
      throw new Error("Já existe uma aba com o nome '" + nomeNormalizado + "'. Escolha outro nome.");
    }

    // 1. Criar nova aba (visível por padrão)
    const novaAba = ss.insertSheet(nomeNormalizado);

    // 2. Criar cabeçalho padrão obrigatório conforme especificação
    const headers = [
      "ID", 
      "Nome", 
      "Telefone (DDD+Número)", 
      "Cidade", 
      "Vendedor_Responsável", 
      "Status", 
      "Data_Primeiro_Contato", 
      "Data_Retorno", 
      "Observações"
    ];

    novaAba.getRange(1, 1, 1, headers.length).setValues([headers]);
    novaAba.setFrozenRows(1);

    // 3. Formatação corporativa profissional
    const rangeCabecalho = novaAba.getRange(1, 1, 1, headers.length);
    rangeCabecalho
      .setBackground("#003366")
      .setFontColor("#FFFFFF")
      .setFontWeight("bold")
      .setFontSize(11)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle")
      .setWrap(true);

    // Ajustar largura das colunas automaticamente
    novaAba.autoResizeColumns(1, headers.length);
    
    // Garantir altura mínima para o cabeçalho
    novaAba.setRowHeight(1, 30);

    // 4. Aplicar proteção exclusiva
    const protecao = novaAba.protect().setDescription("Proteção automática por vendedor");
    
    // Remover editores padrão primeiro
    const editoresAtuais = protecao.getEditors();
    editoresAtuais.forEach(editor => {
      try {
        protecao.removeEditor(editor);
      } catch (e) {
        console.warn("Erro ao remover editor:", e);
      }
    });
    
    // Adicionar editores autorizados
    protecao.addEditors([emailNormalizado, EMAILS.gestora, EMAILS.voce]);

    protecao.setUnprotectedRanges([]);

    // 5. Aba permanece VISÍVEL (não ocultar)
    // A aba será criada visível por padrão, permitindo acesso imediato

    // 6. Sincronizar com listagem de distribuição
    // A listagem será atualizada automaticamente na próxima abertura do diálogo
    console.log("Vendedor cadastrado: " + nomeNormalizado + " - Aba criada e visível");

    return "Vendedor cadastrado com sucesso!\n\nA aba '" + nomeNormalizado + "' foi criada e está visível.";

  } catch (error) {
    console.error("Erro ao cadastrar vendedor:", error);
    throw error;
  }
}

/**
 * Abre a interface para renomear um vendedor
 */
function abrirRenomearVendedor() {
  try {
    // Usar HTML inline para a interface de renomear vendedor
    const htmlContent = obterHTMLRenomearVendedor();
    const html = HtmlService.createHtmlOutput(htmlContent)
      .setWidth(450)
      .setHeight(260)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);

    SpreadsheetApp.getUi().showModalDialog(html, "✏️ Renomear Vendedor");
  } catch (error) {
    console.error("Erro ao abrir renomear vendedor:", error);
    SpreadsheetApp.getUi().alert(
      "Erro",
      "Ocorreu um erro ao abrir a função de renomear vendedor:\n\n" + error.message,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * Renomeia um vendedor (renomeia a aba)
 * Atualiza automaticamente a listagem de distribuição
 * @param {string} antigo - Nome atual da aba
 * @param {string} novo - Novo nome da aba
 * @returns {string} Mensagem de sucesso ou erro
 */
function renomearVendedor(antigo, novo) {
  try {
    validarCampoObrigatorio(antigo, "Nome atual");
    validarCampoObrigatorio(novo, "Novo nome");

    const ss = obterPlanilhaAtiva();
    const aba = obterAba(ss, antigo.trim());

    if (!aba) return "Aba do vendedor não encontrada.";

    // Verificar se o novo nome já existe
    const abaComNovoNome = obterAba(ss, novo.trim());
    if (abaComNovoNome && abaComNovoNome.getName() !== antigo.trim()) {
      return "Já existe uma aba com o nome '" + novo.trim() + "'.";
    }

    const nomeAntigo = antigo.trim();
    const nomeNovo = novo.trim();
    
    // Atualizar referências na Base_Geral se necessário
    const base = obterAba(ss, CONFIG.SHEET_BASE_GERAL);
    if (base) {
      const ultimaLinha = base.getLastRow();
      if (ultimaLinha > 1) {
        const colunaResponsavel = CONFIG.COLUNA_RESPONSAVEL;
        const dados = base.getRange(2, colunaResponsavel, ultimaLinha - 1, 1).getValues();
        
        // Atualizar referências do nome antigo para o novo
        const atualizacoes = {};
        dados.forEach((linha, index) => {
          if (linha[0] && linha[0].toString().trim() === nomeAntigo) {
            atualizacoes[index + 2] = nomeNovo;
          }
        });
        
        if (Object.keys(atualizacoes).length > 0) {
          atualizarColunaEmLote(base, colunaResponsavel, atualizacoes, 2);
        }
      }
    }

    // Renomear a aba
    aba.setName(nomeNovo);
    
    console.log("Vendedor renomeado: " + nomeAntigo + " -> " + nomeNovo);
    return "Vendedor renomeado com sucesso.\n\nA listagem de distribuição será atualizada automaticamente.";

  } catch (error) {
    console.error("Erro ao renomear vendedor:", error);
    return "Erro ao renomear: " + error.message;
  }
}

/**
 * Abre a interface para remover um vendedor
 */
function abrirRemoverVendedor() {
  try {
    // Usar HTML inline para a interface de remover vendedor
    const htmlContent = obterHTMLRemoverVendedor();
    const html = HtmlService.createHtmlOutput(htmlContent)
      .setWidth(400)
      .setHeight(220)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);

    SpreadsheetApp.getUi().showModalDialog(html, "❌ Remover Vendedor");
  } catch (error) {
    console.error("Erro ao abrir remover vendedor:", error);
    SpreadsheetApp.getUi().alert(
      "Erro",
      "Ocorreu um erro ao abrir a função de remover vendedor:\n\n" + error.message,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * Remove um vendedor do sistema
 * Remove automaticamente da listagem de distribuição
 * @param {string} nome - Nome da aba do vendedor a ser removida
 * @returns {string} Mensagem de sucesso ou erro
 */
function removerVendedor(nome) {
  try {
    validarCampoObrigatorio(nome, "Nome da aba");

    const ss = obterPlanilhaAtiva();
    const aba = obterAba(ss, nome.trim());

    if (!aba) return "Vendedor não encontrado.";

    const nomeVendedor = nome.trim();

    // Limpar referências na Base_Geral antes de remover
    const base = obterAba(ss, CONFIG.SHEET_BASE_GERAL);
    if (base) {
      const ultimaLinha = base.getLastRow();
      if (ultimaLinha > 1) {
        const colunaResponsavel = CONFIG.COLUNA_RESPONSAVEL;
        const dados = base.getRange(2, colunaResponsavel, ultimaLinha - 1, 1).getValues();
        
        // Limpar referências do vendedor removido
        const atualizacoes = {};
        dados.forEach((linha, index) => {
          if (linha[0] && linha[0].toString().trim() === nomeVendedor) {
            atualizacoes[index + 2] = ""; // Limpar referência
          }
        });
        
        if (Object.keys(atualizacoes).length > 0) {
          atualizarColunaEmLote(base, colunaResponsavel, atualizacoes, 2);
          console.log("Referências do vendedor removidas da Base_Geral");
        }
      }
    }

    // Remover proteção
    const protecoes = aba.getProtections(SpreadsheetApp.ProtectionType.SHEET);
    protecoes.forEach(p => {
      try {
        p.remove();
      } catch (e) {
        console.warn("Erro ao remover proteção:", e);
      }
    });

    // Excluir aba
    ss.deleteSheet(aba);

    console.log("Vendedor removido: " + nomeVendedor);
    return "Vendedor removido com sucesso.\n\nA listagem de distribuição será atualizada automaticamente.";

  } catch (error) {
    console.error("Erro ao remover vendedor:", error);
    return "Erro ao remover: " + error.message;
  }
}

/**
 * Abre a interface para reatribuir leads de um vendedor inativo
 */
function abrirReatribuirVendedor() {
  try {
    // Usar HTML inline para a interface de reatribuir vendedor
    const htmlContent = obterHTMLReatribuirVendedor();
    const html = HtmlService.createHtmlOutput(htmlContent)
      .setWidth(450)
      .setHeight(260)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);

    SpreadsheetApp.getUi().showModalDialog(html, "🔄 Reatribuir Leads");
  } catch (error) {
    console.error("Erro ao abrir reatribuir vendedor:", error);
    SpreadsheetApp.getUi().alert(
      "Erro",
      "Ocorreu um erro ao abrir a função de reatribuir leads:\n\n" + error.message,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * Reatribui leads de um vendedor inativo para outro vendedor
 * @param {string} origem - Nome da aba do vendedor que saiu
 * @param {string} destino - Nome da aba do vendedor de destino
 * @returns {string} Mensagem de sucesso ou erro
 */
function reatribuirVendedor(origem, destino) {
  try {
    const ss = obterPlanilhaAtiva();
    const abaOrigem = obterAba(ss, origem);
    const abaDestino = obterAba(ss, destino);
    const base = obterAba(ss, CONFIG.SHEET_BASE_GERAL);

    if (!abaOrigem) return "Aba do vendedor que saiu não existe.";
    if (!abaDestino) return "Aba do vendedor de destino não existe.";
    if (!base) return "Aba Base_Geral não encontrada.";

    const ultimaLinhaOrigem = abaOrigem.getLastRow();
    if (ultimaLinhaOrigem <= 1) return "Nenhum lead para transferir.";

    const dadosOrigem = abaOrigem.getRange(2, 1, ultimaLinhaOrigem - 1, 9).getValues();

    if (dadosOrigem.length === 0) return "Nenhum lead para transferir.";

    // Criar mapa de IDs para busca rápida
    const idsOrigem = new Set();
    dadosOrigem.forEach(linha => {
      if (linha[0]) idsOrigem.add(linha[0].toString());
    });

    // Enviar leads para o destino em uma única operação
    const ultimaLinhaDestino = abaDestino.getLastRow();
    if (dadosOrigem.length > 0) {
      abaDestino.getRange(ultimaLinhaDestino + 1, 1, dadosOrigem.length, 9).setValues(dadosOrigem);
    }

    // Atualizar Base_Geral de forma otimizada
    const ultimaLinhaBase = base.getLastRow();
    if (ultimaLinhaBase > 1) {
      const dadosBase = base.getRange(2, 1, ultimaLinhaBase - 1, 6).getValues();
      const mapaAtualizacoes = {};

      dadosBase.forEach((linha, i) => {
        const id = linha[0];
        if (id && idsOrigem.has(id.toString())) {
          mapaAtualizacoes[i + 2] = destino;
        }
      });

      // Atualizar em lote
      if (Object.keys(mapaAtualizacoes).length > 0) {
        atualizarColunaEmLote(base, CONFIG.COLUNA_RESPONSAVEL, mapaAtualizacoes, 2);
      }
    }

    // Limpar aba antiga
    if (ultimaLinhaOrigem > 1) {
      abaOrigem.getRange(2, 1, ultimaLinhaOrigem - 1, 9).clearContent();
    }

    return "Leads reatribuídos com sucesso.";

  } catch (error) {
    console.error("Erro ao reatribuir vendedor:", error);
    return "Erro ao reatribuir leads: " + error.message;
  }
}

