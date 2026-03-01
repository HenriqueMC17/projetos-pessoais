/**
 * Sistema de Distribuição de Leads - Google Apps Script
 * 
 * ⚠️ ATENÇÃO: Este código foi modularizado para melhor organização e compreensão.
 * 
 * O sistema foi dividido nos seguintes arquivos:
 * 
 * 📁 ESTRUTURA MODULAR:
 * 
 * 1. config.gs
 *    - Constantes e configurações do sistema
 *    - CONFIG, EMAILS, VENDEDORES
 * 
 * 2. utils.gs
 *    - Funções utilitárias reutilizáveis
 *    - obterPlanilhaAtiva(), obterAba(), validarCampoObrigatorio(), etc.
 * 
 * 3. menu.gs
 *    - Menu e inicialização do sistema
 *    - onOpen(), abrirDialogDistribuicao()
 * 
 * 4. distribuicao.gs
 *    - Lógica de distribuição de leads
 *    - distribuirLeadsViaHTML(), obterLeadsDisponiveis(), distribuirLeadsBalanceado()
 * 
 * 5. permissoes.gs
 *    - Gerenciamento de permissões e segurança
 *    - aplicarPermissoes()
 * 
 * 6. auditoria.gs
 *    - Funções de auditoria e verificação
 *    - abrirAuditoria(), executarAuditoria(), gerarRelatorioAuditoria()
 * 
 * 7. vendedores.gs
 *    - Gerenciamento de vendedores
 *    - cadastrarVendedor(), renomearVendedor(), removerVendedor(), reatribuirVendedor()
 * 
 * 8. htmlTemplates.gs
 *    - Templates HTML para todas as interfaces
 *    - obterHTMLDialogo(), obterHTMLAuditoria(), obterHTMLCadastroVendedor(), etc.
 * 
 * 📝 NOTA: No Google Apps Script, todos os arquivos .gs são carregados automaticamente.
 * Não é necessário fazer imports ou includes. Apenas certifique-se de que todos os
 * arquivos estejam no mesmo projeto.
 * 
 * @author Sistema de Distribuição de Leads
 * @version 3.1 - Modularizado
 */

// Este arquivo foi mantido para referência histórica.
// Todo o código funcional foi movido para os arquivos modulares listados acima.
