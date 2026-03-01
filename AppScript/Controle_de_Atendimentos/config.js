/**
 * Configurações e Constantes do Sistema de Controle de Atendimentos
 * 
 * Este arquivo contém todas as constantes e configurações do sistema
 */

// ================================
// CONSTANTES E CONFIGURAÇÕES
// ================================

/**
 * Mapeamento de e-mails por setor
 * @type {Object<string, Array<string>>}
 */
const EMAILS_POR_SETOR = {
  'Administrativo': ['admin.centro@ccbeu.org'],
  'Pedagógico': ['pedagogico@ccbeu.org'],
  'TI': ['ti.centro@ccbeu.org'],
  'Comercial': ['henrique.cardoso@ccbeu.org'],
  'Unicid': [
    'unicid.luiza@ccbeu.org',
    'loren.moreno@ccbeu.org',
    'renata.azzola@ccbeu.org',
    'eduardo.tadeu@ccbeu.org',
    'atendimento.monica@ccbeu.org'
  ],
  'Presidência': ['edsonxavier@ccbeu.org'],
  'Espro': [
    'priscila.amaral@ccbeu.org',
    'priscila.amaral@espro.org.br',
    'fabiola.campos@espro.org.br'
  ]
};

/**
 * Configurações do sistema
 * @type {Object}
 */
const CONFIG = {
  // Nomes das abas
  SHEETS: {
    FORM: 'Form',
    DADOS: 'Dados',
    DASHBOARD: 'Dashboard'
  },
  
  // Configurações do formulário
  FORM: {
    LINHA_DADOS: 2,
    COLUNA_INICIAL: 1,
    COLUNA_FINAL: 13, // Coluna M
    CAMPOS_OBRIGATORIOS: 7 // Primeiros 7 campos são obrigatórios
  },
  
  // Configurações dos dados
  DADOS: {
    LINHA_CABECALHO: 1,
    COLUNA_ID: 4, // Coluna D
    TOTAL_COLUNAS: 13
  },
  
  // Configurações do dashboard
  DASHBOARD: {
    LINHA_INICIAL: 2,
    COLUNA_STATUS: 2,
    COLUNA_TIPO: 5,
    COLUNA_QUANTIDADE: 6,
    RANGE_TIPOS: 'E2:F100'
  },
  
  // Status válidos
  STATUS: {
    EM_ESPERA: 'Em Espera',
    EM_ATENDIMENTO: 'Em Atendimento',
    FINALIZADO: 'Finalizado'
  },
  
  // Configurações do calendário
  CALENDAR: {
    DURACAO_MINUTOS: 30,
    FORMATO_DATA: "yyyy-MM-dd",
    FORMATO_HORA: "HH:mm:ss"
  },
  
  // Mensagens do sistema
  MENSAGENS: {
    FORM_PRONTO: 'Formulário pronto para novo atendimento.',
    CAMPOS_OBRIGATORIOS: 'Por favor, preencha todos os campos obrigatórios até "Hora de Chegada".',
    REGISTRO_SALVO: 'Registro salvo, mas notificação cancelada.',
    SETOR_INVALIDO: 'Setor inválido. Registro salvo, mas notificação não enviada.',
    DATA_INVALIDA: 'Data ou Hora de Chegada inválidas. Registro salvo, mas evento não foi criado.',
    SUCESSO_REGISTRO: '✅ Atendimento registrado e notificação enviada com sucesso!',
    SEM_DADOS: 'Nenhum dado registrado para atualizar o dashboard.',
    SUCESSO_DASHBOARD: '✅ Dashboard atualizado com sucesso!',
    ERRO_SHEET: 'Erro: Não foi possível acessar a aba "{aba}".',
    ERRO_REGISTRO: 'Erro ao registrar atendimento. Verifique o console para mais detalhes.',
    ERRO_CALENDARIO: 'Erro ao criar evento no calendário. Verifique o console para mais detalhes.',
    ERRO_DASHBOARD: 'Erro ao atualizar dashboard. Verifique o console para mais detalhes.'
  }
};

