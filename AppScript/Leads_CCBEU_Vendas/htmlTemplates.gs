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
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      color: #333;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      padding: 30px;
      animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    h3 {
      margin: 0 0 25px 0;
      color: #1a73e8;
      font-size: 24px;
      text-align: center;
      padding-bottom: 15px;
      border-bottom: 2px solid #e0e0e0;
    }
    .form-group { margin-bottom: 25px; }
    label {
      font-weight: 600;
      display: block;
      margin-bottom: 8px;
      color: #555;
      font-size: 14px;
    }
    .input-field {
      width: 100%;
      padding: 12px;
      margin-bottom: 5px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 15px;
      transition: all 0.3s ease;
    }
    .input-field:focus {
      outline: none;
      border-color: #1a73e8;
      box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
    }
    .input-field.error { border-color: #ea4335; }
    .error-message {
      color: #ea4335;
      font-size: 12px;
      margin-top: 5px;
      display: none;
    }
    .error-message.show { display: block; }
    .vendedores-list {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      margin-top: 10px;
    }
    .vendedores-list label {
      font-weight: normal;
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      cursor: pointer;
      padding: 10px;
      border-radius: 6px;
      transition: background-color 0.2s;
    }
    .vendedores-list label:hover { background-color: #e8f0fe; }
    .vendedores-list label:last-child { margin-bottom: 0; }
    .vendedores-list input[type="checkbox"] {
      width: 20px;
      height: 20px;
      margin-right: 12px;
      cursor: pointer;
      accent-color: #1a73e8;
    }
    .btn {
      width: 100%;
      padding: 14px 24px;
      background: linear-gradient(135deg, #1a73e8 0%, #1664c4 100%);
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(26, 115, 232, 0.3);
      margin-top: 10px;
    }
    .btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(26, 115, 232, 0.4);
    }
    .btn:active:not(:disabled) { transform: translateY(0); }
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
      width: 20px;
      height: 20px;
      top: 50%;
      left: 50%;
      margin-left: -10px;
      margin-top: -10px;
      border: 3px solid #ffffff;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .message {
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 20px;
      display: none;
      animation: fadeIn 0.3s ease;
      white-space: pre-line;
      line-height: 1.6;
      font-size: 14px;
      max-height: 300px;
      overflow-y: auto;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .message.show { display: block; }
    .message.success {
      background-color: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #4caf50;
    }
    .message.error {
      background-color: #ffebee;
      color: #c62828;
      border: 1px solid #ef5350;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
    }
    .checkbox-group input { flex-shrink: 0; }
    .checkbox-group span { flex: 1; }
  </style>
</head>
<body>
  <div class="container">
    <h3><strong>Distribuição de Leads</strong></h3>
    <div id="message" class="message"></div>
    <div class="form-group">
      <label for="quantidade">Quantidade por vendedor:</label>
      <input type="number" id="quantidade" min="1" class="input-field" placeholder="Digite a quantidade" required>
      <div class="error-message" id="quantidade-error">
        Por favor, informe uma quantidade válida (mínimo 1).
      </div>
    </div>
    <div class="form-group">
      <label>Selecione os vendedores:</label>
      <div class="vendedores-list" id="vendedores-list">
        <p style="text-align: center; color: #666; padding: 20px;">Carregando vendedores...</p>
      </div>
      <div class="error-message" id="vendedores-error">
        Por favor, selecione pelo menos um vendedor.
      </div>
    </div>
    <button class="btn" id="btnDistribuir" onclick="enviar()">Distribuir</button>
  </div>
  <script>
    function mostrarMensagem(texto, tipo) {
      const messageDiv = document.getElementById('message');
      messageDiv.textContent = texto;
      messageDiv.className = 'message ' + tipo + ' show';
      messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
                mensagem = '✅ Distribuição concluída!\\n\\n';
                mensagem += '📊 Total distribuído: ' + stats.totalDistribuido + ' leads\\n';
                mensagem += '📋 Total disponível: ' + stats.totalDisponivel + ' leads\\n\\n';
                mensagem += '👥 Distribuição por vendedor:\\n';
                for (var vendedor in stats.porVendedor) {
                  if (stats.porVendedor.hasOwnProperty(vendedor)) {
                    mensagem += '   • ' + vendedor + ': ' + stats.porVendedor[vendedor] + ' leads\\n';
                  }
                }
                if (stats.totalDistribuido < stats.totalNecessario) {
                  mensagem += '\\n⚠️ Atenção: Nem todos os leads solicitados puderam ser distribuídos.';
                }
              }
              mostrarMensagem(mensagem, 'success');
              setTimeout(function() { google.script.host.close(); }, 3000);
            } else {
              throw new Error('Resposta inválida do servidor');
            }
          })
          .withFailureHandler(function(error) {
            btnDistribuir.disabled = false;
            btnDistribuir.classList.remove('loading');
            btnDistribuir.textContent = 'Distribuir';
            const mensagemErro = error && error.message ? error.message : 'Erro desconhecido ao distribuir leads';
            mostrarMensagem('❌ ' + mensagemErro, 'error');
          })
          .distribuirLeadsViaHTML(quantidade, selecionados);
      } catch (error) {
        btnDistribuir.disabled = false;
        btnDistribuir.classList.remove('loading');
        btnDistribuir.textContent = 'Distribuir';
        mostrarMensagem('❌ Erro: ' + error.message, 'error');
      }
    }
    // Carregar vendedores dinamicamente ao abrir o diálogo
    function carregarVendedores() {
      google.script.run
        .withSuccessHandler(function(vendedores) {
          const vendedoresList = document.getElementById('vendedores-list');
          
          if (!vendedores || vendedores.length === 0) {
            vendedoresList.innerHTML = '<p style="text-align: center; color: #ea4335; padding: 20px;">Nenhum vendedor cadastrado. Cadastre um vendedor primeiro.</p>';
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
          
          // Adicionar event listeners aos checkboxes
          const checkboxes = document.querySelectorAll('.vendedores-list input[type="checkbox"]');
          checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", function() {
              document.getElementById("vendedores-error").classList.remove('show');
            });
          });
        })
        .withFailureHandler(function(error) {
          const vendedoresList = document.getElementById('vendedores-list');
          vendedoresList.innerHTML = '<p style="text-align: center; color: #ea4335; padding: 20px;">Erro ao carregar vendedores: ' + error.message + '</p>';
          console.error('Erro ao carregar vendedores:', error);
        })
        .obterVendedoresDisponiveis();
    }
    
    // Carregar vendedores quando a página carregar
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
  return '<!DOCTYPE html><html><head><base target="_top"><style>body{font-family:Arial;margin:20px}h1{color:#333}.ok{color:#1a7f37;font-weight:bold}.alerta{color:#c77f00;font-weight:bold}.erro{color:#c1121f;font-weight:bold}table{border-collapse:collapse;width:100%;margin-top:15px}th,td{border:1px solid #ccc;padding:6px}th{background:#f0f0f0}</style></head><body><h1>🕵️ Auditoria dos Leads</h1><p>Aguarde, processando...</p><script>google.script.run.withSuccessHandler(function(r){document.body.innerHTML="";function bloco(titulo,dados,classe){const div=document.createElement("div");div.innerHTML=\'<h2 class="\'+classe+\'">\'+titulo+\' (\'+dados.length+\')</h2>\';if(dados.length===0){div.innerHTML+=\'<p class="ok">Nenhum problema encontrado.</p>\';document.body.appendChild(div);return}const table=document.createElement("table");const cols=Object.keys(dados[0]);table.innerHTML="<tr>"+cols.map(function(c){return"<th>"+c+"</th>"}).join("")+"</tr>";dados.forEach(function(l){const row="<tr>"+cols.map(function(c){return"<td>"+(l[c]||"")+"</td>"}).join("")+"</tr>";table.innerHTML+=row});div.appendChild(table);document.body.appendChild(div)}bloco("Leads Duplicados",r.duplicados,"erro");bloco("Divergências de Status",r.divergencias,"alerta");bloco("Leads Sem Status",r.semStatus,"alerta");bloco("Sem Data de Primeiro Contato",r.semPrimeiroContato,"alerta");bloco("Leads Distribuídos para o Vendedor Errado",r.inconsistenciasDistribuicao,"erro")}).withFailureHandler(function(error){document.body.innerHTML=\'<h1>🕵️ Auditoria dos Leads</h1><div class="erro"><h2>Erro ao executar auditoria</h2><p>\'+error.message+\'</p></div>\'}).executarAuditoria();</script></body></html>';
}

