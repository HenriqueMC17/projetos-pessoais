# Jogo da Forca

## Descrição
Este projeto implementa o clássico jogo da forca no terminal. O jogador deve adivinhar uma palavra oculta, uma letra por vez, antes que o boneco seja completamente desenhado.

## Funcionalidades
- Jogo da forca completo no terminal
- Palavras em português brasileiro
- Diferentes categorias de palavras (animais, frutas, países, etc.)
- Interface visual com ASCII art
- Sistema de pontuação
- Histórico de jogos
- Dicas para as palavras
- Modo multiplayer (dois jogadores)

## Como jogar
1. Execute o arquivo `jogo_forca.py`
2. Escolha uma categoria de palavras
3. Tente adivinhar a palavra letra por letra
4. Você tem 6 tentativas antes de perder
5. Complete a palavra antes que o boneco seja enforcado

## Tecnologias utilizadas
- Python 3.x
- Biblioteca random (para seleção aleatória de palavras)
- Biblioteca os (para limpeza de tela)

## Estrutura do projeto
```
JogoDaForca/
├── README.md
├── jogo_forca.py
└── requirements.txt
```

## Regras do jogo
- Você tem 6 tentativas para adivinhar a palavra
- Cada letra incorreta desenha uma parte do boneco
- Letras já tentadas são mostradas
- Você pode tentar adivinhar a palavra completa a qualquer momento
- Ganha quem adivinhar a palavra antes de ser enforcado 