<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Idade</title>
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
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        button:hover {
            background-color: #218838;
        }
        .result {
            margin-top: 20px;
            padding: 20px;
            background-color: #e9ecef;
            border-radius: 5px;
            text-align: center;
        }
        .age-display {
            font-size: 48px;
            font-weight: bold;
            color: #007bff;
            margin: 20px 0;
        }
        .age-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .age-item {
            background: white;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .age-item strong {
            display: block;
            font-size: 24px;
            color: #28a745;
        }
        .age-item small {
            color: #666;
        }
        .next-birthday {
            margin-top: 20px;
            padding: 15px;
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            color: #856404;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎂 Calculadora de Idade</h1>
        
        <form method="POST">
            <div class="form-group">
                <label for="nome">Nome (opcional):</label>
                <input type="text" id="nome" name="nome" 
                       placeholder="Digite seu nome"
                       value="<?php echo isset($_POST['nome']) ? htmlspecialchars($_POST['nome']) : ''; ?>">
            </div>
            
            <div class="form-group">
                <label for="data_nascimento">Data de Nascimento:</label>
                <input type="date" id="data_nascimento" name="data_nascimento" required
                       value="<?php echo isset($_POST['data_nascimento']) ? htmlspecialchars($_POST['data_nascimento']) : ''; ?>">
            </div>
            
            <button type="submit">Calcular Idade</button>
        </form>

        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['data_nascimento'])) {
            $nome = $_POST['nome'] ?? 'Você';
            $data_nascimento = new DateTime($_POST['data_nascimento']);
            $hoje = new DateTime();
            
            // Calcular idade
            $idade = $hoje->diff($data_nascimento);
            
            // Calcular próximos aniversários
            $proximo_aniversario = new DateTime($_POST['data_nascimento']);
            $proximo_aniversario->setDate($hoje->format('Y'), $proximo_aniversario->format('m'), $proximo_aniversario->format('d'));
            
            if ($proximo_aniversario < $hoje) {
                $proximo_aniversario->setDate($hoje->format('Y') + 1, $proximo_aniversario->format('m'), $proximo_aniversario->format('d'));
            }
            
            $dias_para_aniversario = $hoje->diff($proximo_aniversario)->days;
            
            // Calcular outras medidas de tempo
            $dias_vividos = $hoje->diff($data_nascimento)->days;
            $semanas_vividas = floor($dias_vividos / 7);
            $meses_vividos = ($hoje->format('Y') - $data_nascimento->format('Y')) * 12 + 
                            ($hoje->format('m') - $data_nascimento->format('m'));
            
            echo "<div class='result'>";
            echo "<h2>Olá, $nome!</h2>";
            echo "<div class='age-display'>" . $idade->y . "</div>";
            echo "<p>anos de idade</p>";
            
            echo "<div class='age-details'>";
            echo "<div class='age-item'>";
            echo "<strong>" . $idade->m . "</strong>";
            echo "<small>meses</small>";
            echo "</div>";
            
            echo "<div class='age-item'>";
            echo "<strong>" . $idade->d . "</strong>";
            echo "<small>dias</small>";
            echo "</div>";
            
            echo "<div class='age-item'>";
            echo "<strong>" . number_format($dias_vividos) . "</strong>";
            echo "<small>dias vividos</small>";
            echo "</div>";
            
            echo "<div class='age-item'>";
            echo "<strong>" . number_format($semanas_vividas) . "</strong>";
            echo "<small>semanas vividas</small>";
            echo "</div>";
            
            echo "<div class='age-item'>";
            echo "<strong>" . number_format($meses_vividos) . "</strong>";
            echo "<small>meses vividos</small>";
            echo "</div>";
            
            echo "<div class='age-item'>";
            echo "<strong>" . $idade->y . "</strong>";
            echo "<small>anos completos</small>";
            echo "</div>";
            echo "</div>";
            
            if ($dias_para_aniversario == 0) {
                echo "<div class='next-birthday'>";
                echo "🎉 <strong>Parabéns! Hoje é seu aniversário!</strong> 🎉";
                echo "</div>";
            } else {
                echo "<div class='next-birthday'>";
                echo "🎁 Seu próximo aniversário será em <strong>$dias_para_aniversario dias</strong>";
                echo "<br><small>Data: " . $proximo_aniversario->format('d/m/Y') . "</small>";
                echo "</div>";
            }
            
            echo "</div>";
        }
        ?>
    </div>
</body>
</html> 