import React, { useState, useEffect } from "react";

function getHoraAtual() {
  const agora = new Date();
  return agora.toLocaleTimeString('pt-BR', { hour12: false });
}

export default function App() {
  const [hora, setHora] = useState(getHoraAtual());

  useEffect(() => {
    const timer = setInterval(() => setHora(getHoraAtual()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: 40 }}>
      <h1>Relógio Digital</h1>
      <div style={{ fontSize: "2.5em", background: "#222", color: "#fff", width: 220, borderRadius: 10, padding: "20px 0", margin: "30px auto 20px auto", letterSpacing: 2, boxShadow: "0 2px 8px #aaa" }}>{hora}</div>
    </div>
  );
} 