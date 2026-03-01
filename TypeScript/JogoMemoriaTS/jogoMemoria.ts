import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const cartas = ['A','A','B','B','C','C','D','D'];
let embaralhadas = cartas.sort(() => Math.random() - 0.5);
let abertas: boolean[] = Array(8).fill(false);
let tentativas = 0;

function exibir() {
  let linha = embaralhadas.map((c, i) => abertas[i] ? c : i+1).join(' ');
  console.log(`Cartas: ${linha}`);
}

function jogar() {
  if (abertas.every(x => x)) {
    console.log(`Parabéns! Você venceu em ${tentativas} tentativas.`);
    rl.close();
    return;
  }
  exibir();
  rl.question('Escolha duas cartas (ex: 1 2): ', (resp) => {
    const [a, b] = resp.split(' ').map(x => parseInt(x)-1);
    if (a === b || abertas[a] || abertas[b] || a < 0 || b < 0 || a > 7 || b > 7) {
      console.log('Escolha inválida.');
      jogar();
      return;
    }
    tentativas++;
    if (embaralhadas[a] === embaralhadas[b]) {
      abertas[a] = abertas[b] = true;
      console.log('Par!');
    } else {
      console.log(`Errado! (${embaralhadas[a]}, ${embaralhadas[b]})`);
    }
    jogar();
  });
}

console.log('=== Jogo da Memória ===');
jogar(); 