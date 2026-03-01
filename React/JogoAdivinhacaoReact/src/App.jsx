import React, { useState } from "react";

function gerarNumero() {
  return Math.floor(Math.random() * 100) + 1;
}

export default function App() {
  const [numero, setNumero] = useState(gerarNumero());
  const [palpite, setPalpite] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tentativas, setTentativas] = useState(0);

  function tentar(e) {
    e.preventDefault();
    const n = parseInt(palpite);
    if (!n || n < 1 || n > 100) {
      setMensagem("Digite um número entre 1 e 100!");
      return;
    }
    setTentativas(t => t + 1);
    if (n < numero) setMensagem("Maior!");
    else if (n > numero) setMensagem("Menor!");
    else setMensagem(`Parabéns! Você acertou em ${tentativas + 1} tentativas.`);
  }
  function reiniciar() {
    setNumero(gerarNumero());
    setPalpite("");
    setMensagem("");
    setTentativas(0);
  }
  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: 40 }}>
      <h1>Jogo de Adivinhação</h1>
      <p>Adivinhe o número entre 1 e 100!</p>
      <form onSubmit={tentar} style={{ display: "inline-flex", gap: 8 }}>
        <input type="number" value={palpite} onChange={e => setPalpite(e.target.value)} placeholder="Seu palpite" min={1} max={100} style={{ padding: 8, borderRadius: 5, border: "1px solid #bbb", width: 120 }} />
        <button type="submit" style={{ padding: 8, borderRadius: 5, background: "#2196f3", color: "#fff", border: "none" }}>Tentar</button>
      </form>
      <div style={{ marginTop: 20, fontSize: "1.2em", minHeight: "1.5em", color: mensagem.startsWith("Parabéns") ? "#4caf50" : "#222" }}>{mensagem}</div>
      <button onClick={reiniciar} style={{ padding: 10, fontSize: "1em", borderRadius: 5, background: "#2196f3", color: "#fff", border: "none", marginTop: 10 }}>Reiniciar</button>
    </div>
  );
} 