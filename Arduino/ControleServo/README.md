# Controle de Servo Motor

## Descrição
Sistema de controle de servo motor usando Arduino. Permite controlar a posição do servo de 0 a 180 graus.

## Componentes Necessários
- Arduino Uno/Nano
- Servo Motor (SG90 ou similar)
- Fonte de alimentação 5V (opcional)
- Jumpers

## Conexões
- **Servo Motor:**
  - Fio Vermelho (VCC) → 5V
  - Fio Marrom/Preto (GND) → GND
  - Fio Laranja/Amarelo (Sinal) → Pino 9

## Funcionalidades
- Controle de posição de 0 a 180 graus
- Movimento suave e controlado
- Monitoramento via Serial Monitor
- Movimento automático de varredura

## Como Usar
1. Conecte o servo motor conforme o esquema
2. Faça upload do código para o Arduino
3. O servo executará movimento de varredura automático
4. Monitore as posições via Serial Monitor

## Código
O arquivo `ControleServo.ino` contém:
- Biblioteca Servo para controle
- Loop de movimento de varredura
- Monitoramento de posição

## Ajustes
- Modifique a velocidade alterando o `delay(15)`
- Ajuste a faixa de movimento alterando os valores 0 e 180
- Adicione posições específicas conforme necessário

## Bibliotecas Necessárias
- Servo (incluída no Arduino IDE)

## Tipos de Servo
- **SG90:** Pequeno, 180°, 1.8kg/cm
- **MG996R:** Médio, 180°, 10kg/cm
- **DS3218:** Grande, 270°, 20kg/cm

## Aplicações
- Braços robóticos
- Controle de direção
- Sistemas de abertura/fechamento
- Projetos de automação 

## Exemplo de Uso
Após montar o circuito e enviar o código, o servo motor irá girar suavemente de 0 a 180 graus e depois retornar para 0, repetidamente.

## Exemplo de Saída no Serial Monitor
```
Controle de Servo Motor
Posição: 0
Posição: 1
...
Posição: 180
Posição: 179
...
Posição: 0
```

## Esquema do Circuito
Inclua uma imagem ou diagrama do circuito aqui para facilitar a montagem. 