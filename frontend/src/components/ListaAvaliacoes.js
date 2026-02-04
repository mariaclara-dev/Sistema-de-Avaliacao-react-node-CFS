import { api } from "../services/api";
import "./ListaAvaliacoes.css";

function ListaAvaliacoes({ avaliacoes, atualizar }) {
  async function excluir(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta avaliação?"
    );
    if (!confirmar) return;

    await api.delete(`/avaliacoes/${id}`);
    atualizar();
  }

  return (
    <div className="tabela-container">
      {avaliacoes.length === 0 ? (
        <p>Nenhuma avaliação cadastrada</p>
      ) : (
        <table className="tabela">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Disciplina</th>
              <th>Nota</th>
              <th>Comentário</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {avaliacoes.map((a) => (
              <tr key={a.id}>
                <td>{a.aluno}</td>
                <td>{a.disciplina}</td>

                <td className={a.nota >= 7 ? "nota-boa" : "nota-ruim"}>
                  {a.nota}
                </td>

                <td className="comentario">
                  {a.comentario ? a.comentario : "—"}
                </td>

                <td>
                  <button
                    className="btn-excluir"
                    onClick={() => excluir(a.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaAvaliacoes;
