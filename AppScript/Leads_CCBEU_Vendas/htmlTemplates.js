/**
 * Templates HTML para Interfaces do Sistema
 * 
 * Este arquivo contém todos os templates HTML usados nas interfaces do sistema
 */

// ================================
// TEMPLATES HTML
// ================================

/**
 * Retorna o conteúdo HTML do diálogo de distribuição
 * @returns {string} HTML completo do diálogo
 */
function obterHTMLDialogo() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base target="_top">
  <title>Distribuição de Leads</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
      padding: 16px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .container {
      width: 100%;
      max-width: 480px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
      padding: 24px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    h3 {
      font-size: 20px;
      font-weight: 700;
      color: #1e3a8a;
      text-align: center;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 2px dashed #e2e8f0;
    }
    .form-group {
      margin-bottom: 18px;
    }
    label {
      font-weight: 600;
      font-size: 13px;
      display: block;
      margin-bottom: 6px;
      color: #475569;
    }
    .input-field {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      color: inherit;
      transition: all 0.2s ease;
      background-color: #f8fafc;
    }
    .input-field:focus {
      outline: none;
      border-color: #3b82f6;
      background-color: #ffffff;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }
    .input-field.error {
      border-color: #ef4444;
      background-color: #fef2f2;
    }
    .error-message {
      color: #ef4444;
      font-size: 12px;
      margin-top: 4px;
      font-weight: 500;
      display: none;
    }
    .error-message.show {
      display: block;
    }
    .vendedores-list {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
      max-height: 200px;
      overflow-y: auto;
    }
    .vendedores-list label {
      font-weight: 500;
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      transition: background-color 0.2s;
    }
    .vendedores-list label:hover {
      background-color: #e2e8f0;
    }
    .vendedores-list label:last-child {
      margin-bottom: 0;
    }
    .vendedores-list input[type="checkbox"] {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      cursor: pointer;
      accent-color: #3b82f6;
    }
    .btn {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(29, 78, 216, 0.15);
      margin-top: auto;
    }
    .btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(29, 78, 216, 0.25);
    }
    .btn:active:not(:disabled) {
      transform: translateY(0);
    }
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .btn.loading {
      position: relative;
      color: transparent;
    }
    .btn.loading::after {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      top: 50%;
      left: 50%;
      margin-left: -8px;
      margin-top: -8px;
      border: 2px solid #ffffff;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .message {
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 16px;
      display: none;
      animation: fadeIn 0.3s ease;
      white-space: pre-line;
      line-height: 1.5;
      font-size: 13px;
      font-weight: 500;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .message.show {
      display: block;
    }
    .message.success {
      background-color: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }
    .message.error {
      background-color: #fef2f2;
      color: #991b1b;
      border: 1px solid #fca5a5;
    }
    .checkbox-group span {
      font-size: 13px;
      color: #334155;
    }
  </style>
</head>
<body>
  <div class="container">
    <h3>Distribuição de Leads</h3>
    <div id="message" class="message"></div>
    <div class="form-group">
      <label for="quantidade">Quantidade por vendedor:</label>
      <input type="number" id="quantidade" min="1" class="input-field" placeholder="Digite a quantidade" required>
      <div class="error-message" id="quantidade-error">
        Por favor, informe uma quantidade válida (mínimo 1).
      </div>
    </div>
    <div class="form-group" style="flex: 1; display: flex; flex-direction: column;">
      <label>Selecione os vendedores:</label>
      <div class="vendedores-list" id="vendedores-list" style="flex: 1;">
        <p style="text-align: center; color: #64748b; padding: 20px; font-size: 13px;">Carregando vendedores...</p>
      </div>
      <div class="error-message" id="vendedores-error">
        Por favor, selecione pelo menos um vendedor.
      </div>
    </div>
    <button class="btn" id="btnDistribuir" onclick="enviar()">Distribuir Leads</button>
  </div>
  <script>
    function mostrarMensagem(texto, tipo) {
      const messageDiv = document.getElementById('message');
      messageDiv.textContent = texto;
      messageDiv.className = 'message ' + tipo + ' show';
      if (tipo === 'error') {
        setTimeout(function() { messageDiv.classList.remove('show'); }, 5000);
      }
    }
    function validarFormulario() {
      let valido = true;
      const quantidade = document.getElementById("quantidade").value;
      const quantidadeError = document.getElementById("quantidade-error");
      const quantidadeInput = document.getElementById("quantidade");
      if (!quantidade || quantidade <= 0 || !Number.isInteger(Number(quantidade))) {
        quantidadeInput.classList.add('error');
        quantidadeError.classList.add('show');
        valido = false;
      } else {
        quantidadeInput.classList.remove('error');
        quantidadeError.classList.remove('show');
      }
      const checkboxes = document.querySelectorAll('.vendedores-list input[type="checkbox"]');
      const vendedoresSelecionados = Array.from(checkboxes).filter(cb => cb.checked);
      const vendedoresError = document.getElementById("vendedores-error");
      if (vendedoresSelecionados.length === 0) {
        vendedoresError.classList.add('show');
        valido = false;
      } else {
        vendedoresError.classList.remove('show');
      }
      return valido;
    }
    function enviar() {
      if (!validarFormulario()) {
        mostrarMensagem('Por favor, corrija os erros no formulário.', 'error');
        return;
      }
      const quantidade = document.getElementById("quantidade").value;
      const btnDistribuir = document.getElementById("btnDistribuir");
      const checkboxes = document.querySelectorAll('.vendedores-list input[type="checkbox"]:checked');
      const selecionados = Array.from(checkboxes).map(cb => cb.value);
      btnDistribuir.disabled = true;
      btnDistribuir.classList.add('loading');
      btnDistribuir.textContent = 'Distribuindo...';
      try {
        google.script.run
          .withSuccessHandler(function(resultado) {
            if (resultado && resultado.sucesso) {
              let mensagem = resultado.mensagem || 'Leads distribuídos com sucesso!';
              if (resultado.estatisticas) {
                const stats = resultado.estatisticas;
                mensagem = '✅ Distribuição concluída!\n\n';
                mensagem += '📊 Total distribuído: ' + stats.totalDistribuido + ' leads\n';
                mensagem += '📋 Total disponível: ' + stats.totalDisponivel + ' leads\n\n';
                mensagem += '👥 Distribuição por vendedor:\n';
                for (var vendedor in stats.porVendedor) {
                  if (stats.porVendedor.hasOwnProperty(vendedor)) {
                    mensagem += '   • ' + vendedor + ': ' + stats.porVendedor[vendedor] + ' leads\n';
                  }
                }
                if (stats.totalDistribuido < stats.totalNecessario) {
                  mensagem += '\n⚠️ Atenção: Não há leads suficientes.';
                }
              }
              mostrarMensagem(mensagem, 'success');
              setTimeout(function() { google.script.host.close(); }, 3500);
            } else {
              throw new Error('Resposta inválida do servidor');
            }
          })
          .withFailureHandler(function(error) {
            btnDistribuir.disabled = false;
            btnDistribuir.classList.remove('loading');
            btnDistribuir.textContent = 'Distribuir Leads';
            const mensagemErro = error && error.message ? error.message : 'Erro desconhecido ao distribuir leads';
            mostrarMensagem('❌ ' + mensagemErro, 'error');
          })
          .distribuirLeadsViaHTML(quantidade, selecionados);
      } catch (error) {
        btnDistribuir.disabled = false;
        btnDistribuir.classList.remove('loading');
        btnDistribuir.textContent = 'Distribuir Leads';
        mostrarMensagem('❌ Erro: ' + error.message, 'error');
      }
    }
    
    function carregarVendedores() {
      google.script.run
        .withSuccessHandler(function(vendedores) {
          const vendedoresList = document.getElementById('vendedores-list');
          
          if (!vendedores || vendedores.length === 0) {
            vendedoresList.innerHTML = '<p style="text-align: center; color: #ef4444; padding: 20px; font-size: 13px; font-weight: 500;">Nenhum vendedor cadastrado. Cadastre um vendedor primeiro.</p>';
            return;
          }
          
          let html = '';
          vendedores.forEach(function(vendedor) {
            const id = 'vendedor_' + vendedor.nome.replace(/[^a-zA-Z0-9]/g, '_');
            html += '<label class="checkbox-group">';
            html += '<input type="checkbox" id="' + id + '" value="' + vendedor.nome + '">';
            html += '<span>' + vendedor.nome + '</span>';
            html += '</label>';
          });
          
          vendedoresList.innerHTML = html;
          
          const checkboxes = document.querySelectorAll('.vendedores-list input[type="checkbox"]');
          checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", function() {
              document.getElementById("vendedores-error").classList.remove('show');
            });
          });
        })
        .withFailureHandler(function(error) {
          const vendedoresList = document.getElementById('vendedores-list');
          vendedoresList.innerHTML = '<p style="text-align: center; color: #ef4444; padding: 20px; font-size: 13px;">Erro ao carregar vendedores: ' + error.message + '</p>';
        })
        .obterVendedoresDisponiveis();
    }
    
    carregarVendedores();
    
    document.getElementById("quantidade").addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        enviar();
      }
    });
    document.getElementById("quantidade").addEventListener("input", function() {
      this.classList.remove('error');
      document.getElementById("quantidade-error").classList.remove('show');
    });
  </script>
