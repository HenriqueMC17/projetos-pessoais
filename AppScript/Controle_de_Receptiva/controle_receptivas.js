/**
 * Sistema de Controle de Receptivas - Google Apps Script
 * 
 * ⚠️ ATENÇÃO: Este código foi modularizado para melhor organização e compreensão.
 * 
 * O sistema foi dividido nos seguintes arquivos:
 * 
 * 📁 ESTRUTURA MODULAR:
 * 
 * 1. config.js
 *    - Constantes e configurações do sistema
 *    - CONFIG, VENDEDORAS, CABECALHOS, MESES, MENSAGENS
 * 
 * 2. utils.js
 *    - Funções utilitárias reutilizáveis
 *    - obterOuCriarAba()
 * 
 * 3. menu.js
 *    - Menu e inicialização do sistema
 *    - onOpen(), gerarTabelasComPrompt()
 * 
 * 4. validacao.js
 *    - Funções de validação e entrada de dados
 *    - solicitarMes(), solicitarAno(), validarEntradas()
 * 
 * 5. feriados.js
 *    - Lógica de feriados e cálculo de dias úteis
 *    - obterFeriados(), calcularDiasUteis()
 * 
 * 6. tabelas.js
 *    - Geração de tabelas
 *    - gerarTabelasPorMesAno(), gerarTabelasDiasUteis(), criarTabelaDia()
 * 
 * 7. formatacao.js
 *    - Formatação e estilos
 *    - configurarAba(), adicionarBotaoAcao()
 * 
 * 📝 NOTA: No Google Apps Script, todos os arquivos .js/.gs são carregados automaticamente.
 * Não é necessário fazer imports ou includes. Apenas certifique-se de que todos os
 * arquivos estejam no mesmo projeto.
 * 
 * @author Sistema de Controle
 * @version 3.1 - Modularizado
 */

// Este arquivo foi mantido para referência histórica.
// Todo o código funcional foi movido para os arquivos modulares listados acima.
