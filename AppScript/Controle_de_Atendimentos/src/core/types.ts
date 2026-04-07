/**
 * Sistema de Controle de Atendimentos - Tipagens Nucleares
 */

export namespace Core {
  export interface Atendimento {
    id: number;
    data: Date;
    telefone: string;
    nomeCliente: string;
    atendente: string;
    tipo: string;
    horaChegada: string;
    setor?: string;
  }

  export interface Config {
    SHEETS: {
      FORM: string;
      DADOS: string;
      INDICADORES: string;
    };
    MENSAGENS: {
      SUCESSO_REGISTRO: string;
      ERRO_REGISTRO: string;
      CAMPOS_OBRIGATORIOS: string;
      SETOR_INVALIDO: string;
      DATA_INVALIDA: string;
      REGISTRO_SALVO: string;
      ERRO_CALENDARIO: string;
    };
    FORM: {
      CAMPOS_OBRIGATORIOS: number;
    };
  }
}

export interface ISpreadsheetRepository {
  obterAba(nome: string): GoogleAppsScript.Spreadsheet.Sheet;
  registrarAtendimento(atendimento: Core.Atendimento): void;
  proximoId(): number;
}

export interface ICalendarService {
  criarEvento(atendimento: Core.Atendimento): void;
}
