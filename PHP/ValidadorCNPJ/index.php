<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validador de CNPJ</title>
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
        input {
            width: 100%;
            padding: 10px;
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
            padding: 15px;
            border-radius: 5px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
        }
        .valid {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .invalid {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .info {
            background-color: #e2e3e5;
            color: #383d41;
            border: 1px solid #d6d8db;
        }
        .cnpj-info {
            margin-top: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏢 Validador de CNPJ</h1>
        
        <form method="POST">
            <div class="form-group">
                <label for="cnpj">CNPJ:</label>
                <input type="text" id="cnpj" name="cnpj" 
                       placeholder="00.000.000/0000-00"
                       value="<?php echo isset($_POST['cnpj']) ? htmlspecialchars($_POST['cnpj']) : ''; ?>">
            </div>
            
            <button type="submit">Validar CNPJ</button>
        </form>

        <?php
        function limparCNPJ($cnpj) {
            return preg_replace('/[^0-9]/', '', $cnpj);
        }

        function validarCNPJ($cnpj) {
            // Remove caracteres não numéricos
            $cnpj = limparCNPJ($cnpj);
            
            // Verifica se tem 14 dígitos
            if (strlen($cnpj) != 14) {
                return false;
            }
            
            // Verifica se todos os dígitos são iguais
            if (preg_match('/^(\d)\1+$/', $cnpj)) {
                return false;
            }
            
            // Valida primeiro dígito verificador
            $soma = 0;
            $peso = 5;
            for ($i = 0; $i < 12; $i++) {
                $soma += $cnpj[$i] * $peso;
                $peso = ($peso == 2) ? 9 : $peso - 1;
            }
            $resto = $soma % 11;
            $dv1 = ($resto < 2) ? 0 : 11 - $resto;
            
            if ($cnpj[12] != $dv1) {
                return false;
            }
            
            // Valida segundo dígito verificador
            $soma = 0;
            $peso = 6;
            for ($i = 0; $i < 13; $i++) {
                $soma += $cnpj[$i] * $peso;
                $peso = ($peso == 2) ? 9 : $peso - 1;
            }
            $resto = $soma % 11;
            $dv2 = ($resto < 2) ? 0 : 11 - $resto;
            
            return $cnpj[13] == $dv2;
        }

        function formatarCNPJ($cnpj) {
            $cnpj = limparCNPJ($cnpj);
            return substr($cnpj, 0, 2) . '.' . 
                   substr($cnpj, 2, 3) . '.' . 
                   substr($cnpj, 5, 3) . '/' . 
                   substr($cnpj, 8, 4) . '-' . 
                   substr($cnpj, 12, 2);
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['cnpj'])) {
            $cnpj = $_POST['cnpj'];
            $cnpj_limpo = limparCNPJ($cnpj);
            
            if (validarCNPJ($cnpj)) {
                echo "<div class='result valid'>";
                echo "✅ CNPJ VÁLIDO<br>";
                echo "<small>CNPJ formatado: " . formatarCNPJ($cnpj) . "</small>";
                echo "</div>";
                
                echo "<div class='cnpj-info'>";
                echo "<strong>Informações do CNPJ:</strong><br>";
                echo "CNPJ: " . formatarCNPJ($cnpj) . "<br>";
                echo "Dígitos verificadores: " . substr($cnpj_limpo, 12, 2) . "<br>";
                echo "Número base: " . substr($cnpj_limpo, 0, 12);
                echo "</div>";
            } else {
                echo "<div class='result invalid'>";
                echo "❌ CNPJ INVÁLIDO<br>";
                echo "<small>Verifique o número informado</small>";
                echo "</div>";
            }
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo "<div class='result info'>";
            echo "ℹ️ Digite um CNPJ para validar";
            echo "</div>";
        }
        ?>

        <div class="cnpj-info">
            <strong>Como usar:</strong><br>
            • Digite o CNPJ com ou sem formatação<br>
            • O sistema validará automaticamente<br>
            • Exemplo: 00.000.000/0000-00 ou 00000000000000
        </div>
    </div>
</body>
</html> 