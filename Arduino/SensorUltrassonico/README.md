# Sensor Ultrassônico HC-SR04

## Descrição
Sistema de medição de distância usando sensor ultrassônico HC-SR04 com Arduino. Exibe a distância medida no Serial Monitor.

## Componentes Necessários
- Arduino Uno/Nano
- Sensor ultrassônico HC-SR04
- Jumpers

## Conexões
- **HC-SR04:**
  - VCC → 5V
  - GND → GND
  - TRIG → Pino 9
  - ECHO → Pino 10

## Funcionalidades
- Medição de distância em centímetros
- Exibição dos valores no Serial Monitor
- Atualização a cada meio segundo

## Como Usar
1. Conecte os componentes conforme o esquema
2. Faça upload do código para o Arduino
3. Abra o Serial Monitor (9600 baud)
4. A distância será exibida a cada 0,5 segundo

## Código
O arquivo `SensorUltrassonico.ino` contém:
- Envio de pulso ultrassônico
- Cálculo da distância
- Exibição no Serial Monitor

## Ajustes
- Modifique o intervalo de leitura alterando o `delay(500)`
- Altere os pinos conforme necessário

## Exemplo de Uso
Após montar o circuito e enviar o código, aproxime ou afaste objetos do sensor. O Serial Monitor exibirá:

```
Distância: 25.00 cm
Distância: 30.50 cm
Distância: 10.20 cm
```

## Esquema do Circuito
Inclua uma imagem ou diagrama do circuito aqui para facilitar a montagem.

## Aplicações
- Robótica móvel
- Medidores de nível
- Sistemas de estacionamento
