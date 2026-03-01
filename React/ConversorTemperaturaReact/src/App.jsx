import React, { useState } from "react";

export default function App() {
  const [valor, setValor] = useState("");
  const [de, setDe] = useState("C");
  const [para, setPara] = useState("F");
  const [resultado, setResultado] = useState("");

  function converter(e) {
    e.preventDefault();
    const v = parseFloat(valor);
    let res = 0;
    if (de === para) {
      setResultado(`Resultado: ${v} ${para}`);
      return;
    }
    switch (de + ":" + para) {
      case "C:F": res = v * 9/5 + 32; break;
      case "C:K": res = v + 273.15; break;
      case "F:C": res = (v - 32) * 5/9; break;
      case "F:K": res = (v - 32) * 5/9 + 273.15; break;
      case "K:C": res = v - 273.15; break;
      case "K:F": res = (v - 273.15) * 9/5 + 32; break;
      default: setResultado("Conversão não suportada."); return;
    }
    setResultado(`Resultado: ${res.toFixed(2)} ${para}`);
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: 40 }}>
      <h1>Conversor de Temperatura</h1>
      <form onSubmit={converter} style={{ display: "inline-flex", gap: 8 }}>
        <input type="number" value={valor} onChange={e => setValor(e.target.value)} placeholder="Valor" step="any" required style={{ padding: 8, borderRadius: 5, border: "1px solid #bbb" }} />
        <select value={de} onChange={e => setDe(e.target.value)} style={{ padding: 8, borderRadius: 5 }}>
          <option value="C">Celsius</option>
          <option value="F">Fahrenheit</option>
          <option value="K">Kelvin</option>
        </select>
        <span style={{ alignSelf: "center" }}>→</span>
        <select value={para} onChange={e => setPara(e.target.value)} style={{ padding: 8, borderRadius: 5 }}>
          <option value="F">Fahrenheit</option>
          <option value="C">Celsius</option>
          <option value="K">Kelvin</option>
        </select>
        <button type="submit" style={{ padding: 8, borderRadius: 5, background: "#2196f3", color: "#fff", border: "none" }}>Converter</button>
      </form>
      <div style={{ marginTop: 20, fontSize: "1.2em", color: "#222" }}>{resultado}</div>
    </div>
  );
} 