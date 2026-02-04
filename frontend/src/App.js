import React, { useState, useEffect } from "react"; // Ajustado: adicionada a vírgula
import axios from "axios";

function App() {
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [mediaGeral, setMediaGeral] = useState(0); // Nome definido aqui
    const [form, setForm] = useState({ aluno: '', disciplina: '', nota: '', comentario: '' });
    
    const API_URL = "http://localhost:3001/avaliacoes";


    const fetchData = async () => {
        try {
            const resLista = await axios.get(API_URL);
            const resMedia = await axios.get(`${API_URL}/media`);
            const resRanking = await axios.get(`${API_URL}/ranking`);
            setAvaliacoes(resLista.data);
            setMediaGeral(resMedia.data.media); // Atualiza mediaGeral
            setRanking(resRanking.data);
        } catch (err) {
            console.error("Erro ao buscar dados:", err);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, form);
            setForm({ aluno: '', disciplina: '', nota: '', comentario: '' });
            fetchData();
        } catch (err) {
            console.error("Erro ao enviar:", err);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Sistema de Avaliações</h1>
            
            <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '8px' }}>
                {/* Ajustado para usar mediaGeral */}
                <h3>Média Geral: {Number(mediaGeral).toFixed(1)}</h3>
            </div>

            <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
  <input
    placeholder="Aluno"
    value={form.aluno}
    onChange={e => setForm({ ...form, aluno: e.target.value })}
    required
  />

  <input
    placeholder="Disciplina"
    value={form.disciplina}
    onChange={e => setForm({ ...form, disciplina: e.target.value })}
    required
  />

  <input
    type="number"
    min="0"
    max="10"
    step="0.1"
    placeholder="Nota (0–10)"
    value={form.nota}
    onChange={e => setForm({ ...form, nota: e.target.value })}
    required
  />

  {/* CAMPO DE COMENTÁRIO */}
  <textarea
    placeholder="Comentário sobre a avaliação"
    value={form.comentario}
    onChange={e => setForm({ ...form, comentario: e.target.value })}
    rows={3}
    style={{ width:"40%",height:"30px", resize:"none" }}
  />

  <button type="submit" style={{ marginTop: "10px" }}>
    Avaliar
  </button>
</form>

            <div style={{ display: 'flex', gap: '40px' }}>
                <div>
                    <h2>Últimas Avaliações</h2>
                    {avaliacoes.length > 0 ? avaliacoes.map(a => (
                        <div key={a.id} style={{ borderBottom: '1px solid #ccc' }}>
                            <p><strong>{a.aluno}</strong> em {a.disciplina}: {a.nota}</p>
                        </div>
                    )) : <p>Nenhuma avaliação encontrada.</p>}
                </div>

                <div style={{ background: '#fff9e6', padding: '15px' }}>
                    <h2>🏆 Top 5 Ranking</h2>
                    {ranking.map((r, index) => (
                        <p key={r.id}>{index + 1}º - {r.aluno} ({r.nota})</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
