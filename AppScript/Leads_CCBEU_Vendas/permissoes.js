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

    // Obter todos os vendedores disponíveis dinamicamente
    const vendedoresDisponiveis = obterVendedoresDisponiveis();

    const resultados = {
      sucesso: [],
      avisos: [],
      erros: []
    };

    // Processar cada vendedor dinamicamente
    vendedoresDisponiveis.forEach(vendedor => {
      try {
        const aba = ss.getSheetByName(vendedor.nomeAba);
        
        if (!aba) {
          resultados.avisos.push("Aba '" + vendedor.nomeAba + "' não encontrada. Pulando...");
          return;
        }

        // Determinar o e-mail do vendedor
        let emailVendedor = null;
        
        // 1. Tentar ler de Developer Metadata
        try {
          const metadados = aba.getDeveloperMetadata();
          const metaEmail = metadados.find(m => m.getKey() === "seller_email");
          if (metaEmail) {
            emailVendedor = metaEmail.getValue();
          }
        } catch (e) {
          console.warn("Erro ao buscar metadados para aba: " + vendedor.nomeAba, e);
        }

        // 2. Se não encontrar, tentar buscar por chave baseada no nome (ex: Jose -> jose em EMAILS)
        if (!emailVendedor) {
          const nomeLimpo = vendedor.nome.replace(/^Base_/, "").toLowerCase();
          if (EMAILS[nomeLimpo]) {
            emailVendedor = EMAILS[nomeLimpo];
          }
        }

        // 3. Se ainda não encontrar, tentar obter de proteções existentes (excluindo gestores)
        if (!emailVendedor) {
          try {
            const protecoesExistentes = aba.getProtections(SpreadsheetApp.ProtectionType.SHEET);
            if (protecoesExistentes.length > 0) {
              const editores = protecoesExistentes[0].getEditors();
              const gestores = [EMAILS.gestora, EMAILS.voce];
              const dono = ss.getOwner().getEmail();
              const editorVendedor = editores.find(e => !gestores.includes(e.getEmail()) && e.getEmail() !== dono);
              if (editorVendedor) {
                emailVendedor = editorVendedor.getEmail();
              }
            }
          } catch (e) {
            console.warn("Erro ao buscar editores antigos:", e);
          }
        }

        if (!emailVendedor) {
          resultados.avisos.push("Não foi possível determinar o e-mail para '" + vendedor.nomeAba + "'. Aba não alterada.");
          return;
        }

        // Verificar se já existe proteção
        let protecao = null;
        const protecoes = aba.getProtections(SpreadsheetApp.ProtectionType.SHEET);
        
        if (protecoes.length > 0) {
          // Usar proteção existente
          protecao = protecoes[0];
          resultados.avisos.push("Aba '" + vendedor.nomeAba + "' já estava protegida. Atualizando permissões...");
        } else {
          // Criar nova proteção
          protecao = aba.protect().setDescription("Proteção automática - " + vendedor.nome);
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
        const acessos = [emailVendedor, EMAILS.gestora, EMAILS.voce];
        acessos.forEach(email => {
          try {
            protecao.addEditor(email);
          } catch (e) {
            resultados.avisos.push("Não foi possível adicionar " + email + " à aba '" + vendedor.nomeAba + "': " + e.message);
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

        resultados.sucesso.push(vendedor.nomeAba + " - " + vendedor.nome);

      } catch (error) {
        console.error("Erro ao processar aba " + vendedor.nomeAba + ":", error);
        resultados.erros.push(vendedor.nomeAba + ": " + error.message);
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

