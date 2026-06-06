const taxas = { BRL: 1, USD: 5.2, EUR: 5.7 };
const form = document.getElementById('form');
const resultado = document.getElementById('resultado');

form.onsubmit = function(e) {
  e.preventDefault();
  const valor = parseFloat(document.getElementById('valor').value);
  const de = document.getElementById('de').value;
  const para = document.getElementById('para').value;
  if (!taxas[de] || !taxas[para]) {
    resultado.textContent = 'Moeda não suportada.';
    return;
  }
  const emBRL = valor * taxas[de];
  const convertido = emBRL / taxas[para];
  resultado.textContent = `${valor} ${de} = ${convertido.toFixed(2)} ${para}`;
};
