import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function menu() {
  console.log('=== Conversor de Unidades ===');
  console.log('1. Peso (g, kg, t)');
  console.log('2. Distância (m, km, mi)');
  console.log('0. Sair');
  rl.question('Escolha a opção: ', (op) => {
    if (op === '1') peso();
    else if (op === '2') distancia();
    else rl.close();
  });
}

function peso() {
  rl.question('Valor: ', (valor) => {
    const v = parseFloat(valor);
    rl.question('Unidade de origem (g/kg/t): ', (origem) => {
      rl.question('Unidade de destino (g/kg/t): ', (destino) => {
        let base = origem === 'kg' ? v * 1000 : origem === 't' ? v * 1000000 : v;
        let res = destino === 'kg' ? base / 1000 : destino === 't' ? base / 1000000 : base;
        console.log(`${v} ${origem} = ${res} ${destino}`);
        menu();
      });
    });
  });
}

function distancia() {
  rl.question('Valor: ', (valor) => {
    const v = parseFloat(valor);
    rl.question('Unidade de origem (m/km/mi): ', (origem) => {
      rl.question('Unidade de destino (m/km/mi): ', (destino) => {
        let base = origem === 'km' ? v * 1000 : origem === 'mi' ? v * 1609.34 : v;
        let res = destino === 'km' ? base / 1000 : destino === 'mi' ? base / 1609.34 : base;
        console.log(`${v} ${origem} = ${res} ${destino}`);
        menu();
      });
    });
  });
}

menu(); 