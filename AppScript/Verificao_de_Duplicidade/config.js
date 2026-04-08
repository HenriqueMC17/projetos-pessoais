/**
 * Configurações e Constantes do Sistema de Verificação de Duplicidade
 * 
 * Este arquivo contém todas as constantes e configurações do sistema
 */

// ================================
// CONSTANTES E CONFIGURAÇÕES
// ================================

/**
 * Configurações do sistema
 * @type {Object}
 */
const CONFIG = Object.freeze({
  MENU_TITLE: "Utilitários",
  MENU_ITEM: "Verificar Duplicados",
  MENU_FUNCTION: "verificarDuplicadosManual",
  
  // Colunas da planilha (1-based)
  COLUNA_VALOR: 4,      // Coluna D
  COLUNA_RESPONSAVEL: 3, // Coluna C
  
  // Linha inicial para verificação
  LINHA_INICIAL: 392,
  
  // Cores para marcação visual
  CORES: {
    DUPLICADO_MANUAL: "#f4cccc",    // Vermelho claro (verificação manual)
    DUPLICADO_EDIT: "#fff2cc"        // Amarelo claro (edição em tempo real)
  },
  
  // Mensagens do sistema
  MENSAGENS: {
    ERRO_SHEET: "Erro: Não foi possível acessar a planilha ativa.",
    ERRO_VERIFICACAO: "Erro ao verificar duplicados. Verifique o console para mais detalhes.",
    SEM_DUPLICADOS: "Nenhum valor duplicado foi encontrado na coluna D.",
    RESPONSAVEL_NAO_INFORMADO: "(responsável não informado)",
    TITULO_DUPLICADOS: "Atenção: valores duplicados encontrados",
    TITULO_DUPLICADO_EDIT: "Aviso: Valor duplicado detectado",
    NOTA_DUPLICADO: "Duplicado de linha {linha}.",
    ERRO_INICIALIZACAO: "Erro ao inicializar o sistema de verificação de duplicidade.",
    SEM_DADOS: "Nenhum dado encontrado para verificação.",
    TITULO_VERIFICACAO: "Verificação Concluída"
  }
});

