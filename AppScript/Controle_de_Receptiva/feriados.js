/**
 * Lógica de Feriados e Cálculo de Dias Úteis
 * 
 * Este arquivo contém todas as funções relacionadas a feriados e cálculo de dias úteis
 */

// ================================
// FUNÇÕES DE FERIADOS E DIAS ÚTEIS
// ================================

/**
 * Obtém a lista de feriados do ano especificado
 * @param {number} ano - Ano
 * @returns {Set<number>} Set com timestamps dos feriados
 */
function obterFeriados(ano) {
  if (!ano || isNaN(ano)) {
    console.warn("Ano inválido para obter feriados");
    return new Set();
  }
  
  try {
    const options = {
      'method': 'get',
      'muteHttpExceptions': true,
      'followRedirects': true
    };
    
    const response = UrlFetchApp.fetch(CONFIG.HOLIDAYS_API, options);
    
    if (response.getResponseCode() !== 200) {
      throw new Error(`HTTP ${response.getResponseCode()}: ${response.getContentText()}`);
    }
    
    const conteudo = response.getContentText();
    if (!conteudo || conteudo.trim() === "") {
      throw new Error("Resposta vazia da API de feriados");
    }
    
    const feriadosJson = JSON.parse(conteudo);
    
    if (!Array.isArray(feriadosJson)) {
      throw new Error("Formato de resposta inválido da API");
    }
    
    const feriados = feriadosJson
      .filter(item => item && (item.date || item.variableDates))
      .map(item => {
        try {
          const dataStr = item.variableDates?.[ano] || item.date;
          if (!dataStr) return null;
          
          const partes = dataStr.split('/');
          if (partes.length !== 3) return null;
          
          const dia = parseInt(partes[0], 10);
          const mes = parseInt(partes[1], 10) - 1;
          
          if (isNaN(dia) || isNaN(mes)) return null;
          
          const data = new Date(ano, mes, dia);
          return data.setHours(0, 0, 0, 0);
        } catch (error) {
          console.warn("Erro ao processar feriado:", item, error);
          return null;
        }
      })
      .filter(timestamp => timestamp !== null);
    
    console.log(`Feriados obtidos: ${feriados.length} para o ano ${ano}`);
    return new Set(feriados);
    
  } catch (error) {
    console.warn(MENSAGENS.ERRO_FERIADOS, error);
    return new Set();
  }
}

/**
 * Calcula os dias úteis do mês (exclui domingos e feriados)
 * @param {number} mes - Número do mês (1-12)
 * @param {number} ano - Ano
 * @param {Set<number>} feriados - Set de feriados
 * @returns {Array<Object>} Array com informações dos dias úteis
 */
function calcularDiasUteis(mes, ano, feriados) {
  if (!mes || !ano || mes < 1 || mes > 12) {
    console.error("Parâmetros inválidos para calcular dias úteis");
    return [];
  }
  
  if (!feriados) {
    feriados = new Set();
  }
  
  const diasNoMes = new Date(ano, mes, 0).getDate();
  const diasUteis = [];
  const timezone = Session.getScriptTimeZone();
  
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const data = new Date(ano, mes - 1, dia);
    
    // Validar se a data é válida
    if (isNaN(data.getTime())) {
      console.warn(`Data inválida: ${dia}/${mes}/${ano}`);
      continue;
    }
    
    const diaSemana = data.getDay();
    const timestamp = new Date(data).setHours(0, 0, 0, 0);
    
    // Pular domingos e feriados
    if (diaSemana === CONFIG.DOMINGO || feriados.has(timestamp)) {
      continue;
    }
    
    const dataFormatada = Utilities.formatDate(
      new Date(timestamp),
      timezone,
      "dd/MM/yyyy"
    );
    
    diasUteis.push({
      dia,
      data: new Date(data),
      timestamp,
      dataFormatada
    });
  }
  
  return diasUteis;
}