/**
 * Retorna o conteúdo HTML da interface de cadastro de vendedor
 * @returns {string} HTML completo da interface
 */
function obterHTMLCadastroVendedor() {
  return '<!DOCTYPE html><html><head><base target="_top"><style>body{font-family:Arial;padding:20px}label{font-weight:bold;display:block;margin-bottom:5px}input{width:100%;padding:8px;margin-bottom:15px;box-sizing:border-box;border:1px solid #ccc;border-radius:4px}button{background:#003366;color:white;padding:10px 18px;border:none;cursor:pointer;font-size:14px;width:100%;border-radius:4px}button:hover{background:#004488}</style></head><body><h2>➕ Cadastrar Novo Vendedor</h2><label>Nome do Vendedor:</label><input id="nome" type="text"><label>E-mail Corporativo:</label><input id="email" type="email"><button onclick="enviar()">Cadastrar</button><script>function enviar(){const nome=document.getElementById("nome").value.trim();const email=document.getElementById("email").value.trim();if(!nome||!email){alert("Preencha todos os campos.");return}google.script.run.withSuccessHandler(function(msg){alert(msg);google.script.host.close()}).withFailureHandler(function(error){alert("Erro: "+error.message)}).cadastrarVendedor(nome,email)}</script></body></html>';
}

