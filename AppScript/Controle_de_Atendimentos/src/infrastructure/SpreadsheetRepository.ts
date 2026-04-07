import { Core, ISpreadsheetRepository } from "../core/types";

export class SpreadsheetRepository implements ISpreadsheetRepository {
  private ss: GoogleAppsScript.Spreadsheet.Spreadsheet;
  private config: Core.Config;

  constructor(config: Core.Config) {
    const activeSS = SpreadsheetApp.getActiveSpreadsheet();
    if (!activeSS) throw new Error("Nenhuma planilha ativa encontrada.");
    this.ss = activeSS;
    this.config = config;
  }

  obterAba(nome: string): GoogleAppsScript.Spreadsheet.Sheet {
    const aba = this.ss.getSheetByName(nome);
    if (!aba) throw new Error(`Aba ${nome} não encontrada.`);
    return aba;
  }

  registrarAtendimento(atendimento: Core.Atendimento): void {
    const dados = this.obterAba(this.config.SHEETS.DADOS);
    const proximoId = this.proximoId();
    
    // Conforme layout original: [data, telefone, nomeCliente, novoId, ...]
    dados.appendRow([
      atendimento.data,
      atendimento.telefone,
      atendimento.nomeCliente,
      proximoId,
      atendimento.atendente,
      atendimento.tipo,
      atendimento.horaChegada,
      atendimento.setor
    ]);
  }

  proximoId(): number {
    const dados = this.obterAba(this.config.SHEETS.DADOS);
    const ultimaLinha = dados.getLastRow();
    if (ultimaLinha <= 1) return 1;
    
    const ultimoId = dados.getRange(ultimaLinha, 4).getValue();
    return (Number(ultimoId) || 0) + 1;
  }
}
