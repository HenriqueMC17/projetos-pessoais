import { Core, ICalendarService } from "../core/types";

export class CalendarService implements ICalendarService {
  criarEvento(atendimento: Core.Atendimento): void {
    if (!atendimento.data || !atendimento.horaChegada) return;

    // Lógica simplificada de parsing (em um sistema real seria mais robusto)
    const dataHora = new Date(atendimento.data);
    const [horas, minutos] = atendimento.horaChegada.toString().split(':').map(Number);
    dataHora.setHours(horas, minutos || 0);

    const dataFim = new Date(dataHora);
    dataFim.setMinutes(dataFim.getMinutes() + 30); // Duração padrão 30min

    const titulo = `Atendimento: ${atendimento.nomeCliente}`;
    const descricao = `Cliente: ${atendimento.nomeCliente}\nTelefone: ${atendimento.telefone}\nAtendente: ${atendimento.atendente}\nSetor: ${atendimento.setor}`;

    CalendarApp.createEvent(titulo, dataHora, dataFim, {
      description: descricao
    });
  }
}
