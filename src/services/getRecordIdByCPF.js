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

    const response = await fetch('https://api.pipefy.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.PIPEFY_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const responseData = await response.json();

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
}
