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

    try {
      await api.post("/avaliacoes", {
        aluno,
        nota: Number(nota),
        disciplina,
        comentario,
      });

      atualizar(); // atualiza lista e média

      alert("Avaliação cadastrada com sucesso!");

      setAluno("");
      setNota("");
      setDisciplina("");
      setComentario("");
    } catch (error) {
      alert("Erro ao cadastrar avaliação");
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
            type="text"
            value={disciplina}
            onChange={(e) => setDisciplina(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Nota:</label>
          <input
            type="number"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            min="0"
            max="10"
            required
          />
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
