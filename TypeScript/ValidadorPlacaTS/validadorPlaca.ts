import * as process from 'process';
const placa = process.argv[2] || '';
const regexAntiga = /^[A-Z]{3}-?\d{4}$/i;
const regexMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/i;

if (regexAntiga.test(placa)) {
  console.log('Placa válida (antiga)');
} else if (regexMercosul.test(placa)) {
  console.log('Placa válida (Mercosul)');
} else {
  console.log('Placa inválida');
} 