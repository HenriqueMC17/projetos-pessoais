# Display de 7 Segmentos

## Descrição
Sistema de controle de display de 7 segmentos usando Arduino. Exibe números de 0 a 9 em sequência.

## Componentes Necessários
- Arduino Uno/Nano
- Display de 7 segmentos (ânodo comum ou cátodo comum)
- 7 resistores 220Ω
- Jumpers

## Conexões
- **Display de 7 segmentos (ânodo comum):**
  - a → Pino 2 (via resistor 220Ω)
  - b → Pino 3 (via resistor 220Ω)
  - c → Pino 4 (via resistor 220Ω)
  - d → Pino 5 (via resistor 220Ω)
  - e → Pino 6 (via resistor 220Ω)
  - f → Pino 7 (via resistor 220Ω)
  - g → Pino 8 (via resistor 220Ω)
  - COM → GND

## Funcionalidades
- Exibição de números de 0 a 9
- Contagem automática
- Controle individual de cada segmento
- Interface simples e eficiente

## Como Usar
1. Conecte os componentes conforme o esquema
2. Faça upload do código para o Arduino
3. O display mostrará a contagem de 0 a 9

## Código
O arquivo `Display7Segmentos.ino` contém:
- Configuração dos pinos de cada segmento
- Função para exibir cada número
- Loop principal de contagem

## Ajustes
- Modifique a velocidade alterando o `delay(1000)`
- Ajuste os pinos conforme sua conexão
- Para display cátodo comum, inverta os valores HIGH/LOW

## Tipos de Display
- **Ânodo Comum:** Segmentos ligam com HIGH
- **Cátodo Comum:** Segmentos ligam com LOW

## Aplicações
- Contadores digitais
- Relógios
- Medidores
- Indicadores de status
- Projetos educacionais 

## Exemplo de Uso
Após montar o circuito e enviar o código, o display irá mostrar os números de 0 a 9 em sequência, mudando a cada segundo.

## Exemplo de Saída
No display:
```
0 1 2 3 4 5 6 7 8 9 (repetindo)
```

## Esquema do Circuito
Inclua uma imagem ou diagrama do circuito aqui para facilitar a montagem. 