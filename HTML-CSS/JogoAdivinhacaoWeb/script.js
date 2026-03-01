let numero = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;

function tentar() {
  const palpite = parseInt(document.getElementById('palpite').value);
  const mensagem = document.getElementById('mensagem');
  if (!palpite || palpite < 1 || palpite > 100) {
    mensagem.textContent = 'Digite um número entre 1 e 100!';
    return;
  }
  tentativas++;
  if (palpite < numero) {
    mensagem.textContent = 'Maior!';
  } else if (palpite > numero) {
    mensagem.textContent = 'Menor!';
  } else {
    mensagem.textContent = `Parabéns! Você acertou em ${tentativas} tentativas.`;
  }
}

function reiniciar() {
  numero = Math.floor(Math.random() * 100) + 1;
  tentativas = 0;
  document.getElementById('mensagem').textContent = '';
  document.getElementById('palpite').value = '';
}
