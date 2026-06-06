import React, { useState } from "react";

export default function App() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState("");

  function calcularIMC(e) {
    e.preventDefault();
    const p = parseFloat(peso);
    const a = parseFloat(altura);
    if (!p || !a) {
      setResultado("Preencha os campos corretamente.");
      return;
    }
    const imc = p / (a * a);
    let classif = "";
    if (imc < 18.5) classif = "Abaixo do peso";
    else if (imc < 25) classif = "Peso normal";
    else if (imc < 30) classif = "Sobrepeso";
    else classif = "Obesidade";
    setResultado(`IMC: ${imc.toFixed(2)} (${classif})`);
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: 40 }}>
      <h1>Calculadora de IMC</h1>
      <form onSubmit={calcularIMC} style={{ display: "inline-flex", gap: 8 }}>
        <input type="number" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Peso (kg)" min={0} step="any" required style={{ padding: 8, borderRadius: 5, border: "1px solid #bbb" }} />
        <input type="number" value={altura} onChange={e => setAltura(e.target.value)} placeholder="Altura (m)" min={0} step="any" required style={{ padding: 8, borderRadius: 5, border: "1px solid #bbb" }} />
        <button type="submit" style={{ padding: 8, borderRadius: 5, background: "#2196f3", color: "#fff", border: "none" }}>Calcular</button>
      </form>
      <div style={{ marginTop: 20, fontSize: "1.2em", color: "#222" }}>{resultado}</div>
    </div>
  );
} 