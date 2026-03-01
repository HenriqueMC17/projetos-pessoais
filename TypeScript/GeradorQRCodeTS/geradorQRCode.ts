import * as QRCode from 'qrcode';

const texto = process.argv[2] || 'Hello, QR!';
QRCode.toString(texto, { type: 'terminal' }, (err, url) => {
  if (err) return console.error('Erro ao gerar QR Code:', err);
  console.log(url);
}); 