<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerador de Tabela de Multiplicação</title>
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
            padding: 20px;
            background-color: #e9ecef;
            border-radius: 5px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        th, td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: center;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f8f9fa;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧮 Gerador de Tabela de Multiplicação</h1>
        <form method="POST">
            <div class="form-group">
                <label for="numero">Número:</label>
                <input type="number" id="numero" name="numero" min="1" max="100" required value="<?php echo isset($_POST['numero']) ? htmlspecialchars($_POST['numero']) : 5; ?>">
            </div>
            <div class="form-group">
                <label for="limite">Limite:</label>
                <input type="number" id="limite" name="limite" min="1" max="100" required value="<?php echo isset($_POST['limite']) ? htmlspecialchars($_POST['limite']) : 10; ?>">
            </div>
            <button type="submit">Gerar Tabela</button>
        </form>
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['numero']) && isset($_POST['limite'])) {
            $numero = intval($_POST['numero']);
            $limite = intval($_POST['limite']);
            if ($numero > 0 && $limite > 0) {
                echo "<div class='result'>";
                echo "<h3>Tabuada do $numero até $limite</h3>";
                echo "<table>";
                echo "<tr><th>Multiplicação</th><th>Resultado</th></tr>";
                for ($i = 1; $i <= $limite; $i++) {
                    echo "<tr><td>$numero x $i</td><td>" . ($numero * $i) . "</td></tr>";
                }
                echo "</table>";
                echo "</div>";
            }
        }
        ?>
    </div>
</body>
</html> 