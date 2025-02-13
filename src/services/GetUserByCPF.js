export async function getUserByCPF(cpf) {
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

    const response = await fetch('https://api.pipefy.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.PIPEFY_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const responseData = await response.json();

    // Logando a resposta completa para diagnóstico
    console.log('Resposta da API Pipefy:', JSON.stringify(responseData, null, 2));

    if (responseData.errors) {
        throw new Error(responseData.errors[0].message);
    }

    // Filtrando os registros pelo CPF
    if (responseData.data && responseData.data.table_records) {
        const filteredRecords = responseData.data.table_records.edges.filter((record) => {
            // Pegando o CPF armazenado no banco e removendo os caracteres especiais
            const cpfField = record.node.record_fields.find(field => field.field.label === "CPF");
            const cpfDatabase = cpfField ? cpfField.value.replace(/\D/g, "") : "";

            // Comparação do CPF sem formatação
            return cpfDatabase === cpf;
        });

        if (filteredRecords.length > 0) {
            return filteredRecords;  // Retorna os registros filtrados
        } else {
            throw new Error(`Nenhum registro encontrado para o CPF ${cpf}`);
        }
    } else {
        throw new Error('Erro na consulta ou nenhum dado encontrado');
    }
}
