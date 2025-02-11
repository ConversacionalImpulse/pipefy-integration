export async function getRecordIdByCPF(cpf) {
    const query = `query {
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

    // Filtrando para encontrar o ID do registro com o CPF informado
    const record = responseData.data.table_records.edges.find((record) => {
        const cpfField = record.node.record_fields.find(field => field.field.label === "CPF");
        return cpfField && cpfField.value === cpf;
    });

    return record ? record.node.id : null;
}
