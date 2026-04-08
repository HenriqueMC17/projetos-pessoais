/**
 * Funções de Auditoria dos Leads
 * 
 * Este arquivo contém todas as funções relacionadas à auditoria e verificação de leads
 */

// ================================
// FUNÇÕES DE AUDITORIA
// ================================

/**
 * Abre a interface de auditoria dos leads
 * Exibe informações detalhadas sobre duplicados, divergências e inconsistências
 */
function abrirAuditoria() {
  try {
    const ss = obterPlanilhaAtiva();
    const base = obterAba(ss, CONFIG.SHEET_BASE_GERAL);
    
    if (!base) {
      SpreadsheetApp.getUi().alert(
        "Erro",
        "A planilha '" + CONFIG.SHEET_BASE_GERAL + "' não foi encontrada.\n" +
        "Por favor, verifique se a planilha existe.",
        SpreadsheetApp.getUi().ButtonSet.OK
      );
      return;
    }

    // Usar HTML inline para a interface de auditoria
    const htmlContent = obterHTMLAuditoria();
    const html = HtmlService.createHtmlOutput(htmlContent)
      .setWidth(900)
      .setHeight(700)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);

    SpreadsheetApp.getUi().showModalDialog(html, "🕵️ Auditoria dos Leads");

  } catch (error) {
    ErrorHandler.handle(error, "Ocorreu um erro ao abrir a auditoria");
  }
}

/**
 * Gera relatório de auditoria da base de leads
 * @param {GoogleAppsScript.Spreadsheet.Sheet} base - Aba base
 * @returns {Object} Objeto com estatísticas de auditoria
 */
function gerarRelatorioAuditoria(base) {
  const ultimaLinha = base.getLastRow();
  
  if (ultimaLinha <= 1) {
    return {
      totalLeads: 0,
      leadsAtribuidos: 0,
      leadsDisponiveis: 0,
      taxaDistribuicao: "0.0",
      porVendedor: {}
    };
  }

  const dados = base.getRange(2, 1, ultimaLinha - 1, base.getLastColumn()).getValues();
  const estatisticas = {
    totalLeads: dados.length,
    leadsAtribuidos: 0,
    leadsDisponiveis: 0,
    porVendedor: {}
  };

  // Inicializar contadores dos vendedores
  // Usar listagem dinâmica de vendedores
  const vendedoresDisponiveis = obterVendedoresDisponiveis();
  vendedoresDisponiveis.forEach(vendedor => {
    estatisticas.porVendedor[vendedor.nome] = 0;
  });

  // Processar cada lead
  dados.forEach(linha => {
    const responsavel = linha[CONFIG.COLUNA_RESPONSAVEL - 1];
    
    if (responsavel && responsavel.toString().trim() !== "") {
      estatisticas.leadsAtribuidos++;
      
      // Contar por vendedor
      const vendedor = responsavel.toString().trim();
      if (estatisticas.porVendedor.hasOwnProperty(vendedor)) {
        estatisticas.porVendedor[vendedor]++;
      } else {
        // Vendedor não reconhecido (pode ser um nome diferente)
        if (!estatisticas.porVendedor["Outros"]) {
          estatisticas.porVendedor["Outros"] = 0;
        }
        estatisticas.porVendedor["Outros"]++;
      }
    } else {
      estatisticas.leadsDisponiveis++;
    }
  });

  // Calcular taxa de distribuição
  const taxaDistribuicao = estatisticas.totalLeads > 0
    ? ((estatisticas.leadsAtribuidos / estatisticas.totalLeads) * 100).toFixed(1)
    : "0.0";

  return {
    totalLeads: estatisticas.totalLeads,
    leadsAtribuidos: estatisticas.leadsAtribuidos,
    leadsDisponiveis: estatisticas.leadsDisponiveis,
    taxaDistribuicao: taxaDistribuicao,
    porVendedor: estatisticas.porVendedor
  };
}

/**
 * Executa a auditoria completa dos leads
 * Verifica duplicados, divergências, inconsistências e dados faltantes
 * @returns {Object} Objeto com resultados da auditoria
 */
