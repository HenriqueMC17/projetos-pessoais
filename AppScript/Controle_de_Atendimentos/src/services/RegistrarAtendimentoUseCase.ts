import { Core, ISpreadsheetRepository, ICalendarService } from "../core/types";
import { Validacoes } from "../core/domain";

export class RegistrarAtendimentoUseCase {
  constructor(
    private repository: ISpreadsheetRepository,
    private calendar: ICalendarService,
    private config: Core.Config
  ) {}

  executar(atendimento: Core.Atendimento): { sucesso: boolean; mensagem: string } {
    // 1. Validar dados obrigatórios
    if (!Validacoes.validarCampoObrigatorio(atendimento.nomeCliente) || 
        !Validacoes.validarCampoObrigatorio(atendimento.data)) {
      return { sucesso: false, mensagem: this.config.MENSAGENS.CAMPOS_OBRIGATORIOS };
    }

    try {
      // 2. Persistir no Spreadsheet
      this.repository.registrarAtendimento(atendimento);

      // 3. Criar evento no calendário (se setor informado)
      if (atendimento.setor) {
        this.calendar.criarEvento(atendimento);
      }

      return { sucesso: true, mensagem: this.config.MENSAGENS.SUCESSO_REGISTRO };
    } catch (error: any) {
      console.error("Erro no Use Case RegistrarAtendimento:", error);
      return { sucesso: false, mensagem: `${this.config.MENSAGENS.ERRO_REGISTRO}: ${error.message}` };
    }
  }
}
