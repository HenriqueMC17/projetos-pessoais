const form = document.getElementById('form');
const resultado = document.getElementById('resultado');

form.onsubmit = function(e) {
  e.preventDefault();
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  if (!peso || !altura) {
    resultado.textContent = 'Preencha os campos corretamente.';
    return;
  }
  const imc = peso / (altura * altura);
  let classif = '';
  if (imc < 18.5) classif = 'Abaixo do peso';
  else if (imc < 25) classif = 'Peso normal';
  else if (imc < 30) classif = 'Sobrepeso';
  else classif = 'Obesidade';
  resultado.textContent = `IMC: ${imc.toFixed(2)} (${classif})`;
};
