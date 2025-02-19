const axios = require('axios');

async function getRecordIdByCPF(cpf) {
    try {
        // Normalizando o CPF recebido na requisição (removendo pontos e traços)
        const formattedCPF = cpf.replace(/\D/g, ""); 

        // Definição da query GraphQL
        const query = `
            query {
                table_records(table_id: "305703862") {
                    edges {
                        node {
                            id
                            record_fields {
                                field {
                                    label
                                }
                                value
                            }
                        }
                    }
                }
            }
        `;

        // Fazendo a requisição com Axios
        const response = await axios.post(
            "https://api.pipefy.com/graphql",
            { query },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PIPEFY_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const responseData = response.data;

        // Verificando se a API retornou erros
        if (responseData.errors) {
            throw new Error(responseData.errors[0].message);
        }

        // Buscando o CPF dentro dos registros
        if (responseData.data && responseData.data.table_records) {
            const filteredRecord = responseData.data.table_records.edges.find(record => {
                const cpfField = record.node.record_fields.find(field => field.field.label === "CPF");
                return cpfField && cpfField.value.replace(/\D/g, "") === formattedCPF;
            });

            if (filteredRecord) {
                return filteredRecord.node.id;
            } else {
                throw new Error(`Nenhum registro encontrado para o CPF ${cpf}`);
            }
        } else {
            throw new Error("Erro na consulta ou nenhum dado encontrado");
        }
    } catch (error) {
        console.error(`Erro ao buscar CPF no Pipefy: ${error.message}`);
        throw error; // Relançando o erro para ser tratado onde a função for chamada
    }
}

module.exports = { getRecordIdByCPF };
