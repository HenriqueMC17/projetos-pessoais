<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerador de Senhas</title>
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
        input, select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }
        .checkbox-group input[type="checkbox"] {
            width: auto;
        }
        button {
            width: 100%;
            padding: 12px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin-bottom: 20px;
        }
        button:hover {
            background-color: #218838;
        }
        .result {
            margin-top: 20px;
            padding: 15px;
            background-color: #e9ecef;
            border-radius: 5px;
            text-align: center;
            font-size: 18px;
            font-family: monospace;
            word-break: break-all;
        }
        .copy-btn {
            background-color: #007bff;
            margin-top: 10px;
        }
        .copy-btn:hover {
            background-color: #0056b3;
        }
        .strength {
            margin-top: 10px;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
        }
        .weak { background-color: #f8d7da; color: #721c24; }
        .medium { background-color: #fff3cd; color: #856404; }
        .strong { background-color: #d4edda; color: #155724; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔐 Gerador de Senhas</h1>
        
        <form method="POST">
            <div class="form-group">
                <label for="comprimento">Comprimento da Senha:</label>
                <input type="number" id="comprimento" name="comprimento" min="4" max="50" 
                       value="<?php echo isset($_POST['comprimento']) ? htmlspecialchars($_POST['comprimento']) : '12'; ?>">
            </div>
            
            <div class="form-group">
                <label>Caracteres a Incluir:</label>
                <div class="checkbox-group">
                    <input type="checkbox" id="maiusculas" name="maiusculas" 
                           <?php echo (isset($_POST['maiusculas']) || !isset($_POST['gerar'])) ? 'checked' : ''; ?>>
                    <label for="maiusculas">Letras Maiúsculas (A-Z)</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="minusculas" name="minusculas" 
                           <?php echo (isset($_POST['minusculas']) || !isset($_POST['gerar'])) ? 'checked' : ''; ?>>
                    <label for="minusculas">Letras Minúsculas (a-z)</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="numeros" name="numeros" 
                           <?php echo (isset($_POST['numeros']) || !isset($_POST['gerar'])) ? 'checked' : ''; ?>>
                    <label for="numeros">Números (0-9)</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="simbolos" name="simbolos" 
                           <?php echo (isset($_POST['simbolos']) || !isset($_POST['gerar'])) ? 'checked' : ''; ?>>
                    <label for="simbolos">Símbolos (!@#$%^&*)</label>
                </div>
            </div>
            
            <button type="submit" name="gerar">Gerar Senha</button>
        </form>

        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['gerar'])) {
            $comprimento = intval($_POST['comprimento']);
            $maiusculas = isset($_POST['maiusculas']);
            $minusculas = isset($_POST['minusculas']);
            $numeros = isset($_POST['numeros']);
            $simbolos = isset($_POST['simbolos']);
            
            // Verificar se pelo menos uma opção foi selecionada
            if (!$maiusculas && !$minusculas && !$numeros && !$simbolos) {
                echo "<div class='result' style='color: red;'>Erro: Selecione pelo menos um tipo de caractere</div>";
            } else {
                // Gerar senha
                $caracteres = '';
                if ($maiusculas) $caracteres .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                if ($minusculas) $caracteres .= 'abcdefghijklmnopqrstuvwxyz';
                if ($numeros) $caracteres .= '0123456789';
                if ($simbolos) $caracteres .= '!@#$%^&*()_+-=[]{}|;:,.<>?';
                
                $senha = '';
                for ($i = 0; $i < $comprimento; $i++) {
                    $senha .= $caracteres[random_int(0, strlen($caracteres) - 1)];
                }
                
                // Avaliar força da senha
                $forca = 0;
                if ($maiusculas) $forca++;
                if ($minusculas) $forca++;
                if ($numeros) $forca++;
                if ($simbolos) $forca++;
                if ($comprimento >= 12) $forca++;
                
                $classe_forca = $forca <= 2 ? 'weak' : ($forca <= 4 ? 'medium' : 'strong');
                $texto_forca = $forca <= 2 ? 'Fraca' : ($forca <= 4 ? 'Média' : 'Forte');
                
                echo "<div class='result'>";
                echo "<strong>Senha Gerada:</strong><br>";
                echo "<span style='font-size: 24px;'>" . htmlspecialchars($senha) . "</span>";
                echo "</div>";
                
                echo "<div class='strength $classe_forca'>";
                echo "Força da Senha: $texto_forca";
                echo "</div>";
                
                echo "<button class='copy-btn' onclick='copiarSenha()'>Copiar Senha</button>";
            }
        }
        ?>
    </div>

    <script>
        function copiarSenha() {
            const senha = document.querySelector('.result span').textContent;
            navigator.clipboard.writeText(senha).then(function() {
                alert('Senha copiada para a área de transferência!');
            }).catch(function(err) {
                console.error('Erro ao copiar: ', err);
            });
        }
    </script>
</body>
</html> 