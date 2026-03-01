<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conversor de Moedas</title>
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
            background-color: #e9ecef;
            border-radius: 5px;
            text-align: center;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>💱 Conversor de Moedas</h1>
        
        <form method="POST">
            <div class="form-group">
                <label for="valor">Valor:</label>
                <input type="number" id="valor" name="valor" step="0.01" required 
                       value="<?php echo isset($_POST['valor']) ? htmlspecialchars($_POST['valor']) : ''; ?>">
            </div>
            
            <div class="form-group">
                <label for="moeda_origem">Moeda de Origem:</label>
                <select id="moeda_origem" name="moeda_origem" required>
                    <option value="BRL" <?php echo (isset($_POST['moeda_origem']) && $_POST['moeda_origem'] == 'BRL') ? 'selected' : ''; ?>>Real (BRL)</option>
                    <option value="USD" <?php echo (isset($_POST['moeda_origem']) && $_POST['moeda_origem'] == 'USD') ? 'selected' : ''; ?>>Dólar (USD)</option>
                    <option value="EUR" <?php echo (isset($_POST['moeda_origem']) && $_POST['moeda_origem'] == 'EUR') ? 'selected' : ''; ?>>Euro (EUR)</option>
                    <option value="GBP" <?php echo (isset($_POST['moeda_origem']) && $_POST['moeda_origem'] == 'GBP') ? 'selected' : ''; ?>>Libra (GBP)</option>
                    <option value="JPY" <?php echo (isset($_POST['moeda_origem']) && $_POST['moeda_origem'] == 'JPY') ? 'selected' : ''; ?>>Iene (JPY)</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="moeda_destino">Moeda de Destino:</label>
                <select id="moeda_destino" name="moeda_destino" required>
                    <option value="USD" <?php echo (isset($_POST['moeda_destino']) && $_POST['moeda_destino'] == 'USD') ? 'selected' : ''; ?>>Dólar (USD)</option>
                    <option value="BRL" <?php echo (isset($_POST['moeda_destino']) && $_POST['moeda_destino'] == 'BRL') ? 'selected' : ''; ?>>Real (BRL)</option>
                    <option value="EUR" <?php echo (isset($_POST['moeda_destino']) && $_POST['moeda_destino'] == 'EUR') ? 'selected' : ''; ?>>Euro (EUR)</option>
                    <option value="GBP" <?php echo (isset($_POST['moeda_destino']) && $_POST['moeda_destino'] == 'GBP') ? 'selected' : ''; ?>>Libra (GBP)</option>
                    <option value="JPY" <?php echo (isset($_POST['moeda_destino']) && $_POST['moeda_destino'] == 'JPY') ? 'selected' : ''; ?>>Iene (JPY)</option>
                </select>
            </div>
            
            <button type="submit">Converter</button>
        </form>

        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $valor = floatval($_POST['valor']);
            $moeda_origem = $_POST['moeda_origem'];
            $moeda_destino = $_POST['moeda_destino'];
            
            // Taxas de câmbio simuladas (em produção, use uma API real)
            $taxas = [
                'BRL' => ['USD' => 0.20, 'EUR' => 0.18, 'GBP' => 0.16, 'JPY' => 30.0],
                'USD' => ['BRL' => 5.0, 'EUR' => 0.90, 'GBP' => 0.80, 'JPY' => 150.0],
                'EUR' => ['BRL' => 5.5, 'USD' => 1.11, 'GBP' => 0.89, 'JPY' => 167.0],
                'GBP' => ['BRL' => 6.2, 'USD' => 1.25, 'EUR' => 1.12, 'JPY' => 187.0],
                'JPY' => ['BRL' => 0.033, 'USD' => 0.0067, 'EUR' => 0.006, 'GBP' => 0.0053]
            ];
            
            if (isset($taxas[$moeda_origem][$moeda_destino])) {
                $taxa = $taxas[$moeda_origem][$moeda_destino];
                $resultado = $valor * $taxa;
                
                echo "<div class='result'>";
                echo "<strong>Resultado:</strong><br>";
                echo number_format($valor, 2) . " " . $moeda_origem . " = ";
                echo number_format($resultado, 2) . " " . $moeda_destino;
                echo "<br><small>Taxa: 1 " . $moeda_origem . " = " . number_format($taxa, 4) . " " . $moeda_destino . "</small>";
                echo "</div>";
            } else {
                echo "<div class='result' style='color: red;'>Erro: Conversão não disponível</div>";
            }
        }
        ?>
    </div>
</body>
</html> 