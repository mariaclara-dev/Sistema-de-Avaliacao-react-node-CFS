import { useState } from "react";
import { api } from "../services/api";
import "./FormularioAvaliacao.css";

function FormularioAvaliacao({ atualizar }) {
  const [aluno, setAluno] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (nota < 0 || nota > 10) {
      alert("A nota deve estar entre 0 e 10");
      return;
    }

    try {
      await api.post("/avaliacoes", {
        aluno,
        disciplina,
        nota,
        comentario
      });

      atualizar();
      alert("Avaliação cadastrada com sucesso!");

      setAluno("");
      setDisciplina("");
      setNota(0);
      setComentario("");
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao cadastrar avaliação");
    }
  }

  return (
    <div className="formulario">
      <h2>Nova Avaliação</h2>

      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>Aluno</label>
          <input
            type="text"
            value={aluno}
            onChange={(e) => setAluno(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Disciplina</label>
          <input
            type="text"
            value={disciplina}
            onChange={(e) => setDisciplina(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Nota: <strong>{nota}</strong></label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={nota}
            onChange={(e) => setNota(Number(e.target.value))}
          />
        </div>

        {/* ✅ CAMPO DE COMENTÁRIO */}
        <div className="campo">
          <label>Comentário</label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows="4"
            placeholder="Digite um comentário sobre a avaliação..."
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default FormularioAvaliacao;