function executarAuditoria() {
  try {
    const ss = obterPlanilhaAtiva();
    const base = obterAba(ss, CONFIG.SHEET_BASE_GERAL);

    if (!base) {
      throw new Error("A planilha '" + CONFIG.SHEET_BASE_GERAL + "' não foi encontrada.");
    }

    // Usar listagem dinâmica de vendedores
    const vendedoresDisponiveis = obterVendedoresDisponiveis();
    const vendedores = vendedoresDisponiveis.map(v => v.nome);
    const numColunas = base.getLastColumn();
    const ultimaLinha = base.getLastRow();

    if (ultimaLinha <= 1) {
      return {
        duplicados: [],
        divergencias: [],
        semStatus: [],
        semPrimeiroContato: [],
        inconsistenciasDistribuicao: [],
        mensagem: "Nenhum dado encontrado na base."
      };
    }

    // Obter dados da base (colunas A até I, ou até a última coluna disponível)
    const colunasParaLer = Math.min(9, numColunas);
    const dadosBase = base.getRange(2, 1, ultimaLinha - 1, colunasParaLer).getValues();

    const resultados = {
      duplicados: [],
      divergencias: [],
      semStatus: [],
      semPrimeiroContato: [],
      inconsistenciasDistribuicao: []
    };

    const mapaBase = {};
    const indiceId = 0; // Coluna A (índice 0)
    const indiceVendedor = CONFIG.COLUNA_RESPONSAVEL - 1; // Coluna E (índice 4)
    const indiceStatus = 5; // Coluna F (índice 5)
    const indicePrimeiroContato = 6; // Coluna G (índice 6)

    // Processar dados da base
    dadosBase.forEach((linha, i) => {
      const id = linha[indiceId];
      const vendedorBase = linha[indiceVendedor];
      const statusBase = linha[indiceStatus];
      const primeiroContato = linha[indicePrimeiroContato];

      // Verificar duplicados por ID
      if (id) {
        const idStr = id.toString();
        if (!mapaBase[idStr]) {
          mapaBase[idStr] = [];
        }
        mapaBase[idStr].push(i + 2); // +2 porque começamos na linha 2
      }

      // Verificar dados faltantes
      if (!statusBase || statusBase.toString().trim() === "") {
        resultados.semStatus.push({ 
          id: id || "N/A", 
          linha: i + 2,
          vendedor: vendedorBase || "N/A"
        });
      }

      if (statusBase && statusBase.toString().trim() !== "" && 
          (!primeiroContato || primeiroContato.toString().trim() === "")) {
        resultados.semPrimeiroContato.push({ 
          id: id || "N/A", 
          linha: i + 2,
          vendedor: vendedorBase || "N/A",
          status: statusBase
        });
      }
    });

    // Identificar duplicados
    for (const id in mapaBase) {
      if (mapaBase[id].length > 1) {
        resultados.duplicados.push({ 
          id: id, 
          linhas: mapaBase[id].join(", "),
          quantidade: mapaBase[id].length
        });
      }
    }

    // Criar mapa de IDs da base para busca rápida
    const mapaBasePorId = new Map();
    dadosBase.forEach((linha, idx) => {
      const id = linha[indiceId];
      if (id) {
        mapaBasePorId.set(id.toString(), { dados: linha, indice: idx });
      }
    });

    // Comparar com abas dos vendedores (usando listagem dinâmica)
    vendedores.forEach(vendedor => {
      // O nome do vendedor é o mesmo nome da aba
      const nomeAba = vendedor;
      const aba = obterAba(ss, nomeAba);

      if (!aba) {
        console.warn("Aba não encontrada para vendedor:", vendedor, "(" + nomeAba + ")");
        return;
      }

      const ultimaLinhaAba = aba.getLastRow();
      if (ultimaLinhaAba <= 1) {
        return; // Aba vazia
      }

      const numColunasAba = Math.min(9, aba.getLastColumn());
      const dadosAba = aba.getRange(2, 1, ultimaLinhaAba - 1, numColunasAba).getValues();

      dadosAba.forEach(linhaAba => {
        const id = linhaAba[0];
        if (!id) return; // Ignorar linhas sem ID

        // Buscar correspondência na base usando Map (mais rápido que find)
        const baseInfoMap = mapaBasePorId.get(id.toString());
        if (!baseInfoMap) {
          return; // Lead não encontrado na base (pode ser normal)
        }

        const baseInfo = baseInfoMap.dados;

        const statusBase = baseInfo[indiceStatus];
        const statusVendedor = linhaAba[8]; // Coluna I (índice 8) na aba do vendedor
        const dataContatoVendedor = linhaAba[5]; // Coluna F (índice 5) na aba do vendedor
        const vendedorBase = baseInfo[indiceVendedor];

        // Verificar divergência de status
        if (statusBase && statusVendedor && 
            statusBase.toString().trim() !== "" && 
            statusVendedor.toString().trim() !== "" &&
            statusBase.toString().trim() !== statusVendedor.toString().trim()) {
          resultados.divergencias.push({
            id: id,
            vendedor: vendedor,
            base: statusBase.toString().trim(),
            vendedorStatus: statusVendedor.toString().trim()
          });
        }

        // Verificar inconsistência de distribuição
        if (vendedorBase && vendedorBase.toString().trim() !== "" &&
            vendedorBase.toString().trim() !== vendedor) {
          resultados.inconsistenciasDistribuicao.push({
            id: id,
            vendedorCorreto: vendedorBase.toString().trim(),
            vendedorErrado: vendedor,
            statusBase: statusBase ? statusBase.toString().trim() : "N/A"
          });
        }
      });
    });

    return resultados;

  } catch (error) {
    console.error("Erro ao executar auditoria:", error);
    throw error;
  }
}

