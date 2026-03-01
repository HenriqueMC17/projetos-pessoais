import * as readline from 'readline';

let tempo = 0;
let rodando = false;
let intervalo: NodeJS.Timeout;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function exibir() {
  const min = Math.floor(tempo / 60);
  const seg = tempo % 60;
  console.log(`Tempo: ${min}:${seg < 10 ? '0' : ''}${seg}`);
}

function menu() {
  rl.question('Comando (start/stop/reset/exit): ', (cmd) => {
    if (cmd === 'start' && !rodando) {
      rodando = true;
      intervalo = setInterval(() => { tempo++; exibir(); }, 1000);
    } else if (cmd === 'stop' && rodando) {
      rodando = false;
      clearInterval(intervalo);
    } else if (cmd === 'reset') {
      tempo = 0;
      exibir();
    } else if (cmd === 'exit') {
      rl.close();
      process.exit(0);
    }
    menu();
  });
}

console.log('=== Cronômetro ===');
exibir();
menu(); 