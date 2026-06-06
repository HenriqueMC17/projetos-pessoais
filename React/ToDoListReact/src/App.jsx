import React, { useState } from "react";

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [nova, setNova] = useState("");

  function adicionar(e) {
    e.preventDefault();
    if (!nova.trim()) return;
    setTarefas([...tarefas, { texto: nova, feita: false }]);
    setNova("");
  }
  function marcarFeita(i) {
    setTarefas(tarefas.map((t, idx) => idx === i ? { ...t, feita: !t.feita } : t));
  }
  function remover(i) {
    setTarefas(tarefas.filter((_, idx) => idx !== i));
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: 40 }}>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={adicionar} style={{ display: "inline-flex", gap: 8 }}>
        <input type="text" value={nova} onChange={e => setNova(e.target.value)} placeholder="Digite uma nova tarefa" required style={{ padding: 8, borderRadius: 5, border: "1px solid #bbb" }} />
        <button type="submit" style={{ padding: 8, borderRadius: 5, background: "#2196f3", color: "#fff", border: "none" }}>Adicionar</button>
      </form>
      <ul style={{ listStyle: "none", padding: 0, maxWidth: 400, margin: "20px auto 0 auto" }}>
        {tarefas.map((t, i) => (
          <li key={i} style={{ background: t.feita ? "#e0e0e0" : "#fff", marginBottom: 10, padding: "12px 16px", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 8px #aaa", fontSize: "1.1em", textDecoration: t.feita ? "line-through" : "none", color: t.feita ? "#888" : "#222" }}>
            <span onClick={() => marcarFeita(i)} style={{ cursor: "pointer", flex: 1 }}>{t.texto}</span>
            <button onClick={() => remover(i)} style={{ background: "#e33", color: "#fff", border: "none", borderRadius: 4, padding: "5px 10px", cursor: "pointer", fontSize: "0.9em", marginLeft: 10 }}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 