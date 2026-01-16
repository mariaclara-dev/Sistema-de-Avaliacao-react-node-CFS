const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let avaliacoes = [];

app.post("/avaliacoes", (req, res) => {
  const { aluno, disciplina, nota } = req.body;

  if (!aluno || !disciplina || nota === undefined) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  avaliacoes.push({
  aluno,
  disciplina,
  nota: Number(nota),
});

  res.status(201).json({ message: "Avaliação cadastrada" });
});

app.get("/avaliacoes", (req, res) => {
  res.json(avaliacoes);
});

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

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