</body>
</html>`;
}

/**
 * Retorna o conteúdo HTML da interface de auditoria
 * @returns {string} HTML completo da interface
 */
function obterHTMLAuditoria() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base target="_top">
  <title>Auditoria dos Leads</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
      padding: 24px;
      min-height: 100vh;
    }
    .header {
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 16px;
    }
    h1 {
      font-size: 22px;
      font-weight: 700;
      color: #1e3a8a;
    }
    .status-badge {
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      background-color: #e2e8f0;
      color: #475569;
    }
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 0;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e2e8f0;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .section-card {
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 10px rgba(15, 23, 42, 0.03);
      padding: 20px;
      margin-bottom: 24px;
    }
    .section-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .section-title.ok { color: #059669; }
    .section-title.alerta { color: #d97706; }
    .section-title.erro { color: #dc2626; }
    
    .count-tag {
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
    }
    .ok .count-tag { background: #d1fae5; color: #065f46; }
    .alerta .count-tag { background: #fef3c7; color: #92400e; }
    .erro .count-tag { background: #fee2e2; color: #991b1b; }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      font-size: 13px;
      text-align: left;
    }
    th {
      background-color: #f1f5f9;
      color: #475569;
      font-weight: 600;
      padding: 10px 12px;
      border-bottom: 2px solid #e2e8f0;
    }
    td {
      padding: 10px 12px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
    }
    tr:hover td {
      background-color: #f8fafc;
    }
    .no-issues {
      padding: 12px;
      border-radius: 8px;
      background-color: #f0fdf4;
      color: #166534;
      font-weight: 500;
      font-size: 13px;
      border: 1px solid #bbf7d0;
    }
    .error-alert {
      padding: 16px;
      border-radius: 8px;
      background-color: #fef2f2;
      color: #991b1b;
      border: 1px solid #fca5a5;
      font-size: 14px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🕵️ Relatório de Auditoria dos Leads</h1>
    <span class="status-badge" id="status-badge">Analisando base de leads...</span>
  </div>

  <div id="content">
    <div class="loading-container">
      <div class="spinner"></div>
      <p style="font-weight: 500; color: #64748b;">Processando dados e verificando consistência...</p>
    </div>
  </div>

  <script>
    google.script.run
      .withSuccessHandler(function(r) {
        document.getElementById("status-badge").textContent = "Auditoria Concluída";
        document.getElementById("status-badge").style.backgroundColor = "#d1fae5";
        document.getElementById("status-badge").style.color = "#065f46";
        
        const contentDiv = document.getElementById("content");
        contentDiv.innerHTML = "";
        
        criarBloco(contentDiv, "Leads Duplicados (ID)", r.duplicados, "erro");
        criarBloco(contentDiv, "Divergências de Status (Base vs Vendedor)", r.divergencias, "alerta");
        criarBloco(contentDiv, "Leads Atribuídos Sem Status na Base", r.semStatus, "alerta");
        criarBloco(contentDiv, "Leads Sem Data de Primeiro Contato (Em Andamento)", r.semPrimeiroContato, "alerta");
        criarBloco(contentDiv, "Leads Associados a Vendedor Incorreto", r.inconsistenciasDistribuicao, "erro");
      })
      .withFailureHandler(function(error) {
        document.getElementById("status-badge").textContent = "Falha na Auditoria";
        document.getElementById("status-badge").style.backgroundColor = "#fee2e2";
        document.getElementById("status-badge").style.color = "#991b1b";
        
        const contentDiv = document.getElementById("content");
        contentDiv.innerHTML = \`
          <div class="error-alert">
            <h3 style="font-weight:700; margin-bottom:6px;">Erro ao executar auditoria</h3>
            <p>\${error.message || 'Erro desconhecido. Por favor, verifique se os cabeçalhos das planilhas são compatíveis.'}</p>
          </div>
        \`;
      })
      .executarAuditoria();
      
    function criarBloco(container, titulo, dados, tipo) {
      const card = document.createElement("div");
      card.className = "section-card";
      
      const header = document.createElement("div");
      header.className = "section-title " + tipo;
      header.innerHTML = \`<span>\${titulo}</span> <span class="count-tag">\${dados.length}</span>\`;
      card.appendChild(header);
      
      if (dados.length === 0) {
        const okDiv = document.createElement("div");
        okDiv.className = "no-issues";
        okDiv.textContent = "✓ Nenhuma inconsistência encontrada.";
        card.appendChild(okDiv);
      } else {
        const table = document.createElement("table");
        const cols = Object.keys(dados[0]);
        
        // Mapear cabeçalhos para português amigável
        const cabecalhoMapa = {
          id: "ID Lead",
          linha: "Linha",
          linhas: "Linhas Duplicadas",
          quantidade: "Ocorrências",
          vendedor: "Vendedor",
          base: "Status Base Geral",
          vendedorStatus: "Status na Aba do Vendedor",
          vendedorCorreto: "Vendedor Correto (Base)",
          vendedorErrado: "Vendedor da Aba Atual",
          statusBase: "Status do Lead"
        };
        
        let headerRow = "<tr>";
        cols.forEach(function(c) {
          const text = cabecalhoMapa[c] || c;
          headerRow += "<th>" + text + "</th>";
        });
        headerRow += "</tr>";
        table.innerHTML = headerRow;
        
        dados.forEach(function(item) {
          let row = "<tr>";
          cols.forEach(function(c) {
            row += "<td>" + (item[c] !== undefined ? item[c] : "") + "</td>";
          });
          row += "</tr>";
          table.innerHTML += row;
        });
        
        const tableWrapper = document.createElement("div");
        tableWrapper.style.overflowX = "auto";
        tableWrapper.appendChild(table);
        card.appendChild(tableWrapper);
      }
      
      container.appendChild(card);
    }
  </script>
</body>
</html>`;
}

