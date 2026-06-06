<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contador de Downloads</title>
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
        .file-list {
            display: grid;
            gap: 15px;
            margin-bottom: 30px;
        }
        .file-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
            border: 1px solid #dee2e6;
        }
        .file-info {
            flex: 1;
        }
        .file-name {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .file-size {
            color: #666;
            font-size: 14px;
        }
        .download-count {
            background-color: #007bff;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-weight: bold;
            margin-right: 10px;
        }
        .download-btn {
            background-color: #28a745;
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            font-size: 14px;
        }
        .download-btn:hover {
            background-color: #218838;
        }
        .stats {
            background-color: #e9ecef;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .stats h3 {
            margin-top: 0;
            color: #333;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .stat-item {
            background: white;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
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
        .upload-form {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input[type="file"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📁 Contador de Downloads</h1>
        
        <!-- Formulário de Upload -->
        <div class="upload-form">
            <h3>Adicionar Novo Arquivo</h3>
            <form method="POST" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="arquivo">Selecionar Arquivo:</label>
                    <input type="file" id="arquivo" name="arquivo" required>
                </div>
                <button type="submit" name="upload">Enviar Arquivo</button>
            </form>
        </div>

        <?php
        // Diretório para armazenar arquivos
        $upload_dir = 'uploads/';
        $stats_file = 'download_stats.json';
        
        // Criar diretório se não existir
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0755, true);
        }
        
        // Carregar estatísticas
        $stats = [];
        if (file_exists($stats_file)) {
            $stats = json_decode(file_get_contents($stats_file), true);
        }
        
        // Processar upload
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['upload'])) {
            if (isset($_FILES['arquivo']) && $_FILES['arquivo']['error'] === UPLOAD_ERR_OK) {
                $file = $_FILES['arquivo'];
                $filename = basename($file['name']);
                $filepath = $upload_dir . $filename;
                
                if (move_uploaded_file($file['tmp_name'], $filepath)) {
                    if (!isset($stats[$filename])) {
                        $stats[$filename] = [
                            'downloads' => 0,
                            'size' => $file['size'],
                            'upload_date' => date('Y-m-d H:i:s')
                        ];
                        file_put_contents($stats_file, json_encode($stats));
                        echo "<p style='color: green;'>Arquivo enviado com sucesso!</p>";
                    } else {
                        echo "<p style='color: orange;'>Arquivo já existe!</p>";
                    }
                } else {
                    echo "<p style='color: red;'>Erro ao enviar arquivo!</p>";
                }
            }
        }
        
        // Processar download
        if (isset($_GET['download'])) {
            $filename = $_GET['download'];
            $filepath = $upload_dir . $filename;
            
            if (file_exists($filepath) && isset($stats[$filename])) {
                // Incrementar contador
                $stats[$filename]['downloads']++;
                file_put_contents($stats_file, json_encode($stats));
                
                // Forçar download
                header('Content-Type: application/octet-stream');
                header('Content-Disposition: attachment; filename="' . $filename . '"');
                header('Content-Length: ' . filesize($filepath));
                readfile($filepath);
                exit;
            }
        }
        
        // Listar arquivos
        if (!empty($stats)) {
            echo "<div class='file-list'>";
            echo "<h3>Arquivos Disponíveis</h3>";
            
            foreach ($stats as $filename => $file_info) {
                $filepath = $upload_dir . $filename;
                if (file_exists($filepath)) {
                    echo "<div class='file-item'>";
                    echo "<div class='file-info'>";
                    echo "<div class='file-name'>" . htmlspecialchars($filename) . "</div>";
                    echo "<div class='file-size'>Tamanho: " . number_format($file_info['size']) . " bytes | ";
                    echo "Enviado em: " . $file_info['upload_date'] . "</div>";
                    echo "</div>";
                    echo "<div class='download-count'>" . $file_info['downloads'] . " downloads</div>";
                    echo "<a href='?download=" . urlencode($filename) . "' class='download-btn'>Download</a>";
                    echo "</div>";
                }
            }
            echo "</div>";
            
            // Estatísticas gerais
            $total_files = count($stats);
            $total_downloads = array_sum(array_column($stats, 'downloads'));
            $total_size = array_sum(array_column($stats, 'size'));
            
            echo "<div class='stats'>";
            echo "<h3>Estatísticas Gerais</h3>";
            echo "<div class='stats-grid'>";
            echo "<div class='stat-item'>";
            echo "<div class='stat-number'>$total_files</div>";
            echo "<div class='stat-label'>Arquivos</div>";
            echo "</div>";
            echo "<div class='stat-item'>";
            echo "<div class='stat-number'>$total_downloads</div>";
            echo "<div class='stat-label'>Downloads Totais</div>";
            echo "</div>";
            echo "<div class='stat-item'>";
            echo "<div class='stat-number'>" . number_format($total_size) . "</div>";
            echo "<div class='stat-label'>Bytes Armazenados</div>";
            echo "</div>";
            echo "</div>";
            echo "</div>";
        } else {
            echo "<p>Nenhum arquivo disponível para download.</p>";
        }
        ?>
    </div>
</body>
</html> 