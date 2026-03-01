let qr;
function gerarQRCode() {
  const texto = document.getElementById('texto').value;
  if (!qr) {
    qr = new QRious({
      element: document.createElement('canvas'),
      size: 220,
      value: texto
    });
    document.getElementById('qrcode').appendChild(qr.element);
  } else {
    qr.value = texto;
  }
}
