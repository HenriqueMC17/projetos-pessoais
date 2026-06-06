const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreDraw = document.getElementById('score-draw');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill('');
let scores = { X: 0, O: 0, draw: 0 };

function updateScoreboard() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraw.textContent = scores.draw;
}

function showMessage(msg) {
  message.textContent = msg;
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // linhas
    [0,3,6], [1,4,7], [2,5,8], // colunas
    [0,4,8], [2,4,6]           // diagonais
  ];
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return { winner: boardState[a], pattern };
    }
  }
  if (boardState.every(cell => cell)) {
    return { winner: 'draw' };
  }
  return null;
}

function handleCellClick(e) {
  const idx = +e.target.dataset.index;
  if (!gameActive || boardState[idx]) return;
  boardState[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add('played');

  const result = checkWinner();
  if (result) {
    gameActive = false;
    if (result.winner === 'draw') {
      showMessage('Empate!');
      scores.draw++;
    } else {
      showMessage(`Vitória de ${result.winner}!`);
      scores[result.winner]++;
      // Destacar células vencedoras
      result.pattern.forEach(i => {
        cells[i].classList.add('winner');
      });
    }
    updateScoreboard();
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  showMessage(`Vez de ${currentPlayer}`);
}

function restartGame() {
  boardState = Array(9).fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner', 'played');
  });
  currentPlayer = 'X';
  gameActive = true;
  showMessage(`Vez de ${currentPlayer}`);
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

// Inicialização
updateScoreboard();
showMessage(`Vez de ${currentPlayer}`); 