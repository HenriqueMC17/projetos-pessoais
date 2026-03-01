# Relógio Digital

## Descrição
Relógio digital completo usando Arduino e display LCD 16x2. Exibe hora, minuto, segundo e data atual.

## Componentes Necessários
- Arduino Uno/Nano
- Display LCD 16x2
- Potenciômetro 10kΩ (para contraste)
- Jumpers

## Conexões
- **Display LCD:**
  - VSS → GND
  - VDD → 5V
  - V0 → Potenciômetro (contraste)
  - RS → Pino 12
  - RW → GND
  - E → Pino 11
  - D4 → Pino 5
  - D5 → Pino 4
  - D6 → Pino 3
  - D7 → Pino 2
  - A → 5V (backlight)
  - K → GND (backlight)

## Funcionalidades
- Exibição de hora atual (HH:MM:SS)
- Exibição de data atual (DD/MM/AAAA)
- Atualização em tempo real
- Interface limpa no LCD

## Como Usar
1. Conecte os componentes conforme o esquema
2. Ajuste o contraste com o potenciômetro
3. Faça upload do código para o Arduino
4. O relógio iniciará e mostrará a hora atual

## Código
O arquivo `RelogioDigital.ino` contém:
- Configuração do display LCD
- Biblioteca TimeLib para controle de tempo
- Loop principal de atualização

## Ajustes
- Modifique a hora inicial em `setTime(12, 0, 0, 1, 1, 2024)`
- Ajuste os pinos do LCD se necessário
- Modifique o formato de exibição conforme desejado

## Bibliotecas Necessárias
- LiquidCrystal (incluída no Arduino IDE)
- TimeLib (instalar via Library Manager)

## Melhorias Possíveis
- Adicionar botões para ajustar hora
- Implementar alarme
- Adicionar sensor de temperatura
- Interface com RTC (Real Time Clock) 

## Exemplo de Uso
Após montar o circuito, ajustar o contraste e enviar o código, o LCD exibirá a hora e a data atualizadas a cada segundo.

## Exemplo de Exibição no LCD
```
Hora: 12:00:00
Data: 1/1/2024
```

## Esquema do Circuito
Inclua uma imagem ou diagrama do circuito aqui para facilitar a montagem. 