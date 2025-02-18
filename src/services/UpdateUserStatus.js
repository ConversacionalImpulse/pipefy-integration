export async function updateUserStatus(cpf, statusPagamento, statusMatricula) {
  
  // Normalizar o CPF diretamente
  cpf = cpf.replace(/\D/g, ""); // Remove tudo que não for número

  // Buscar o ID do registro pelo CPF
  const recordId = await getRecordIdByCPF(cpf);
  if (!recordId) {
    throw new Error(`Nenhum registro encontrado para o CPF ${cpf}`);
  }

  // IDs reais dos campos no Pipefy (substitua pelos corretos)
  const STATUS_FIELD_ID = "status";  
  const MATRICULA_FIELD_ID = "matr_cula";  

  // Função para atualizar um campo
  async function updateField(fieldId, value) {
    const query = `mutation {
      setTableRecordFieldValue(input: {
        table_record_id: "${recordId}",
        field_id: "${fieldId}",
        value: "${value}"
      }) {
        table_record {
          id
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
      throw new Error(`Erro ao atualizar o campo ${fieldId}: ${responseData.errors[0].message}`);
    }

    return responseData.data.setTableRecordFieldValue.table_record.id;
  }

  // Atualizar os campos
  await updateField(STATUS_FIELD_ID, statusPagamento);
  await updateField(MATRICULA_FIELD_ID, statusMatricula);

  return `Registro ${recordId} atualizado com sucesso!`;
}
