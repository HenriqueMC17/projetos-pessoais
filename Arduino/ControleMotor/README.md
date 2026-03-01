# Controle de Motor DC

## Descrição
Sistema de controle de motor DC usando driver L298N com Arduino. Permite controlar a direção e velocidade do motor.

## Componentes Necessários
- Arduino Uno/Nano
- Driver L298N
- Motor DC
- Fonte de alimentação 12V
- Jumpers

## Conexões
- **Driver L298N:**
  - ENA → Pino 9 (PWM)
  - IN1 → Pino 2
  - IN2 → Pino 3
  - GND → GND
  - VCC → 5V (lógica)
  - VM → 12V (alimentação do motor)
- **Motor DC:**
  - Terminal 1 → OUT1 do driver
  - Terminal 2 → OUT2 do driver

## Funcionalidades
- Controle de direção do motor (frente/trás)
- Controle de velocidade via PWM
- Sequência automática de movimento
- Monitoramento via Serial Monitor

## Como Usar
1. Conecte os componentes conforme o esquema
2. Alimente o driver com 12V para o motor
3. Faça upload do código para o Arduino
4. O motor executará a sequência: frente → trás → parado

## Código
O arquivo `ControleMotor.ino` contém:
- Configuração dos pinos de controle
- Sequência de movimento do motor
- Controle de velocidade via PWM

## Ajustes
- Modifique a velocidade alterando o valor em `analogWrite(enA, 200)` (0-255)
- Ajuste os tempos de movimento alterando os `delay()`
- Adicione mais sequências de movimento conforme necessário

## Segurança
- Use fonte de alimentação adequada para o motor
- Verifique as conexões antes de ligar
- O driver L298N possui proteção térmica 

## Exemplo de Uso
Após montar o circuito e enviar o código, o motor irá girar para frente, depois para trás e então parar, repetindo a sequência.

## Exemplo de Saída no Serial Monitor
```
Controle de Motor DC
Motor para frente
Motor para trás
Motor parado
```

## Esquema do Circuito
Inclua uma imagem ou diagrama do circuito aqui para facilitar a montagem. 