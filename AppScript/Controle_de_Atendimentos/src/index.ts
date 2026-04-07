import { Core } from "./core/types";
import { SpreadsheetRepository } from "./infrastructure/SpreadsheetRepository";
import { CalendarService } from "./infrastructure/CalendarService";
import { RegistrarAtendimentoUseCase } from "./services/RegistrarAtendimentoUseCase";

// Configuração injetada (pode vir de um arquivo JSON centralizado no futuro)
const CONFIG: Core.Config = {
  SHEETS: {
    FORM: "Formulário",
    DADOS: "Base_Dados",
    INDICADORES: "Dashboard"
  },
  MENSAGENS: {
    SUCESSO_REGISTRO: "Atendimento registrado com sucesso!",
    ERRO_REGISTRO: "Erro ao registrar atendimento",
    CAMPOS_OBRIGATORIOS: "Por favor, preencha todos os campos obrigatórios.",
    SETOR_INVALIDO: "Setor não reconhecido.",
    DATA_INVALIDA: "Data ou hora inválida.",
    REGISTRO_SALVO: "Atendimento salvo (sem calendário).",
    ERRO_CALENDARIO: "Erro ao sincronizar com o calendário."
  },
  FORM: {
    CAMPOS_OBRIGATORIOS: 3
  }
};

/**
 * Ponto de entrada global para o Google Apps Script
 */
export function registrarAtendimento() {
  const ui = SpreadsheetApp.getUi();
  const repo = new SpreadsheetRepository(CONFIG);
  const calendar = new CalendarService();
  const useCase = new RegistrarAtendimentoUseCase(repo, calendar, CONFIG);

  try {
    const formSheet = repo.obterAba(CONFIG.SHEETS.FORM);
    // Lógica de leitura do formulário (simplificada para o PoC)
    const [data, telefone, nomeCliente] = formSheet.getRange("B2:B4").getValues().flat();
    const [atendente, tipo, hora] = formSheet.getRange("B6:B8").getValues().flat();

    const atendimento: Core.Atendimento = {
      id: 0, // Será gerado pelo repositório
      data: data as Date,
      telefone: String(telefone),
      nomeCliente: String(nomeCliente),
      atendente: String(atendente),
      tipo: String(tipo),
      horaChegada: String(hora),
      setor: "Comercial" // Exemplo estático para o PoC
    };

    const resultado = useCase.executar(atendimento);
    ui.alert(resultado.sucesso ? "Sucesso" : "Erro", resultado.mensagem, ui.ButtonSet.OK);

  } catch (error: any) {
    ui.alert("Erro Fatal", error.message, ui.ButtonSet.OK);
  }
}
