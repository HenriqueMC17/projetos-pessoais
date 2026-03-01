# Jogo de Adivinhação

## Descrição
Este projeto implementa um jogo de adivinhação de números onde o jogador deve tentar adivinhar um número aleatório dentro de um intervalo definido. O jogo oferece dicas e mantém estatísticas de jogadas.

## Funcionalidades
- Geração de números aleatórios
- Sistema de dicas (maior/menor)
- Contador de tentativas
- Estatísticas de jogo
- Diferentes níveis de dificuldade
- Interface responsiva
- Animações visuais
- Histórico de jogadas
- Sistema de pontuação

## Como jogar
1. Abra o arquivo `index.html` no navegador
2. Escolha o nível de dificuldade
3. Digite um número no campo de entrada
4. Clique em "Tentar" ou pressione Enter
5. Use as dicas para adivinhar o número
6. Tente adivinhar com o menor número de tentativas

## Tecnologias utilizadas
- HTML5
- CSS3 (com animações e flexbox)
- JavaScript (ES6+)
- LocalStorage para persistência

## Estrutura do projeto
```
JogoAdivinhacao/
├── README.md
├── index.html
├── style.css
└── script.js
```

## Níveis de dificuldade
- Fácil: 1-50 (10 tentativas)
- Médio: 1-100 (15 tentativas)
- Difícil: 1-200 (20 tentativas)
- Expert: 1-500 (25 tentativas)

## Funcionalidades do jogo
- Validação de entrada
- Feedback visual imediato
- Sons de feedback (opcional)
- Modo escuro/claro
- Estatísticas detalhadas
- Recordes pessoais
- Modo multiplayer local 