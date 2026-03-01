# Controle de Relé com Botão

## Descrição
Sistema de controle de relé usando um botão com Arduino. Permite ligar e desligar dispositivos de maior potência de forma segura.

## Componentes Necessários
- Arduino Uno/Nano
- Módulo relé
- Botão
- Resistor 10kΩ (pull-up, se necessário)
- Jumpers

## Conexões
- **Relé:**
  - IN → Pino 8
  - VCC → 5V
  - GND → GND
- **Botão:**
  - Um terminal → Pino 7
  - Outro terminal → GND

## Funcionalidades
- Liga/desliga o relé ao pressionar o botão
- Debounce por software
- Controle de dispositivos externos (lâmpadas, ventiladores, etc.)

## Como Usar
1. Conecte os componentes conforme o esquema
2. Faça upload do código para o Arduino
3. Pressione o botão para alternar o estado do relé

## Código
O arquivo `ControleRele.ino` contém:
- Lógica de debounce
- Controle do relé

## Ajustes
- Modifique o tempo de debounce alterando o valor em `delay(200)`
- Altere os pinos conforme necessário

## Exemplo de Uso
Após montar o circuito e enviar o código, pressione o botão para ligar ou desligar o relé. O relé alternará entre os estados a cada clique.

## Esquema do Circuito
Inclua uma imagem ou diagrama do circuito aqui para facilitar a montagem.

## Aplicações
- Automação residencial
- Controle de cargas AC/DC
- Sistemas de segurança
