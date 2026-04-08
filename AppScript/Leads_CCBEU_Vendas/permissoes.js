/**
 * Gerenciamento de Permissões e Segurança
 * 
 * Este arquivo contém funções relacionadas a permissões e segurança das abas
 */

// ================================
// FUNÇÕES DE PERMISSÕES E SEGURANÇA
// ================================

/**
 * Aplica permissões de acesso às abas dos vendedores
 * Protege cada aba permitindo acesso apenas ao vendedor correspondente,
 * gestora e administrador
 */
function aplicarPermissoes() {
  try {
    const ss = obterPlanilhaAtiva();
    
    // Verificar se o usuário tem permissão para executar esta função
    // (apenas o dono da planilha ou administrador)
    const usuarioAtual = Session.getActiveUser().getEmail();
    if (usuarioAtual !== EMAILS.voce && usuarioAtual !== EMAILS.gestora) {
      const resposta = SpreadsheetApp.getUi().alert(
        "Atenção",
        "Esta função só pode ser executada por administradores.\n" +
        "Deseja continuar mesmo assim?",
        SpreadsheetApp.getUi().ButtonSet.YES_NO
      );
      
      if (resposta !== SpreadsheetApp.getUi().Button.YES) {
        return;
      }
    }

    // Definição das permissões por aba
    const configuracoes = [
      { 
        aba: "Base_Jose", 
        nomeVendedor: "Jose",
        acessos: [EMAILS.jose, EMAILS.gestora, EMAILS.voce] 
      },
      { 
        aba: "Base_Francine", 
        nomeVendedor: "Francine",
        acessos: [EMAILS.francine, EMAILS.gestora, EMAILS.voce] 
      },
      { 
        aba: "Base_Thayna", 
        nomeVendedor: "Thayna",
        acessos: [EMAILS.thayna, EMAILS.gestora, EMAILS.voce] 
      },
      { 
        aba: "Base_Natalia", 
        nomeVendedor: "Natalia",
        acessos: [EMAILS.natalia, EMAILS.gestora, EMAILS.voce] 
      }
    ];

    const resultados = {
      sucesso: [],
      avisos: [],
      erros: []
    };

    // Processar cada configuração
    configuracoes.forEach(cfg => {
      try {
        const aba = ss.getSheetByName(cfg.aba);
        
        if (!aba) {
          resultados.avisos.push("Aba '" + cfg.aba + "' não encontrada. Pulando...");
          return;
        }

        // Verificar se já existe proteção
        let protecao = null;
        const protecoes = aba.getProtections(SpreadsheetApp.ProtectionType.SHEET);
        
        if (protecoes.length > 0) {
          // Usar proteção existente
          protecao = protecoes[0];
          resultados.avisos.push("Aba '" + cfg.aba + "' já estava protegida. Atualizando permissões...");
        } else {
          // Criar nova proteção
          protecao = aba.protect().setDescription("Proteção automática - " + cfg.nomeVendedor);
        }

        // Remover todos os editores atuais
        const editoresAtuais = protecao.getEditors();
        editoresAtuais.forEach(editor => {
          try {
            protecao.removeEditor(editor);
          } catch (e) {
            console.warn("Erro ao remover editor:", editor, e);
          }
        });

        // Adicionar editores autorizados
        cfg.acessos.forEach(email => {
          try {
            protecao.addEditor(email);
          } catch (e) {
            resultados.avisos.push("Não foi possível adicionar " + email + " à aba '" + cfg.aba + "': " + e.message);
          }
        });

        // Garantir que o dono da planilha sempre tenha acesso
        const dono = ss.getOwner().getEmail();
        try {
          protecao.addEditor(dono);
        } catch (e) {
          // Dono já tem acesso, ignorar erro
        }

        // Remover ranges desprotegidos (proteger toda a aba)
        protecao.setUnprotectedRanges([]);

        // Ocultar aba para manter privacidade operacional
        if (!aba.isSheetHidden()) {
          aba.hideSheet();
        }

        resultados.sucesso.push(cfg.aba + " - " + cfg.nomeVendedor);

      } catch (error) {
        console.error("Erro ao processar aba " + cfg.aba + ":", error);
        resultados.erros.push(cfg.aba + ": " + error.message);
      }
    });

    // Exibir resultado detalhado
    let mensagem = "🔐 Gerenciamento de Permissões\n\n";
    
    if (resultados.sucesso.length > 0) {
      mensagem += "✅ Abas processadas com sucesso (" + resultados.sucesso.length + "):\n";
      resultados.sucesso.forEach(item => {
        mensagem += "   • " + item + "\n";
      });
      mensagem += "\n";
    }

    if (resultados.avisos.length > 0) {
      mensagem += "⚠️ Avisos (" + resultados.avisos.length + "):\n";
      resultados.avisos.forEach(aviso => {
        mensagem += "   • " + aviso + "\n";
      });
      mensagem += "\n";
    }

    if (resultados.erros.length > 0) {
      mensagem += "❌ Erros (" + resultados.erros.length + "):\n";
      resultados.erros.forEach(erro => {
        mensagem += "   • " + erro + "\n";
      });
      mensagem += "\n";
    }

    mensagem += "📋 Resumo:\n";
    mensagem += "   • Abas protegidas: " + resultados.sucesso.length + "\n";
    mensagem += "   • Avisos: " + resultados.avisos.length + "\n";
    mensagem += "   • Erros: " + resultados.erros.length + "\n\n";
    mensagem += "As abas foram ocultadas para manter a privacidade.";

    SpreadsheetApp.getUi().alert("Permissões Aplicadas", mensagem, SpreadsheetApp.getUi().ButtonSet.OK);

  } catch (error) {
    ErrorHandler.handle(error, "Erro ao aplicar permissões");
  }
}