/**
 * Retorna o conteúdo HTML da interface de cadastro de vendedor
 * @returns {string} HTML completo da interface
 */
function obterHTMLCadastroVendedor() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background-color: #ffffff;
      color: #0f172a;
      padding: 16px;
    }
    h2 {
      font-size: 18px;
      font-weight: 700;
      color: #1e3a8a;
      margin-bottom: 16px;
      text-align: center;
    }
    label {
      font-weight: 600;
      font-size: 13px;
      display: block;
      margin-bottom: 5px;
      color: #475569;
    }
    input {
      width: 100%;
      padding: 8px 12px;
      margin-bottom: 12px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 13px;
      font-family: inherit;
      background-color: #f8fafc;
      transition: all 0.2s;
    }
    input:focus {
      outline: none;
      border-color: #3b82f6;
      background-color: #ffffff;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }
    .alert-container {
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 12px;
      font-size: 12px;
      display: none;
      font-weight: 500;
      line-height: 1.4;
    }
    .alert-container.error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fca5a5;
      display: block;
    }
    .alert-container.success {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      display: block;
    }
    button {
      background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);
      color: #ffffff;
      padding: 10px;
      border: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      width: 100%;
      border-radius: 6px;
      transition: all 0.2s;
      box-shadow: 0 4px 10px rgba(29, 78, 216, 0.15);
    }
    button:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 14px rgba(29, 78, 216, 0.25);
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  </style>
</head>
<body>
  <h2>➕ Cadastrar Novo Vendedor</h2>
  <div id="alert" class="alert-container"></div>
  
  <label for="nome">Nome do Vendedor:</label>
  <input id="nome" type="text" placeholder="Ex: Robson">
  
  <label for="email">E-mail Corporativo:</label>
  <input id="email" type="email" placeholder="Ex: robson@ccbeu.org">
  
  <button id="btn" onclick="enviar()">Cadastrar Vendedor</button>

  <script>
    function showMsg(txt, type) {
      const alert = document.getElementById("alert");
      alert.textContent = txt;
      alert.className = "alert-container " + type;
    }
    
    function enviar() {
      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const btn = document.getElementById("btn");
      
      if (!nome || !email) {
        showMsg("Preencha todos os campos obrigatórios.", "error");
        return;
      }
      
      btn.disabled = true;
      btn.textContent = "Processando...";
      showMsg("", ""); // clear
      
      google.script.run
        .withSuccessHandler(function(msg) {
          showMsg(msg, "success");
          setTimeout(function() {
            google.script.host.close();
          }, 3000);
        })
        .withFailureHandler(function(error) {
          btn.disabled = false;
          btn.textContent = "Cadastrar Vendedor";
          showMsg("Erro: " + error.message, "error");
        })
        .cadastrarVendedor(nome, email);
    }
  </script>
