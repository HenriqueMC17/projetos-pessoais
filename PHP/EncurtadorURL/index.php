<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Encurtador de URLs</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        button {
            width: 100%;
            padding: 12px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
        .result {
            margin-top: 20px;
            padding: 20px;
            background-color: #e9ecef;
            border-radius: 5px;
            text-align: center;
        }
        .short-url {
            font-size: 18px;
            font-weight: bold;
            color: #007bff;
            word-break: break-all;
            margin: 10px 0;
        }
        .copy-btn {
            background-color: #28a745;
            margin-top: 10px;
        }
        .copy-btn:hover {
            background-color: #218838;
        }
        .url-list {
            margin-top: 30px;
        }
        .url-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
            margin-bottom: 10px;
            border: 1px solid #dee2e6;
        }
        .url-info {
            flex: 1;
            margin-right: 15px;
        }
        .original-url {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
            word-break: break-all;
        }
        .short-url-display {
            color: #007bff;
            font-size: 14px;
        }
        .url-stats {
            color: #666;
            font-size: 12px;
        }
        .url-actions {
            display: flex;
            gap: 10px;
        }
        .btn-small {
            padding: 5px 10px;
            font-size: 12px;
            border-radius: 3px;
        }
        .stats {
            background-color: #e9ecef;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
            text-align: center;
        }
        .stats h3 {
            margin-top: 0;
            color: #333;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
        }
        .stat-item {
            background: white;
            padding: 15px;
            border-radius: 5px;
        }
        .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
        .stat-label {
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔗 Encurtador de URLs</h1>
        
        <form method="POST">
            <div class="form-group">
                <label for="url_original">URL Original:</label>
                <input type="url" id="url_original" name="url_original" 
                       placeholder="https://exemplo.com/url-muito-longa"
                       value="<?php echo isset($_POST['url_original']) ? htmlspecialchars($_POST['url_original']) : ''; ?>" required>
            </div>
            
            <button type="submit" name="encurtar">Encurtar URL</button>
        </form>

        <?php
        $urls_file = 'urls.json';
        
        // Carregar URLs existentes
        $urls = [];
        if (file_exists($urls_file)) {
            $urls = json_decode(file_get_contents($urls_file), true);
        }
        
        // Processar encurtamento
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['encurtar'])) {
            $url_original = $_POST['url_original'];
            
            if (filter_var($url_original, FILTER_VALIDATE_URL)) {
                // Gerar código único
                do {
                    $codigo = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 6);
                } while (isset($urls[$codigo]));
                
                // Salvar URL
                $urls[$codigo] = [
                    'url_original' => $url_original,
                    'data_criacao' => date('Y-m-d H:i:s'),
                    'cliques' => 0
                ];
                
                file_put_contents($urls_file, json_encode($urls));
                
                $short_url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] . '?r=' . $codigo;
                
                echo "<div class='result'>";
                echo "<h3>✅ URL Encurtada com Sucesso!</h3>";
                echo "<div class='short-url'>$short_url</div>";
                echo "<button class='copy-btn' onclick='copiarURL()'>Copiar URL Encurtada</button>";
                echo "</div>";
            } else {
                echo "<div class='result' style='color: red;'>❌ URL inválida! Digite uma URL válida.</div>";
            }
        }
        
        // Processar redirecionamento
        if (isset($_GET['r'])) {
            $codigo = $_GET['r'];
            if (isset($urls[$codigo])) {
                // Incrementar contador de cliques
                $urls[$codigo]['cliques']++;
                file_put_contents($urls_file, json_encode($urls));
                
                // Redirecionar
                header('Location: ' . $urls[$codigo]['url_original']);
                exit;
            } else {
                echo "<div class='result' style='color: red;'>❌ URL não encontrada!</div>";
            }
        }
        
        // Listar URLs existentes
        if (!empty($urls)) {
            echo "<div class='url-list'>";
            echo "<h3>URLs Encurtadas</h3>";
            
            $total_urls = count($urls);
            $total_cliques = array_sum(array_column($urls, 'cliques'));
            
            foreach ($urls as $codigo => $url_info) {
                $short_url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] . '?r=' . $codigo;
                
                echo "<div class='url-item'>";
                echo "<div class='url-info'>";
                echo "<div class='original-url'>" . htmlspecialchars($url_info['url_original']) . "</div>";
                echo "<div class='short-url-display'>" . htmlspecialchars($short_url) . "</div>";
                echo "<div class='url-stats'>Criado em: " . $url_info['data_criacao'] . " | Cliques: " . $url_info['cliques'] . "</div>";
                echo "</div>";
                echo "<div class='url-actions'>";
                echo "<a href='$short_url' target='_blank' class='btn-small' style='background-color: #007bff; color: white; text-decoration: none;'>Testar</a>";
                echo "<button class='btn-small' style='background-color: #dc3545; color: white;' onclick='copiarURL(\"$short_url\")'>Copiar</button>";
                echo "</div>";
                echo "</div>";
            }
            
            echo "<div class='stats'>";
            echo "<h3>Estatísticas</h3>";
            echo "<div class='stats-grid'>";
            echo "<div class='stat-item'>";
            echo "<div class='stat-number'>$total_urls</div>";
            echo "<div class='stat-label'>URLs Encurtadas</div>";
            echo "</div>";
            echo "<div class='stat-item'>";
            echo "<div class='stat-number'>$total_cliques</div>";
            echo "<div class='stat-label'>Total de Cliques</div>";
            echo "</div>";
            echo "</div>";
            echo "</div>";
            
            echo "</div>";
        }
        ?>
    </div>

    <script>
        function copiarURL(url = null) {
            const urlParaCopiar = url || document.querySelector('.short-url').textContent;
            navigator.clipboard.writeText(urlParaCopiar).then(function() {
                alert('URL copiada para a área de transferência!');
            }).catch(function(err) {
                console.error('Erro ao copiar: ', err);
            });
        }
    </script>
</body>
</html> 