const form = document.getElementById('form');
const input = document.getElementById('nova-tarefa');
const lista = document.getElementById('lista');

form.onsubmit = function(e) {
  e.preventDefault();
  const texto = input.value.trim();
  if (!texto) return;
  adicionarTarefa(texto);
  input.value = '';
};

function adicionarTarefa(texto) {
  const li = document.createElement('li');
  li.textContent = texto;
  li.onclick = () => li.classList.toggle('feita');
  const btn = document.createElement('button');
  btn.textContent = 'Remover';
  btn.className = 'remover';
  btn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
  };
  li.appendChild(btn);
  lista.appendChild(li);
}