</body>
</html>`;
}

/**
 * Retorna o conteúdo HTML da interface de renomear vendedor
 * @returns {string} HTML completo da interface
 */
function obterHTMLRenomearVendedor() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background-color: #ffffff;
      color: #0f172a;
      padding: 16px;
    }
    h2 {
      font-size: 18px;
      font-weight: 700;
      color: #1e3a8a;
      margin-bottom: 16px;
      text-align: center;
    }
    label {
      font-weight: 600;
      font-size: 13px;
      display: block;
      margin-bottom: 5px;
      color: #475569;
    }
    input {
      width: 100%;
      padding: 8px 12px;
      margin-bottom: 12px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 13px;
      font-family: inherit;
      background-color: #f8fafc;
      transition: all 0.2s;
    }
    input:focus {
      outline: none;
      border-color: #3b82f6;
      background-color: #ffffff;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }
    .alert-container {
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 12px;
      font-size: 12px;
      display: none;
      font-weight: 500;
    }
    .alert-container.error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fca5a5;
      display: block;
    }
    .alert-container.success {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      display: block;
    }
    button {
      background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);
      color: #ffffff;
      padding: 10px;
      border: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      width: 100%;
      border-radius: 6px;
      transition: all 0.2s;
      box-shadow: 0 4px 10px rgba(29, 78, 216, 0.15);
    }
    button:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 14px rgba(29, 78, 216, 0.25);
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  </style>
</head>
<body>
  <h2>✏️ Renomear Vendedor</h2>
  <div id="alert" class="alert-container"></div>
  
  <label for="antigo">Nome atual da aba:</label>
  <input id="antigo" type="text" placeholder="Ex: Jose">
  
  <label for="novo">Novo nome da aba:</label>
  <input id="novo" type="text" placeholder="Ex: Jose_Fares">
  
  <button id="btn" onclick="enviar()">Renomear Vendedor</button>

  <script>
    function showMsg(txt, type) {
      const alert = document.getElementById("alert");
      alert.textContent = txt;
      alert.className = "alert-container " + type;
    }
    
    function enviar() {
      const antigo = document.getElementById("antigo").value.trim();
      const novo = document.getElementById("novo").value.trim();
      const btn = document.getElementById("btn");
      
      if (!antigo || !novo) {
        showMsg("Preencha todos os campos.", "error");
        return;
      }
      
      btn.disabled = true;
      btn.textContent = "Renomeando...";
      showMsg("", "");
      
      google.script.run
        .withSuccessHandler(function(msg) {
          showMsg(msg, "success");
          setTimeout(function() {
            google.script.host.close();
          }, 3000);
        })
        .withFailureHandler(function(error) {
          btn.disabled = false;
          btn.textContent = "Renomear Vendedor";
          showMsg("Erro: " + error.message, "error");
        })
        .renomearVendedor(antigo, novo);
    }
  </script>
</body>
</html>`;
}

