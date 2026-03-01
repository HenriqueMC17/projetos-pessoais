import React, { useState, useRef } from "react";

function formatar(segundos) {
  const h = String(Math.floor(segundos / 3600)).padStart(2, '0');
  const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
  const s = String(segundos % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function App() {
  const [tempo, setTempo] = useState(0);
  const [rodando, setRodando] = useState(false);
  const intervalo = useRef(null);

  function start() {
    if (!rodando) {
      setRodando(true);
      intervalo.current = setInterval(() => setTempo(t => t + 1), 1000);
    }
  }
  function stop() {
    setRodando(false);
    clearInterval(intervalo.current);
  }
  function reset() {
    stop();
    setTempo(0);
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: 40 }}>
      <h1>Cronômetro</h1>
      <div style={{ fontSize: "2.5em", background: "#222", color: "#fff", width: 220, borderRadius: 10, padding: "20px 0", margin: "30px auto 20px auto", letterSpacing: 2, boxShadow: "0 2px 8px #aaa" }}>{formatar(tempo)}</div>
      <div style={{ display: "flex", justifyContent: "center", gap: 15 }}>
        <button onClick={start} style={btnStyle}>Iniciar</button>
        <button onClick={stop} style={btnStyle}>Parar</button>
        <button onClick={reset} style={btnStyle}>Resetar</button>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: 10,
  fontSize: "1em",
  borderRadius: 5,
  border: "none",
  background: "#2196f3",
  color: "#fff",
  cursor: "pointer",
  transition: "background 0.2s"
}; 