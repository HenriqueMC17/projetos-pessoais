const form = document.getElementById('form');
const resultado = document.getElementById('resultado');

form.onsubmit = function(e) {
  e.preventDefault();
  const valor = parseFloat(document.getElementById('valor').value);
  const de = document.getElementById('de').value;
  const para = document.getElementById('para').value;
  let res = 0;
  if (de === para) {
    resultado.textContent = `Resultado: ${valor} ${para}`;
    return;
  }
  switch (de + ':' + para) {
    case 'C:F': res = valor * 9/5 + 32; break;
    case 'C:K': res = valor + 273.15; break;
    case 'F:C': res = (valor - 32) * 5/9; break;
    case 'F:K': res = (valor - 32) * 5/9 + 273.15; break;
    case 'K:C': res = valor - 273.15; break;
    case 'K:F': res = (valor - 273.15) * 9/5 + 32; break;
    default: resultado.textContent = 'Conversão não suportada.'; return;
  }
  resultado.textContent = `Resultado: ${res.toFixed(2)} ${para}`;
};
