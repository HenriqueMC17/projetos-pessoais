function validarEmail() {
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem');
  const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  if (regex.test(email)) {
    mensagem.textContent = 'E-mail válido!';
    mensagem.style.color = '#4caf50';
  } else {
    mensagem.textContent = 'E-mail inválido!';
    mensagem.style.color = '#e33';
  }
}
