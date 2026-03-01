import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('Peso (kg): ', (peso) => {
  rl.question('Altura (m): ', (altura) => {
    const p = parseFloat(peso);
    const a = parseFloat(altura);
    const imc = p / (a * a);
    let classif = '';
    if (imc < 18.5) classif = 'Abaixo do peso';
    else if (imc < 25) classif = 'Peso normal';
    else if (imc < 30) classif = 'Sobrepeso';
    else classif = 'Obesidade';
    console.log(`IMC: ${imc.toFixed(2)} (${classif})`);
    rl.close();
  });
}); 