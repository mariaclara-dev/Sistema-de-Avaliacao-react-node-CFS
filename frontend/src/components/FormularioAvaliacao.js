import { useState } from "react";
import { api } from "../services/api";
import "./FormularioAvaliacao.css";

function FormularioAvaliacao({ atualizar }) {
  const [aluno, setAluno] = useState("");
  const [nota, setNota] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [comentario, setComentario] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const notaNumerica = Number(nota);

if (notaNumerica < 0 || notaNumerica > 10) {
  alert("A nota deve estar entre 0 e 10");
  return;
}

    try {
      await api.post("/avaliacoes", {
        aluno,
        disciplina,
        nota: notaNumerica,
        comentario,
      });

      atualizar();
      alert("Avaliação cadastrada com sucesso!");

      setAluno("");
      setNota("");
      setDisciplina("");
      setComentario("");
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao cadastrar avaliação");
    }
  }

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>

        <div>
          <label>Aluno:</label>
          <input
            type="text"
            value={aluno}
            onChange={(e) => setAluno(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Disciplina:</label>
<input
  type="range"
  min="0"
  max="10"
  step="0.1"
  value={nota}
  onChange={(e) => setNota(e.target.value)}
/>
<span>{nota}</span>

        </div>

        <div>
          <label>Comentário:</label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows="4"
            className="campo-comentario"
            placeholder="Observações sobre a avaliação..."
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default FormularioAvaliacao;
