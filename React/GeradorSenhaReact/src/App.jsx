import React, { useState } from "react";

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
function gerarSenha(tam) {
  let senha = "";
  for (let i = 0; i < tam; i++) {
    senha += chars[Math.floor(Math.random() * chars.length)];
  }
  return senha;
}

export default function App() {
  const [tamanho, setTamanho] = useState(8);
  const [quantidade, setQuantidade] = useState(1);
  const [senhas, setSenhas] = useState([]);

  function gerar(e) {
    e.preventDefault();
    const lista = [];
    for (let i = 0; i < quantidade; i++) {
      lista.push(gerarSenha(tamanho));
    }
    setSenhas(lista);
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: 40 }}>
      <h1>Gerador de Senha</h1>
      <form onSubmit={gerar} style={{ display: "inline-flex", gap: 8 }}>
        <input type="number" value={tamanho} onChange={e => setTamanho(Number(e.target.value))} min={4} max={32} required style={{ padding: 8, borderRadius: 5, border: "1px solid #bbb", width: 80 }} />
        <input type="number" value={quantidade} onChange={e => setQuantidade(Number(e.target.value))} min={1} max={10} required style={{ padding: 8, borderRadius: 5, border: "1px solid #bbb", width: 80 }} />
        <button type="submit" style={{ padding: 8, borderRadius: 5, background: "#2196f3", color: "#fff", border: "none" }}>Gerar</button>
      </form>
      <div style={{ marginTop: 20, fontSize: "1.2em", color: "#222" }}>
        {senhas.map((s, i) => <div key={i} style={{ margin: 4, fontFamily: "monospace" }}>{s}</div>)}
      </div>
      <div style={{ marginTop: 10, color: "#888", fontSize: "0.95em" }}>
        <span>Tamanho da senha</span> | <span>Quantidade</span>
      </div>
    </div>
  );
} 