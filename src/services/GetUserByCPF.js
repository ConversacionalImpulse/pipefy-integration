export async function getUserByCPF(cpf) {
    const query = `query {
        table_records(table_id: "305637362", where: { field_values: { field_id: "CPF", field_value: "${cpf}" } }) {
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
            'Authorization': `Bearer ${process.env.PIPEFY_API_TOKEN}`,
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

    // Verificando se existe a propriedade 'table_records'
    if (responseData.data && responseData.data.table_records) {
        // Retorna os registros encontrados
        return responseData.data.table_records.edges;
    } else {
        throw new Error('Nenhum dado encontrado para o CPF ou erro na consulta');
    }
}