/**
 * Retorna o conteúdo HTML da interface de remover vendedor
 * @returns {string} HTML completo da interface
 */
function obterHTMLRemoverVendedor() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background-color: #ffffff;
      color: #0f172a;
      padding: 16px;
    }
    h2 {
      font-size: 18px;
      font-weight: 700;
      color: #991b1b;
      margin-bottom: 16px;
      text-align: center;
    }
    label {
      font-weight: 600;
      font-size: 13px;
      display: block;
      margin-bottom: 5px;
      color: #475569;
    }
    input {
      width: 100%;
      padding: 8px 12px;
      margin-bottom: 16px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 13px;
      font-family: inherit;
      background-color: #f8fafc;
      transition: all 0.2s;
    }
    input:focus {
      outline: none;
      border-color: #ef4444;
      background-color: #ffffff;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
    }
    .alert-container {
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 12px;
      font-size: 12px;
      display: none;
      font-weight: 500;
    }
    .alert-container.error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fca5a5;
      display: block;
    }
    .alert-container.success {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      display: block;
    }
    button {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      color: #ffffff;
      padding: 10px;
      border: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      width: 100%;
      border-radius: 6px;
      transition: all 0.2s;
      box-shadow: 0 4px 10px rgba(185, 28, 28, 0.15);
    }
    button:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 14px rgba(185, 28, 28, 0.25);
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .warning-text {
      font-size: 11px;
      color: #64748b;
      margin-bottom: 12px;
      text-align: center;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <h2>❌ Remover Vendedor</h2>
  <div id="alert" class="alert-container"></div>
  
  <label for="nome">Nome da aba do vendedor:</label>
  <input id="nome" type="text" placeholder="Ex: Natalia">
  <p class="warning-text">⚠️ Esta ação removerá permanentemente a aba do vendedor e as referências associadas.</p>
  
  <button id="btn" onclick="enviar()">Remover Vendedor</button>

  <script>
    function showMsg(txt, type) {
      const alert = document.getElementById("alert");
      alert.textContent = txt;
      alert.className = "alert-container " + type;
    }
    
    function enviar() {
      const nome = document.getElementById("nome").value.trim();
      const btn = document.getElementById("btn");
      
      if (!nome) {
        showMsg("Informe o nome da aba.", "error");
        return;
      }
      
      if (!confirm("Tem certeza que deseja remover o vendedor " + nome + "?\\nEsta operação é irreversível.")) {
        return;
      }
      
      btn.disabled = true;
      btn.textContent = "Removendo...";
      showMsg("", "");
      
      google.script.run
        .withSuccessHandler(function(msg) {
          showMsg(msg, "success");
          setTimeout(function() {
            google.script.host.close();
          }, 3000);
        })
        .withFailureHandler(function(error) {
          btn.disabled = false;
          btn.textContent = "Remover Vendedor";
          showMsg("Erro: " + error.message, "error");
        })
        .removerVendedor(nome);
    }
  </script>
</body>
</html>`;
}

/**
 * Retorna o conteúdo HTML da interface de reatribuir vendedor
 * @returns {string} HTML completo da interface
 */
function obterHTMLReatribuirVendedor() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background-color: #ffffff;
      color: #0f172a;
      padding: 16px;
    }
    h2 {
      font-size: 18px;
      font-weight: 700;
      color: #047857;
      margin-bottom: 16px;
      text-align: center;
    }
    label {
      font-weight: 600;
      font-size: 13px;
      display: block;
      margin-bottom: 5px;
      color: #475569;
    }
    input {
      width: 100%;
      padding: 8px 12px;
      margin-bottom: 12px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 13px;
      font-family: inherit;
      background-color: #f8fafc;
      transition: all 0.2s;
    }
    input:focus {
      outline: none;
      border-color: #10b981;
      background-color: #ffffff;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
    }
    .alert-container {
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 12px;
      font-size: 12px;
      display: none;
      font-weight: 500;
    }
    .alert-container.error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fca5a5;
      display: block;
    }
    .alert-container.success {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      display: block;
    }
    button {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: #ffffff;
      padding: 10px;
      border: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      width: 100%;
      border-radius: 6px;
      transition: all 0.2s;
      box-shadow: 0 4px 10px rgba(4, 120, 87, 0.15);
    }
    button:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 14px rgba(4, 120, 87, 0.25);
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  </style>
</head>
<body>
  <h2>🔄 Reatribuir Leads (Inativo)</h2>
  <div id="alert" class="alert-container"></div>
  
  <label for="origem">Vendedor de Origem (Aba antiga):</label>
  <input id="origem" type="text" placeholder="Ex: Thayna">
  
  <label for="destino">Vendedor de Destino (Aba nova):</label>
  <input id="destino" type="text" placeholder="Ex: Jose">
  
  <button id="btn" onclick="enviar()">Transferir e Reatribuir Leads</button>

  <script>
    function showMsg(txt, type) {
      const alert = document.getElementById("alert");
      alert.textContent = txt;
      alert.className = "alert-container " + type;
    }
    
    function enviar() {
      const o = document.getElementById("origem").value.trim();
      const d = document.getElementById("destino").value.trim();
      const btn = document.getElementById("btn");
      
      if (!o || !d) {
        showMsg("Por favor, informe a origem e o destino.", "error");
        return;
      }
      
      btn.disabled = true;
      btn.textContent = "Transferindo...";
      showMsg("", "");
      
      google.script.run
        .withSuccessHandler(function(msg) {
          showMsg(msg, "success");
          setTimeout(function() {
            google.script.host.close();
          }, 3000);
        })
        .withFailureHandler(function(error) {
          btn.disabled = false;
          btn.textContent = "Transferir e Reatribuir Leads";
          showMsg("Erro: " + error.message, "error");
        })
        .reatribuirVendedor(o, d);
    }
  </script>
</body>
</html>`;
}
