/**
 * Gerenciamento de Calendário do Sistema de Controle de Atendimentos
 * 
 * Este arquivo contém todas as funções relacionadas ao calendário do Google
 */

// ================================
// FUNÇÕES DO CALENDÁRIO
// ================================

/**
 * Cria evento no calendário do Google
 * @param {Date} data - Data do atendimento
 * @param {Date} horaChegada - Hora de chegada
 * @param {string} setor - Setor responsável
 * @param {string} nomeCliente - Nome do cliente
 * @param {string} telefone - Telefone do cliente
 * @param {string} atendente - Nome do atendente
 * @param {string} tipo - Tipo de atendimento
 * @returns {void}
 * @throws {Error} Se houver erro ao criar evento
 */
function criarEventoCalendario(data, horaChegada, setor, nomeCliente, telefone, atendente, tipo) {
  try {
    const timezone = Session.getScriptTimeZone();
    const dataFormatada = Utilities.formatDate(data, timezone, CONFIG.CALENDAR.FORMATO_DATA);
    const horaFormatada = Utilities.formatDate(horaChegada, timezone, CONFIG.CALENDAR.FORMATO_HORA);
    
    const dataHoraInicio = new Date(`${dataFormatada}T${horaFormatada}`);
    
    // Validar se a data/hora é válida
    if (isNaN(dataHoraInicio.getTime())) {
      throw new Error("Data ou hora inválida");
    }
    
    const dataHoraFim = new Date(
      dataHoraInicio.getTime() + CONFIG.CALENDAR.DURACAO_MINUTOS * 60000
    );
    
    const titulo = `Atendimento - ${setor} - ${nomeCliente}`;
    const descricao = formatarDescricaoEvento(atendente, nomeCliente, telefone, setor, tipo);
    
    const calendar = CalendarApp.getDefaultCalendar();
    if (!calendar) {
      throw new Error("Calendário padrão não encontrado");
    }
    
    const emails = EMAILS_POR_SETOR[setor];
    calendar.createEvent(titulo, dataHoraInicio, dataHoraFim, {
      guests: emails.join(','),
      sendInvites: true,
      description: descricao
    });
    
    console.log(`Evento criado no calendário: ${titulo}`);
    
  } catch (error) {
    console.error("Erro ao criar evento no calendário:", error);
    throw error;
  }
}

/**
 * Formata a descrição do evento do calendário
 * @param {string} atendente - Nome do atendente
 * @param {string} nomeCliente - Nome do cliente
 * @param {string} telefone - Telefone do cliente
 * @param {string} setor - Setor responsável
 * @param {string} tipo - Tipo de atendimento
 * @returns {string} Descrição formatada
 */
function formatarDescricaoEvento(atendente, nomeCliente, telefone, setor, tipo) {
  return [
    `Atendente: ${atendente || 'Não informado'}`,
    `Cliente: ${nomeCliente}`,
    `Telefone: ${telefone || 'Não informado'}`,
    `Setor: ${setor}`,
    `Tipo: ${tipo || 'Não informado'}`
  ].join('\n');
}

