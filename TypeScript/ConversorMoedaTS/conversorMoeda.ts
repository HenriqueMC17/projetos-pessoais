const taxas: { [k: string]: number } = { BRL: 1, USD: 5.2, EUR: 5.7 };
const de = process.argv[2] || 'BRL';
const para = process.argv[3] || 'USD';
const valor = parseFloat(process.argv[4] || '1');
if (!taxas[de] || !taxas[para]) {
  console.log('Moeda não suportada. Use BRL, USD ou EUR.');
} else {
  const emBRL = valor * taxas[de];
  const convertido = emBRL / taxas[para];
  console.log(`${valor} ${de} = ${convertido.toFixed(2)} ${para}`);
} 