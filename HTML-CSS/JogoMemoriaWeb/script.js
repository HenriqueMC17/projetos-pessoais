const emojis = ['🍎','🍌','🍇','🍉','🍒','🍋','🍓','🍑'];
let cartas = [];
let viradas = [];
let completas = [];
let bloqueado = false;
let tentativas = 0;

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function criarTabuleiro() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  cartas = [...emojis, ...emojis];
  embaralhar(cartas);
  viradas = [];
  completas = [];
  tentativas = 0;
  atualizarStatus();
  cartas.forEach((emoji, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = i;
    card.onclick = () => virarCarta(i);
    board.appendChild(card);
  });
}

function virarCarta(i) {
  if (bloqueado) return;
  if (viradas.includes(i) || completas.includes(i)) return;
  viradas.push(i);
  atualizarTabuleiro();
  if (viradas.length === 2) {
    tentativas++;
    bloqueado = true;
    setTimeout(() => {
      const [a, b] = viradas;
      if (cartas[a] === cartas[b]) {
        completas.push(a, b);
      }
      viradas = [];
      atualizarTabuleiro();
      atualizarStatus();
      bloqueado = false;
      if (completas.length === cartas.length) {
        document.getElementById('status').textContent = `Parabéns! Você venceu em ${tentativas} tentativas.`;
      }
    }, 800);
  }
}

function atualizarTabuleiro() {
  document.querySelectorAll('.card').forEach((card, i) => {
    if (completas.includes(i)) {
      card.textContent = cartas[i];
      card.className = 'card completa';
    } else if (viradas.includes(i)) {
      card.textContent = cartas[i];
      card.className = 'card virada';
    } else {
      card.textContent = '';
      card.className = 'card';
    }
  });
}

function atualizarStatus() {
  document.getElementById('status').textContent = `Tentativas: ${tentativas}`;
}

function reiniciarJogo() {
  criarTabuleiro();
}

window.onload = criarTabuleiro;
