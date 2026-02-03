const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function teste() {
  const resultado = await prisma.avaliacao.findMany();
  console.log("Avaliações no banco:", resultado);
}

teste();
