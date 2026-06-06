# Sensor de Luminosidade

## Descrição
Sistema de detecção de luminosidade usando LDR (Light Dependent Resistor) com Arduino. Detecta o nível de luz ambiente e controla um LED automaticamente.

## Componentes Necessários
- Arduino Uno/Nano
- LDR (Light Dependent Resistor)
- Resistor 10kΩ
- LED
- Resistor 220Ω (para o LED)
- Jumpers

## Conexões
- **LDR:**
  - Uma perna → 5V
  - Outra perna → Pino A0 + Resistor 10kΩ → GND
- **LED:**
  - (+) → Pino 13 (via resistor 220Ω)
  - (-) → GND

## Funcionalidades
- Detecção de luminosidade ambiente
- Controle automático de LED
- Monitoramento via Serial Monitor
- Sistema de iluminação automática

## Como Usar
1. Conecte os componentes conforme o esquema
2. Faça upload do código para o Arduino
3. Abra o Serial Monitor (9600 baud)
4. O LED ligará automaticamente em ambientes escuros

## Código
O arquivo `SensorLuminosidade.ino` contém:
- Leitura do sensor LDR
- Lógica de controle do LED
- Monitoramento via Serial

## Ajustes
- Ajuste o limiar de luminosidade alterando o valor em `if (luminosidade < 300)`
- Modifique o intervalo de leitura alterando o `delay(1000)`
- Calibre o sensor para seu ambiente específico

## Aplicações
- Iluminação automática
- Detector de presença
- Sistema de economia de energia
- Monitoramento ambiental 

## Exemplo de Uso
Após montar o circuito e enviar o código, a luminosidade será exibida no Serial Monitor a cada segundo. O LED acenderá automaticamente em ambientes escuros.

## Exemplo de Saída no Serial Monitor
```
Sensor de Luminosidade
Luminosidade: 800
Ambiente claro - LED desligado
Luminosidade: 200
Ambiente escuro - LED ligado
```

## Esquema do Circuito
Inclua uma imagem ou diagrama do circuito aqui para facilitar a montagem. 