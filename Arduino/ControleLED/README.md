# Controle de LED RGB

## Descrição
Sistema de controle de LED RGB usando Arduino. Permite criar diferentes cores e efeitos luminosos.

## Componentes Necessários
- Arduino Uno/Nano
- LED RGB (ânodo comum ou cátodo comum)
- 3 resistores 220Ω
- Jumpers

## Conexões
- **LED RGB (ânodo comum):**
  - Vermelho → Pino 9 (via resistor 220Ω)
  - Verde → Pino 10 (via resistor 220Ω)
  - Azul → Pino 11 (via resistor 220Ω)
  - Ânodo comum → 5V

## Funcionalidades
- Controle individual de cada cor (R, G, B)
- Criação de cores mistas
- Sequência automática de cores
- Controle de intensidade via PWM

## Como Usar
1. Conecte os componentes conforme o esquema
2. Faça upload do código para o Arduino
3. O LED executará a sequência de cores automaticamente

## Código
O arquivo `ControleLED.ino` contém:
- Configuração dos pinos PWM
- Função para definir cores
- Sequência de cores predefinidas

## Cores Disponíveis
- Vermelho (255, 0, 0)
- Verde (0, 255, 0)
- Azul (0, 0, 255)
- Amarelo (255, 255, 0)
- Magenta (255, 0, 255)
- Ciano (0, 255, 255)
- Branco (255, 255, 255)

## Ajustes
- Modifique a velocidade alterando o `delay(1000)`
- Crie novas cores alterando os valores RGB
- Para LED cátodo comum, inverta os valores

## Aplicações
- Iluminação decorativa
- Indicadores de status
- Efeitos visuais
- Projetos artísticos
- Sinalização 

## Exemplo de Uso
Após montar o circuito e enviar o código, o LED RGB irá alternar automaticamente entre as cores listadas. No Serial Monitor (9600 baud), será exibido:

```
Controle de LED RGB
Vermelho
Verde
Azul
Amarelo
Magenta
Ciano
Branco
Apagado
```

## Esquema do Circuito
Inclua uma imagem ou diagrama do circuito aqui para facilitar a montagem. 