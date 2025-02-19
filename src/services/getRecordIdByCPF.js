const axios = require('axios'); // Importando o axios

export async function getRecordIdByCPF(cpf) {
    try {
        // Define a query GraphQL para buscar pelo CPF no Pipefy
        const query = `
        {
            allTableRecords(filter: {cpf: "${cpf}"}) {
                edges {
                    node {
                        id
                    }
                }
            }
        }
        `;
        
        // Faz a requisição à API do Pipefy com axios
        const response = await axios.post(
            'https://api.pipefy.com/graphql',
            { query },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.PIPEFY_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        
        // Verifica se encontrou algum registro
        const records = response.data.data.allTableRecords.edges;
        
        if (records.length === 0) {
            throw new Error(`Nenhum registro encontrado para o CPF ${cpf}`);
        }
        
        // Retorna o ID do primeiro registro encontrado
        return records[0].node.id;
    } catch (error) {
        console.error(`Erro ao buscar CPF no Pipefy: ${error.message}`);
        throw error; // Lança o erro para ser tratado na função que chamar
    }
}
