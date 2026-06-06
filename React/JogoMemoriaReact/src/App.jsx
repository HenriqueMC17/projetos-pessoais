import React, { useState, useEffect } from "react";

const emojis = ['🍎','🍌','🍇','🍉','🍒','🍋','🍓','🍑'];
function embaralhar(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [cartas, setCartas] = useState([]);
  const [viradas, setViradas] = useState([]);
  const [completas, setCompletas] = useState([]);
  const [tentativas, setTentativas] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);

  useEffect(() => {
    reiniciar();
    // eslint-disable-next-line
  }, []);

  function reiniciar() {
    setCartas(embaralhar([...emojis, ...emojis]));
    setViradas([]);
    setCompletas([]);
    setTentativas(0);
    setBloqueado(false);
  }

  function virar(i) {
    if (bloqueado || viradas.includes(i) || completas.includes(i)) return;
    const novasViradas = [...viradas, i];
    setViradas(novasViradas);
    if (novasViradas.length === 2) {
      setTentativas(t => t + 1);
      setBloqueado(true);
      setTimeout(() => {
        const [a, b] = novasViradas;
        if (cartas[a] === cartas[b]) {
          setCompletas(c => [...c, a, b]);
        }
        setViradas([]);
        setBloqueado(false);
      }, 800);
    }
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: 40 }}>
      <h1>Jogo da Memória</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 80px)", gap: 15, justifyContent: "center", margin: "30px auto 20px auto" }}>
        {cartas.map((emoji, i) => (
          <div key={i} onClick={() => virar(i)}
            style={{
              width: 80, height: 80, background: completas.includes(i) ? "#4caf50" : viradas.includes(i) ? "#fff" : "#2196f3",
              color: completas.includes(i) ? "#fff" : viradas.includes(i) ? "#2196f3" : "#fff",
              fontSize: "2em", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, cursor: completas.includes(i) ? "default" : "pointer", boxShadow: "0 2px 8px #aaa", userSelect: "none", transition: "background 0.2s, color 0.2s"
            }}>
            {completas.includes(i) || viradas.includes(i) ? emoji : ""}
          </div>
        ))}
      </div>
      <p style={{ fontSize: "1.1em", color: "#333" }}>Tentativas: {tentativas}</p>
      {completas.length === cartas.length && cartas.length > 0 && (
        <p style={{ color: "#4caf50", fontWeight: "bold" }}>Parabéns! Você venceu em {tentativas} tentativas.</p>
      )}
      <button onClick={reiniciar} style={{ padding: 10, fontSize: "1em", borderRadius: 5, background: "#2196f3", color: "#fff", border: "none", marginTop: 10 }}>Reiniciar</button>
    </div>
  );
} 