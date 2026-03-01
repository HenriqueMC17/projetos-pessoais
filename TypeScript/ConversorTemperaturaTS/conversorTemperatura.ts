import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function menu() {
  console.log('=== Conversor de Temperatura ===');
  console.log('1. Celsius -> Fahrenheit');
  console.log('2. Celsius -> Kelvin');
  console.log('3. Fahrenheit -> Celsius');
  console.log('4. Kelvin -> Celsius');
  console.log('0. Sair');
  rl.question('Escolha: ', (op) => {
    if (op === '0') return rl.close();
    rl.question('Valor: ', (valor) => {
      const v = parseFloat(valor);
      let res = 0;
      switch (op) {
        case '1': res = v * 9/5 + 32; console.log(`${v}°C = ${res}°F`); break;
        case '2': res = v + 273.15; console.log(`${v}°C = ${res}K`); break;
        case '3': res = (v - 32) * 5/9; console.log(`${v}°F = ${res}°C`); break;
        case '4': res = v - 273.15; console.log(`${v}K = ${res}°C`); break;
        default: console.log('Opção inválida.');
      }
      menu();
    });
  });
}

menu(); 