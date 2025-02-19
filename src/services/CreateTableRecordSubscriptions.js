export async function createRecordTable(nome, telefone, email, cpf, pagamento) {
    const query = `
      mutation {
        createTableRecord(input: {
          field_values: [
            { field_id: "Nome", field_value: "${nome}" },    
            { field_id: "Email", field_value: "${email}" },  
            { field_id: "Telefone", field_value: "${telefone}" }, 
            { field_id: "CPF", field_value: "${cpf}" }, 
            { field_id: "Pagamento", field_value: "${pagamento}" }     
          ]
        }) {
          id
        }
      }
    `;
  
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
    console.log(JSON.stringify(responseData, null, 2));
  
    if (responseData.errors) {
      throw new Error(responseData.errors[0].message);
    }
  
    // Retornando o id do registro criado
    if (responseData.data && responseData.data.createTableRecord) {
      return responseData.data.createTableRecord.id;
    } else {
      throw new Error("Resposta inesperada da API Pipefy");
    }
  }
  