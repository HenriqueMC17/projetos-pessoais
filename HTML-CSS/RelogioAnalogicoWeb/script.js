function atualizarRelogio() {
  const agora = new Date();
  const hora = agora.getHours() % 12;
  const minuto = agora.getMinutes();
  const segundo = agora.getSeconds();

  const grauHora = (hora + minuto / 60) * 30;
  const grauMinuto = (minuto + segundo / 60) * 6;
  const grauSegundo = segundo * 6;

  document.getElementById('hour').style.transform = `translateX(-50%) rotate(${grauHora}deg)`;
  document.getElementById('minute').style.transform = `translateX(-50%) rotate(${grauMinuto}deg)`;
  document.getElementById('second').style.transform = `translateX(-50%) rotate(${grauSegundo}deg)`;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();