/**
 * Retorna o conteúdo HTML da interface de renomear vendedor
 * @returns {string} HTML completo da interface
 */
function obterHTMLRenomearVendedor() {
  return '<!DOCTYPE html><html><body style="font-family:Arial;padding:20px"><h2>✏️ Renomear Vendedor</h2><label>Nome atual da aba:</label><input id="antigo" type="text" style="width:100%;padding:6px;margin-bottom:10px;box-sizing:border-box;border:1px solid #ccc;border-radius:4px"><label>Novo nome da aba:</label><input id="novo" type="text" style="width:100%;padding:6px;margin-bottom:10px;box-sizing:border-box;border:1px solid #ccc;border-radius:4px"><button onclick="enviar()" style="padding:10px 20px;background:#003366;color:white;border:none;cursor:pointer;border-radius:4px;width:100%">Renomear</button><script>function enviar(){const antigo=document.getElementById("antigo").value.trim();const novo=document.getElementById("novo").value.trim();if(!antigo||!novo){alert("Preencha todos os campos.");return}if(!confirm("Renomear de \'"+antigo+"\' para \'"+novo+"\'?"))return;google.script.run.withSuccessHandler(function(msg){alert(msg);google.script.host.close()}).withFailureHandler(function(error){alert("Erro: "+error.message)}).renomearVendedor(antigo,novo)}</script></body></html>';
}

/**
 * Retorna o conteúdo HTML da interface de remover vendedor
 * @returns {string} HTML completo da interface
 */
function obterHTMLRemoverVendedor() {
  return '<!DOCTYPE html><html><body style="font-family:Arial;padding:20px"><h2>❌ Remover Vendedor</h2><label>Nome da aba do vendedor:</label><input id="nome" type="text" style="width:100%;padding:6px;margin-bottom:10px;box-sizing:border-box;border:1px solid #ccc;border-radius:4px"><button onclick="enviar()" style="padding:10px 20px;background:#8b0000;color:white;border:none;cursor:pointer;border-radius:4px;width:100%">Remover</button><script>function enviar(){const nome=document.getElementById("nome").value.trim();if(!nome){alert("Informe o nome da aba.");return}if(!confirm("Tem certeza que deseja remover o vendedor "+nome+"?"))return;google.script.run.withSuccessHandler(function(msg){alert(msg);google.script.host.close()}).withFailureHandler(function(error){alert("Erro: "+error.message)}).removerVendedor(nome)}</script></body></html>';
}

/**
 * Retorna o conteúdo HTML da interface de reatribuir vendedor
 * @returns {string} HTML completo da interface
 */
function obterHTMLReatribuirVendedor() {
  return '<!DOCTYPE html><html><body style="font-family:Arial;padding:20px"><h2>🔄 Reatribuir Leads</h2><label>Vendedor que saiu:</label><input id="origem" type="text" style="width:100%;padding:6px;margin-bottom:10px;box-sizing:border-box;border:1px solid #ccc;border-radius:4px"><label>Reatribuir para:</label><input id="destino" type="text" style="width:100%;padding:6px;margin-bottom:10px;box-sizing:border-box;border:1px solid #ccc;border-radius:4px"><button onclick="enviar()" style="padding:10px 20px;background:#006400;color:white;border:none;cursor:pointer;border-radius:4px;width:100%">Reatribuir</button><script>function enviar(){const o=document.getElementById("origem").value.trim();const d=document.getElementById("destino").value.trim();if(!o||!d){alert("Preencha os nomes.");return}google.script.run.withSuccessHandler(function(msg){alert(msg);google.script.host.close()}).withFailureHandler(function(error){alert("Erro: "+error.message)}).reatribuirVendedor(o,d)}</script></body></html>';
}

