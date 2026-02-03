const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/* =========================
   ROTA RAIZ (teste)
========================= */
app.get("/", (req, res) => {
  res.send("API Sistema de Avaliações rodando 🚀");
});

/* =========================
   CRIAR AVALIAÇÃO
========================= */
app.post("/avaliacoes", async (req, res) => {
  try {
    const { aluno, disciplina, nota, comentario } = req.body;

    // 🔒 Validação obrigatória
    if (!aluno || !disciplina || nota === undefined) {
      return res.status(400).json({
        error: "Aluno, disciplina e nota são obrigatórios"
      });
    }

    const notaNumerica = Number(nota);

    // 🔒 BLOQUEIO DEFINITIVO
    if (
      Number.isNaN(notaNumerica) ||
      notaNumerica < 0 ||
      notaNumerica > 10
    ) {
      return res.status(400).json({
        error: "A nota deve ser um número entre 0 e 10"
      });
    }

    const avaliacao = await prisma.avaliacao.create({
      data: {
        aluno,
        disciplina,
        nota: notaNumerica,
        comentario
      }
    });

    res.status(201).json(avaliacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar avaliação" });
  }
});

/* =========================
   LISTAR AVALIAÇÕES
========================= */
app.get("/avaliacoes", async (req, res) => {
  const avaliacoes = await prisma.avaliacao.findMany({
    orderBy: { createdAt: "desc" }
  });

  res.json(avaliacoes);
});

/* =========================
   MÉDIA GERAL
========================= */
app.get("/avaliacoes/media", async (req, res) => {
  const result = await prisma.avaliacao.aggregate({
    _avg: { nota: true }
  });

  res.json({
    media: result._avg.nota ? Number(result._avg.nota.toFixed(2)) : 0
  });
});

/* =========================
   MÉDIA POR DISCIPLINA
========================= */
app.get("/avaliacoes/media-por-disciplina", async (req, res) => {
  const medias = await prisma.avaliacao.groupBy({
    by: ["disciplina"],
    _avg: { nota: true }
  });

  res.json(
    medias.map(item => ({
      disciplina: item.disciplina,
      media: Number(item._avg.nota.toFixed(2))
    }))
  );
});

/* =========================
   RANKING TOP 5
========================= */
app.get("/avaliacoes/ranking", async (req, res) => {
  const ranking = await prisma.avaliacao.findMany({
    orderBy: { nota: "desc" },
    take: 5
  });

  res.json(ranking);
});

/* =========================
   EXCLUIR AVALIAÇÃO
========================= */
app.delete("/avaliacoes/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    await prisma.avaliacao.delete({
      where: { id }
    });

    res.json({ message: "Avaliação removida com sucesso" });
  } catch {
    res.status(404).json({ error: "Avaliação não encontrada" });
  }
});

/* =========================
   SERVIDOR
========================= */
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");});