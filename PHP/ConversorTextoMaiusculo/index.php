<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conversor de Texto para Maiúsculo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
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
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            min-height: 100px;
            resize: vertical;
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
            font-family: monospace;
            font-size: 18px;
            word-break: break-all;
        }
        .copy-btn {
            background-color: #28a745;
            margin-top: 10px;
        }
        .copy-btn:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔠 Conversor de Texto para Maiúsculo</h1>
        <form method="POST">
            <div class="form-group">
                <label for="texto">Digite o texto:</label>
                <textarea id="texto" name="texto" required><?php echo isset($_POST['texto']) ? htmlspecialchars($_POST['texto']) : ''; ?></textarea>
            </div>
            <button type="submit">Converter para MAIÚSCULO</button>
        </form>
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['texto'])) {
            $texto = $_POST['texto'];
            $maiusculo = mb_strtoupper($texto, 'UTF-8');
            echo "<div class='result' id='resultado'>" . nl2br(htmlspecialchars($maiusculo)) . "</div>";
            echo "<button class='copy-btn' onclick='copiarTexto()'>Copiar Texto</button>";
        }
        ?>
    </div>
    <script>
        function copiarTexto() {
            const texto = document.getElementById('resultado').textContent;
            navigator.clipboard.writeText(texto).then(function() {
                alert('Texto copiado para a área de transferência!');
            }).catch(function(err) {
                console.error('Erro ao copiar: ', err);
            });
        }
    </script>
</body>
</html> 