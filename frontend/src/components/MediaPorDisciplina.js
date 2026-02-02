import { useEffect, useState } from "react";
import { api } from "../services/api";
import "./MediaPorDisciplina.css";

function MediaPorDisciplina({ atualizarTrigger }) {
  const [medias, setMedias] = useState([]);

  async function carregar() {
    const res = await api.get("/avaliacoes/media-por-disciplina");
    setMedias(res.data);
  }

  useEffect(() => {
    carregar();
  }, [atualizarTrigger]); //Atualiza sempre que mudar

return (
  <div className="media-disciplina">
    

    {medias.length === 0 && <p>Nenhuma média disponível</p>}

    <ul>
      {medias.map((m) => (
        <li
          key={m.disciplina}
          className={m.media >= 7 ? "boa" : "ruim"}
        >
          {m.disciplina}: {m.media.toFixed(1)}
        </li>
      ))}
    </ul>
  </div>
);
}

export default MediaPorDisciplina;
