const prisma = require("./src/prisma");
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/avaliacoes", async (req, res) => {
  const dados = await prisma.avaliacao.findMany();
  res.json(dados);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
