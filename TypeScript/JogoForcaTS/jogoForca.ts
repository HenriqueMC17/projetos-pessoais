import * as readline from 'readline';

const palavras = ['typescript', 'programa', 'computador', 'desenvolvedor', 'algoritmo'];
const palavra = palavras[Math.floor(Math.random() * palavras.length)];
let resposta = Array(palavra.length).fill('_');
let tentativas = 6;
let letrasErradas: string[] = [];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function exibir() {
  console.log(`\nPalavra: ${resposta.join(' ')}`);
  console.log(`Tentativas restantes: ${tentativas}`);
  console.log(`Letras erradas: ${letrasErradas.join(', ')}`);
}

function jogar() {
  exibir();
  if (tentativas === 0) {
    console.log(`Você perdeu! A palavra era: ${palavra}`);
    rl.close();
    return;
  }
  if (!resposta.includes('_')) {
    console.log('Parabéns! Você ganhou!');
    rl.close();
    return;
  }
  rl.question('Digite uma letra: ', (letra) => {
    letra = letra.toLowerCase();
    if (letra.length !== 1 || !/[a-z]/.test(letra)) {
      console.log('Digite apenas uma letra.');
      jogar();
      return;
    }
    if (resposta.includes(letra) || letrasErradas.includes(letra)) {
      console.log('Letra já usada.');
      jogar();
      return;
    }
    if (palavra.includes(letra)) {
      for (let i = 0; i < palavra.length; i++) {
        if (palavra[i] === letra) resposta[i] = letra;
      }
    } else {
      tentativas--;
      letrasErradas.push(letra);
    }
    jogar();
  });
}

console.log('=== Jogo da Forca ===');
jogar(); 