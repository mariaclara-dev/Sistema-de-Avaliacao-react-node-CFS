import Estrelas from "./Estrelas";
import "./RankingNotas.css";

function RankingNotas({ avaliacoes }) {
  if (!avaliacoes || avaliacoes.length === 0) {
    return <p>Nenhuma avaliação no ranking</p>;
  }

  const ranking = [...avaliacoes].sort((a, b) => b.nota - a.nota);

  return (
    <div className="ranking">
      <h2>🏆 Ranking de Notas</h2>

      <table className="ranking-tabela">
        <thead>
          <tr>
            <th>#</th>
            <th>Aluno</th>
            <th>Disciplina</th>
            <th>Nota</th>
            <th>Avaliação</th>
          </tr>
        </thead>

        <tbody>
          {ranking.map((a, index) => (
            <tr key={a.id}>
              <td>{index + 1}</td>
              <td>{a.aluno}</td>
              <td>{a.disciplina}</td>
              <td>{a.nota}</td>
              <td>
                <Estrelas nota={a.nota} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RankingNotas;
