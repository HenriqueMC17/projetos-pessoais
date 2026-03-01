import React, { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  function validar(e) {
    e.preventDefault();
    const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email)) {
      setMensagem("E-mail válido!");
    } else {
      setMensagem("E-mail inválido!");
    }
  }
  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: 40 }}>
      <h1>Validador de E-mail</h1>
      <form onSubmit={validar} style={{ display: "inline-flex", gap: 8 }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite o e-mail" required style={{ padding: 8, borderRadius: 5, border: "1px solid #bbb", width: 250 }} />
        <button type="submit" style={{ padding: 8, borderRadius: 5, background: "#2196f3", color: "#fff", border: "none" }}>Validar</button>
      </form>
      <div style={{ marginTop: 20, fontSize: "1.2em", minHeight: "1.5em", color: mensagem === "E-mail válido!" ? "#4caf50" : "#e33" }}>{mensagem}</div>
    </div>
  );
} 