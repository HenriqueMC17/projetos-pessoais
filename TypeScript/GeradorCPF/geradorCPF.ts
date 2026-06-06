function gerarCPF(): string {
  let n = [];
  for (let i = 0; i < 9; i++) n.push(Math.floor(Math.random() * 10));
  let d1 = n.reduce((s, v, i) => s + v * (10 - i), 0);
  d1 = 11 - (d1 % 11); if (d1 >= 10) d1 = 0;
  let d2 = n.reduce((s, v, i) => s + v * (11 - i), 0) + d1 * 2;
  d2 = 11 - (d2 % 11); if (d2 >= 10) d2 = 0;
  return `${n.join('')}${d1}${d2}`.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

const qtd = parseInt(process.argv[2]) || 1;
for (let i = 0; i < qtd; i++) {
  console.log(gerarCPF());
} 