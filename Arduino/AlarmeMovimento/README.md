# Alarme de Movimento

## Descrição
Sistema de alarme de movimento usando sensor PIR (Passive Infrared) com Arduino. Detecta movimento e ativa um alarme sonoro e visual.

## Componentes Necessários
- Arduino Uno/Nano
- Sensor PIR (Passive Infrared)
- Buzzer
- LED
- Resistor 220Ω (para o LED)
- Jumpers

## Conexões
- **Sensor PIR:**
  - VCC → 5V
  - GND → GND
  - OUT → Pino 2
- **Buzzer:**
  - (+) → Pino 8
  - (-) → GND
- **LED:**
  - (+) → Pino 13 (via resistor 220Ω)
  - (-) → GND

## Funcionalidades
- Detecção de movimento via sensor PIR
- Alarme sonoro com buzzer
- Indicador visual com LED
- Monitoramento via Serial Monitor

## Como Usar
1. Conecte os componentes conforme o esquema
2. Faça upload do código para o Arduino
3. Abra o Serial Monitor (9600 baud)
4. O alarme detectará movimento e ativará o buzzer

## Código
O arquivo `AlarmeMovimento.ino` contém o código completo com:
- Configuração dos pinos
- Loop principal de detecção
- Ativação do alarme sonoro e visual

## Ajustes
- Ajuste a frequência do buzzer alterando o valor em `tone(buzzerPin, 1000)`
- Modifique o tempo de alarme alterando o `delay(2000)`
- Ajuste a sensibilidade do sensor PIR se necessário

## Exemplo de Uso
Após montar o circuito e enviar o código, o sistema detectará movimentos e ativará o buzzer e o LED. As mensagens serão exibidas no Serial Monitor.

## Exemplo de Saída no Serial Monitor
```
Alarme de movimento ativado!
Movimento detectado! ALARME!
```

## Esquema do Circuito
Inclua uma imagem ou diagrama do circuito aqui para facilitar a montagem.
