<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validador de Telefone</title>
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
    </style>
</head>
<body>
    <div class="container">
        <h1>📞 Validador de Telefone Brasileiro</h1>
        <form method="POST">
            <div class="form-group">
                <label for="telefone">Telefone:</label>
                <input type="text" id="telefone" name="telefone" placeholder="(99) 99999-9999" value="<?php echo isset($_POST['telefone']) ? htmlspecialchars($_POST['telefone']) : ''; ?>">
            </div>
            <button type="submit">Validar Telefone</button>
        </form>
        <?php
        function limparTelefone($tel) {
            return preg_replace('/[^0-9]/', '', $tel);
        }
        function validarTelefone($tel) {
            $tel = limparTelefone($tel);
            // Aceita DDD + 8 ou 9 dígitos
            return preg_match('/^([1-9]{2})(9[0-9]{8}|[2-8][0-9]{7})$/', $tel);
        }
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['telefone'])) {
            $tel = $_POST['telefone'];
            if (validarTelefone($tel)) {
                echo "<div class='result valid'>✅ Telefone válido!</div>";
            } else {
                echo "<div class='result invalid'>❌ Telefone inválido!</div>";
            }
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo "<div class='result info'>ℹ️ Digite um telefone para validar</div>";
        }
        ?>
        <div style="margin-top:20px; font-size:14px; color:#666;">
            <strong>Exemplos válidos:</strong><br>
            (11) 91234-5678<br>
            (21) 2345-6789<br>
            11912345678<br>
            2123456789
        </div>
    </div>
</body>
</html> 