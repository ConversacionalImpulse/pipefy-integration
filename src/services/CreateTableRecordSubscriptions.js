export async function createRecordTable(nome, telefone, email, cpf, plano, pagamento) {
  const query = `
    mutation {
      createTableRecord(input: {
        table_id: "305703862",  
        fields_attributes: [
          { field_id: "Nome", field_value: "${nome}" },    
          { field_id: "Email", field_value: "${email}" },  
          { field_id: "Telefone", field_value: "${telefone}" }, 
          { field_id: "CPF", field_value: "${cpf}" },  
          { field_id: "Pagamento", field_value: "${pagamento}" },
          { field_id: "Plano", field_value: "${plano}" }       
        ]
      }) {
        table_record {
          id
        }
      }
    }
  `.replace(/\s+/g, ' ').trim();  // 🔹 Remove quebras de linha extras para evitar erro de parsing

  const response = await fetch('https://api.pipefy.com/graphql', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${process.env.PIPEFY_TOKEN}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
  });

  const responseData = await response.json();

  console.log(JSON.stringify(responseData, null, 2)); // Debug

  if (responseData.errors) {
      throw new Error(responseData.errors[0].message);
  }

  if (responseData.data && responseData.data.createTableRecord) {
      return responseData.data.createTableRecord.table_record.id; 
  } else {
      throw new Error("Resposta inesperada da API Pipefy");
  }
}
