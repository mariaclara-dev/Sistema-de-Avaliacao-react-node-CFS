import { useEffect, useState } from "react";
import { api } from "./services/api";
import FormularioAvaliacao from "./components/FormularioAvaliacao";
import ListaAvaliacoes from "./components/ListaAvaliacoes";
import MediaPorDisciplina from "./components/MediaPorDisciplina";
import RankingNotas from "./components/RankingNotas";
import "./App.css";

function App() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [media, setMedia] = useState(0);
  const [atualizar, setAtualizar] = useState(0);

  async function carregar() {
    const res = await api.get("/avaliacoes");
    const mediaRes = await api.get("/avaliacoes/media");

    setAvaliacoes(res.data);
    setMedia(mediaRes.data.media);
    setAtualizar((prev) => prev + 1);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Sistema de Avaliação</h1>
        <h3
          className={`media ${
            media >= 7 ? "boa" : media >= 5 ? "regular" : "ruim"
          }`}
        >
          Média Geral: {media.toFixed(1)}
        </h3>
      </div>

      <div className="card">
        <h2>Cadastro de Avaliação</h2>
        <FormularioAvaliacao atualizar={carregar} />
      </div>

      <div className="card">
        <h2>Lista de Avaliações</h2>
        <ListaAvaliacoes
          avaliacoes={avaliacoes}
          atualizar={carregar}
        />
      </div>

      <div className="card">
        <h2>Média por Disciplina</h2>
        <MediaPorDisciplina atualizarTrigger={atualizar} />
      </div>

      <div className="card">
        <RankingNotas avaliacoes={avaliacoes}/>
      </div>
    </div>
  );
}

export default App;
