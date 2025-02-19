const axios = require('axios');  
export async function getRecordIdByCPF(cpf) {
    
    // Normalizando o CPF da requisição diretamente
    const formattedCPF = cpf.replace(/\D/g, ""); // Remove tudo que não for número

    const query = `query {
        table_records(table_id: "305703862") {
            edges {
                node {
                    id
                    record_fields {
                        field {
                            id
                            label
                        }
                        value
                    }
                }
            }
        }
    }`;

    try {
        const response = await axios.post('https://api.pipefy.com/graphql', 
        { 
            query 
        }, 
        { 
            headers: { 
                'Authorization': `Bearer ${process.env.PIPEFY_TOKEN}`,
                'Content-Type': 'application/json',
            } 
        });

        const responseData = response.data;

        if (responseData.errors) {
            throw new Error(responseData.errors[0].message);
        }

        if (responseData.data && responseData.data.table_records) {
            const filteredRecord = responseData.data.table_records.edges.find((record) => {
                const cpfField = record.node.record_fields.find(field => field.field.label === "CPF");

                // Normalizando o CPF retornado pela Pipefy antes da comparação
                return cpfField && cpfField.value.replace(/\D/g, "") === formattedCPF;
            });

            if (filteredRecord) {
                return filteredRecord.node.id;
            } else {
                throw new Error(`Nenhum registro encontrado para o CPF ${cpf}`);
            }
        } else {
            throw new Error('Erro na consulta ou nenhum dado encontrado');
        }

    } catch (error) {
        console.error(`Erro ao buscar CPF no Pipefy: ${error.message}`);
        throw error; // Lança o erro para ser tratado na função que chamar
    }
}
