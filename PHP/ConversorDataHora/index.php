<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conversor de Data e Hora</title>
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
            padding: 20px;
            background-color: #e9ecef;
            border-radius: 5px;
        }
        .format-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .format-item {
            background: white;
            padding: 15px;
            border-radius: 5px;
            border: 1px solid #dee2e6;
        }
        .format-name {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .format-value {
            font-family: monospace;
            background-color: #f8f9fa;
            padding: 8px;
            border-radius: 3px;
            word-break: break-all;
        }
        .timezone-info {
            background-color: #d1ecf1;
            border: 1px solid #bee5eb;
            color: #0c5460;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .quick-actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            margin-bottom: 20px;
        }
        .quick-btn {
            padding: 10px;
            background-color: #6c757d;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }
        .quick-btn:hover {
            background-color: #545b62;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🕐 Conversor de Data e Hora</h1>
        
        <form method="POST">
            <div class="form-group">
                <label for="data_hora">Data e Hora:</label>
                <input type="datetime-local" id="data_hora" name="data_hora" 
                       value="<?php echo isset($_POST['data_hora']) ? htmlspecialchars($_POST['data_hora']) : date('Y-m-d\TH:i'); ?>">
            </div>
            
            <div class="form-group">
                <label for="timezone">Fuso Horário:</label>
                <select id="timezone" name="timezone">
                    <?php
                    $timezones = [
                        'America/Sao_Paulo' => 'Brasil (São Paulo)',
                        'America/New_York' => 'EUA (Nova York)',
                        'Europe/London' => 'Reino Unido (Londres)',
                        'Europe/Paris' => 'França (Paris)',
                        'Asia/Tokyo' => 'Japão (Tóquio)',
                        'Australia/Sydney' => 'Austrália (Sydney)',
                        'UTC' => 'UTC (Tempo Universal)'
                    ];
                    
                    $selected_timezone = $_POST['timezone'] ?? 'America/Sao_Paulo';
                    
                    foreach ($timezones as $tz => $name) {
                        $selected = ($selected_timezone === $tz) ? 'selected' : '';
                        echo "<option value='$tz' $selected>$name</option>";
                    }
                    ?>
                </select>
            </div>
            
            <div class="quick-actions">
                <button type="submit" name="agora" class="quick-btn">Agora</button>
                <button type="submit" name="hoje" class="quick-btn">Hoje às 00:00</button>
                <button type="submit" name="amanha" class="quick-btn">Amanhã às 00:00</button>
                <button type="submit" name="semana" class="quick-btn">Próxima Segunda</button>
            </div>
            
            <button type="submit" name="converter">Converter</button>
        </form>

        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $timezone = $_POST['timezone'] ?? 'America/Sao_Paulo';
            date_default_timezone_set($timezone);
            
            $data_hora = null;
            
            // Processar ações rápidas
            if (isset($_POST['agora'])) {
                $data_hora = new DateTime();
            } elseif (isset($_POST['hoje'])) {
                $data_hora = new DateTime('today');
            } elseif (isset($_POST['amanha'])) {
                $data_hora = new DateTime('tomorrow');
            } elseif (isset($_POST['semana'])) {
                $data_hora = new DateTime('next monday');
            } elseif (isset($_POST['data_hora']) && !empty($_POST['data_hora'])) {
                $data_hora = new DateTime($_POST['data_hora']);
            }
            
            if ($data_hora) {
                $formats = [
                    'Data Completa (Brasil)' => $data_hora->format('d/m/Y H:i:s'),
                    'Data Completa (EUA)' => $data_hora->format('m/d/Y h:i:s A'),
                    'Data Completa (ISO)' => $data_hora->format('Y-m-d H:i:s'),
                    'Data Simples' => $data_hora->format('d/m/Y'),
                    'Hora Completa' => $data_hora->format('H:i:s'),
                    'Hora 12h' => $data_hora->format('h:i:s A'),
                    'Dia da Semana' => $data_hora->format('l'),
                    'Dia da Semana (PT)' => $data_hora->format('w') == 0 ? 'Domingo' : 
                                          ($data_hora->format('w') == 1 ? 'Segunda' : 
                                          ($data_hora->format('w') == 2 ? 'Terça' : 
                                          ($data_hora->format('w') == 3 ? 'Quarta' : 
                                          ($data_hora->format('w') == 4 ? 'Quinta' : 
                                          ($data_hora->format('w') == 5 ? 'Sexta' : 'Sábado'))))),
                    'Mês por Extenso' => $data_hora->format('F'),
                    'Mês por Extenso (PT)' => $data_hora->format('n') == 1 ? 'Janeiro' : 
                                            ($data_hora->format('n') == 2 ? 'Fevereiro' : 
                                            ($data_hora->format('n') == 3 ? 'Março' : 
                                            ($data_hora->format('n') == 4 ? 'Abril' : 
                                            ($data_hora->format('n') == 5 ? 'Maio' : 
                                            ($data_hora->format('n') == 6 ? 'Junho' : 
                                            ($data_hora->format('n') == 7 ? 'Julho' : 
                                            ($data_hora->format('n') == 8 ? 'Agosto' : 
                                            ($data_hora->format('n') == 9 ? 'Setembro' : 
                                            ($data_hora->format('n') == 10 ? 'Outubro' : 
                                            ($data_hora->format('n') == 11 ? 'Novembro' : 'Dezembro')))))))))),
                    'Timestamp Unix' => $data_hora->getTimestamp(),
                    'Dia do Ano' => $data_hora->format('z'),
                    'Semana do Ano' => $data_hora->format('W'),
                    'RFC 2822' => $data_hora->format('r'),
                    'ISO 8601' => $data_hora->format('c'),
                    'SQL DateTime' => $data_hora->format('Y-m-d H:i:s'),
                    'SQL Date' => $data_hora->format('Y-m-d'),
                    'SQL Time' => $data_hora->format('H:i:s')
                ];
                
                echo "<div class='result'>";
                echo "<h3>Conversões de Data e Hora</h3>";
                echo "<div class='format-grid'>";
                
                foreach ($formats as $name => $value) {
                    echo "<div class='format-item'>";
                    echo "<div class='format-name'>$name</div>";
                    echo "<div class='format-value'>$value</div>";
                    echo "</div>";
                }
                
                echo "</div>";
                
                echo "<div class='timezone-info'>";
                echo "<strong>Fuso Horário:</strong> " . $timezone . " (" . $data_hora->format('T') . ")<br>";
                echo "<strong>Offset UTC:</strong> " . $data_hora->format('P');
                echo "</div>";
                
                echo "</div>";
            }
        }
        ?>
    </div>
</body>
</html> 