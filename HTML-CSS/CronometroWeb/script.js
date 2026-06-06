let tempo = 0;
let rodando = false;
let intervalo;

function formatar(segundos) {
  const h = String(Math.floor(segundos / 3600)).padStart(2, '0');
  const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
  const s = String(segundos % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function atualizar() {
  document.getElementById('display').textContent = formatar(tempo);
}

function start() {
  if (!rodando) {
    rodando = true;
    intervalo = setInterval(() => {
      tempo++;
      atualizar();
    }, 1000);
  }
}

function stop() {
  rodando = false;
  clearInterval(intervalo);
}

function reset() {
  stop();
  tempo = 0;
  atualizar();
}

window.onload = atualizar;
