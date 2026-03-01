# Cronômetro

## Descrição
Este projeto implementa um cronômetro simples no terminal com funcionalidades de contagem regressiva e cronômetro. Permite medir tempo de forma precisa e oferece diferentes modos de operação.

## Funcionalidades
- Cronômetro com contagem crescente
- Timer com contagem regressiva
- Interface visual no terminal
- Controle de pausa e retomada
- Histórico de tempos medidos
- Diferentes formatos de exibição
- Sons de alerta (opcional)
- Modo de tela cheia

## Como usar
1. Execute o arquivo `cronometro.py`
2. Escolha entre cronômetro ou timer
3. Configure o tempo desejado (para timer)
4. Use os controles para iniciar, pausar e parar
5. Visualize o histórico de medições

## Tecnologias utilizadas
- Python 3.x
- Biblioteca time (para controle de tempo)
- Biblioteca threading (para execução em paralelo)
- Biblioteca os (para limpeza de tela)

## Estrutura do projeto
```
Cronometro/
├── README.md
├── cronometro.py
└── requirements.txt
```

## Funcionalidades de controle
- Iniciar cronômetro/timer
- Pausar e retomar
- Parar e resetar
- Salvar tempo atual
- Histórico de medições
- Formatação de tempo (HH:MM:SS)

## Modos de operação
- Cronômetro: conta o tempo decorrido
- Timer: conta regressivamente até zero
- Modo contínuo: executa indefinidamente
- Modo com limite: para em tempo específico 