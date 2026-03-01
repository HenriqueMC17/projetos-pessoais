# Sensor de Chuva

## Descrição
Sistema de detecção de chuva usando sensor analógico de chuva com Arduino. Acende um LED indicador quando a chuva é detectada.

## Componentes Necessários
- Arduino Uno/Nano
- Sensor de chuva (analógico)
- LED
- Resistor 220Ω (para o LED)
- Jumpers

## Conexões
- **Sensor de chuva:**
  - VCC → 5V
  - GND → GND
  - OUT (analógico) → Pino A0
- **LED:**
  - (+) → Pino 13 (via resistor 220Ω)
  - (-) → GND

## Funcionalidades
- Detecção de chuva via sensor analógico
- Alerta visual com LED
- Monitoramento via Serial Monitor

## Como Usar
1. Conecte os componentes conforme o esquema
2. Faça upload do código para o Arduino
3. Abra o Serial Monitor (9600 baud)
4. O LED acenderá quando a chuva for detectada

## Código
O arquivo `SensorChuva.ino` contém:
- Leitura do sensor de chuva
- Lógica de alerta com LED
- Monitoramento via Serial

## Ajustes
- Modifique o limiar de detecção de chuva alterando o valor em `if (valor < 500)`
- Ajuste o intervalo de leitura alterando o `delay(1000)`
- Calibre o sensor conforme necessário

## Exemplo de Uso
Após montar o circuito e enviar o código, o LED acenderá quando o sensor detectar chuva. O Serial Monitor exibirá:

```
Valor do sensor: 800
Sem chuva.
Valor do sensor: 300
Chuva detectada!
```

## Esquema do Circuito
Inclua uma imagem ou diagrama do circuito aqui para facilitar a montagem.

## Aplicações
- Sistemas de irrigação automática
- Estações meteorológicas
- Alarmes de chuva
