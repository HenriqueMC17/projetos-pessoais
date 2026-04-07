import { Core } from "./types";

/**
 * Validações de domínio (independentes de Google APIs)
 */
export const Validacoes = {
  validarCampoObrigatorio(valor: any): boolean {
    return valor !== null && valor !== undefined && valor.toString().trim() !== "";
  },

  validarData(data: any): boolean {
    if (!data) return false;
    const d = new Date(data);
    return !isNaN(d.getTime());
  }
};
