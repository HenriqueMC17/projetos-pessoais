import React, { useState } from "react";

const taxas = { BRL: 1, USD: 5.2, EUR: 5.7 };

export default function App() {
  const [valor, setValor] = useState(1);
  const [de, setDe] = useState("BRL");
  const [para, setPara] = useState("USD");
  const [resultado, setResultado] = useState("");

  function converter(e) {
    e.preventDefault();
    if (!taxas[de] || !taxas[para]) {
      setResultado("Moeda não suportada.");
      return;
    }
    const emBRL = valor * taxas[de];
    const convertido = emBRL / taxas[para];
    setResultado(`${valor} ${de} = ${convertido.toFixed(2)} ${para}`);
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: 40 }}>
      <h1>Conversor de Moedas</h1>
      <form onSubmit={converter} style={{ display: "inline-flex", gap: 8 }}>
        <input type="number" value={valor} min={0} step="any" onChange={e => setValor(Number(e.target.value))} required style={{ padding: 8, borderRadius: 5, border: "1px solid #bbb" }} />
        <select value={de} onChange={e => setDe(e.target.value)} style={{ padding: 8, borderRadius: 5 }}>
          <option value="BRL">BRL</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <span style={{ alignSelf: "center" }}>→</span>
        <select value={para} onChange={e => setPara(e.target.value)} style={{ padding: 8, borderRadius: 5 }}>
          <option value="USD">USD</option>
          <option value="BRL">BRL</option>
          <option value="EUR">EUR</option>
        </select>
        <button type="submit" style={{ padding: 8, borderRadius: 5, background: "#2196f3", color: "#fff", border: "none" }}>Converter</button>
      </form>
      <div style={{ marginTop: 20, fontSize: "1.2em", color: "#222" }}>{resultado}</div>
    </div>
  );
} 