const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let avaliacoes = [];

// Listar avaliações
app.get("/avaliacoes", (req, res) => {
  res.json(avaliacoes);
});

// Criar avaliação
app.post("/avaliacoes", (req, res) => {
  const { nome, nota, comentario } = req.body;

  if (!nome || !nota) {
    return res.status(400).json({ erro: "Nome e nota são obrigatórios" });
  }

  const novaAvaliacao = {
    id: avaliacoes.length + 1,
    nome,
    nota,
    comentario
  };

  avaliacoes.push(novaAvaliacao);
  res.status(201).json(novaAvaliacao);
});

// Média das notas
app.get("/avaliacoes/media", (req, res) => {
  const soma = avaliacoes.reduce((total, a) => total + a.nota, 0);
  const media = avaliacoes.length ? soma / avaliacoes.length : 0;
  res.json({ media });
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
