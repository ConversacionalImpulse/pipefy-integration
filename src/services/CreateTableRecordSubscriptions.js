export async function createRecordTable(nome, telefone, email, cpf, pagamento) {
  const query = `
    mutation {
      createTableRecord(input: {
        table_id: "305703862",  // 🔹 Certifique-se de colocar o ID correto da sua tabela no Pipefy!
        fields_attributes: [
          { field_id: "Nome", field_value: "${nome}" },    
          { field_id: "Email", field_value: "${email}" },  
          { field_id: "Telefone", field_value: "${telefone}" }, 
          { field_id: "CPF", field_value: "${cpf}" },  
          { field_id: "Pagamento", field_value: "${pagamento}" }     
        ]
      }) {
        table_record {  // 🔹 O ID do registro criado está dentro desse objeto
          id
        }
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

  console.log(JSON.stringify(responseData, null, 2)); // Debug

  if (responseData.errors) {
      throw new Error(responseData.errors[0].message);
  }

  if (responseData.data && responseData.data.createTableRecord) {
      return responseData.data.createTableRecord.table_record.id; // 🔹 Agora pegamos o ID corretamente
  } else {
      throw new Error("Resposta inesperada da API Pipefy");
  }
}
