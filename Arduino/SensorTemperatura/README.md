# Sensor de Temperatura

## Descrição
Sistema de monitoramento de temperatura usando sensor LM35 com Arduino. Mede temperatura ambiente e fornece alertas visuais.

## Componentes Necessários
- Arduino Uno/Nano
- Sensor LM35
- LED
- Resistor 220Ω (para o LED)
- Jumpers

## Conexões
- **Sensor LM35:**
  - VCC → 5V
  - GND → GND
  - OUT → Pino A0
- **LED:**
  - (+) → Pino 13 (via resistor 220Ω)
  - (-) → GND

## Funcionalidades
- Medição precisa de temperatura (0-100°C)
- Conversão automática para Celsius
- Alerta visual com LED para temperaturas altas
- Monitoramento via Serial Monitor

## Como Usar
1. Conecte os componentes conforme o esquema
2. Faça upload do código para o Arduino
3. Abra o Serial Monitor (9600 baud)
4. A temperatura será exibida a cada 2 segundos

## Código
O arquivo `SensorTemperatura.ino` contém:
- Leitura do sensor LM35
- Conversão de tensão para temperatura
- Lógica de alerta com LED

## Ajustes
- Modifique o limiar de temperatura em `if (temperatura > 30)`
- Ajuste o intervalo de leitura alterando o `delay(2000)`
- Calibre o sensor se necessário

## Especificações do LM35
- Faixa de medição: 0°C a 100°C
- Precisão: ±0.5°C
- Tensão de saída: 10mV/°C
- Alimentação: 4V a 20V

## Aplicações
- Monitoramento ambiental
- Sistema de refrigeração
- Controle de temperatura
- Estação meteorológica

## Exemplo de Uso
Após montar o circuito e enviar o código, a temperatura será exibida no Serial Monitor a cada 2 segundos. O LED acenderá se a temperatura ultrapassar o limite definido.

## Exemplo de Saída no Serial Monitor
```
Sensor de Temperatura LM35
Temperatura: 25.30 °C
Temperatura: 25.40 °C
Temperatura: 31.00 °C
Temperatura alta!
```

## Esquema do Circuito
Inclua uma imagem ou diagrama do circuito aqui para facilitar a montagem.
