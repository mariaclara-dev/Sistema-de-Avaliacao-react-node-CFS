const axios = require('axios');
const prompt = require('prompt-sync')();

const api = axios.create({
    baseURL: 'http://localhost:3001'
});

async function executarPrograma() {
    try {
        console.log("=== Sistema de Avaliações Escolares ===");
        const qtdAlunos = parseInt(prompt("Quantos alunos deseja Cadastrar? "));

        for (let i = 0; i < qtdAlunos; i++) {
            console.log(`\n--- Dados do Aluno ${i + 1} ---`);
            const aluno = prompt("Nome do Aluno: ");
            const disciplina = prompt("Disciplina: ");
            
            // --- ADICIONADO AQUI ---
            let nota = parseFloat(prompt("Nota (0-10): "));
            
            // Enquanto o que foi digitado não for um número OU for fora de 0-10
            while (isNaN(nota) || nota < 0 || nota > 10) {
                console.log("⚠️ Erro: A nota deve ser um número entre 0 e 10.");
                nota = parseFloat(prompt("Digite a nota novamente: "));
            }
            // ------------------------

            const comentario = prompt("Comentário (opcional): ");

            await api.post('/avaliacoes', {
                aluno,
                disciplina,
                nota,
                comentario
            });
        }

        console.log("\n" + "=".repeat(30));
        console.log("Processando Resultados . . . ");
        console.log("=".repeat(30));

        const resMediaGeral = await api.get('/avaliacoes/media');
        console.log(`\n📊 MÉDIA GERAL DA TURMA: ${resMediaGeral.data.media.toFixed(2)}`);

        const resRanking = await api.get('/avaliacoes/ranking'); 
        
        console.log("\n🏆 TOP 5 - MELHORES ALUNOS:");
        console.table(resRanking.data.map(item => ({
            posicao: resRanking.data.indexOf(item) + 1,
            aluno: item.aluno,
            nota: item.nota,
            disciplina: item.disciplina
        })));

    } catch (error) {
        console.error("\n❌ Erro ao comunicar com o servidor:", error.message);
    }
}

executarPrograma();
