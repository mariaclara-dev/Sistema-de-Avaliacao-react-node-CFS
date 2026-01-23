const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let avaliacoes = [];

//Cadastrar avaliações
app.post("/avaliacoes", (req, res) => {
  const { aluno, disciplina, nota } = req.body;

  if (!aluno || !disciplina || nota === undefined) {
    return res.status(400).json({ error: "Dados inválidos" });
  }
  avaliacoes.push({
  id:Date.now(),
  aluno,
  disciplina,
  nota: Number(nota),
});

 res.status(201).json({
  id: Date.now(),
  aluno,
  disciplina,
  nota: Number(nota),
});

});

//Listar avaliações
app.get("/avaliacoes", (req, res) => {
  res.json(avaliacoes);
});
//Média geral 
app.get("/avaliacoes/media", (req, res) => {
  if (avaliacoes.length === 0) {
    return res.json({ media: 0 });
  }

  const soma = avaliacoes.reduce(
    (total, avaliacao) => total + avaliacao.nota,
    0
  );

  const media = soma / avaliacoes.length;
  res.json({ media });
});

//Média por disciplina 
app.get("/avaliacoes/media-por-disciplina", (req, res) => {
  const resultado = {};

  avaliacoes.forEach((a) => {
    if (!resultado[a.disciplina]) {
      resultado[a.disciplina] = { soma: 0, total: 0 };
    }

    resultado[a.disciplina].soma += a.nota;
    resultado[a.disciplina].total += 1;
  });

  const medias = Object.keys(resultado).map((disciplina) => ({
    disciplina,
    media: resultado[disciplina].soma / resultado[disciplina].total,
  }));

  res.json(medias);
});

//Excluir avaliação (por id)
app.delete("/avaliacoes/:id", (req, res) => {
  const id = Number(req.params.id);

  avaliacoes = avaliacoes.filter((a) => a.id !== id);

  res.json({ message: "Avaliação removida" });
});


//Servidor 
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});

