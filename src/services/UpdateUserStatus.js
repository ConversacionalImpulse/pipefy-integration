import { getRecordIdByCPF } from './getRecordIdByCPF.js';


export async function updateUserStatus(cpf, statusPagamento, statusMatricula) {
  try {
      // Normaliza o CPF 
      cpf = cpf.replace(/\D/g, "");

      // Busca o ID do registro pelo CPF
      const recordId = await getRecordIdByCPF(cpf);

      // IDs dos campos que você deseja atualizar no Pipefy
      const STATUS_FIELD_ID = "status";  
      const MATRICULA_FIELD_ID = "matr_cula";  

      // Função para atualizar o campo no Pipefy
      async function updateField(fieldId, value) {
          const query = `
          mutation {
              setTableRecordFieldValue(input: {
                  table_record_id: "${recordId}",
                  field_id: "${fieldId}",
                  value: "${value}"
              }) {
                  table_record {
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
              body: JSON.stringify({ query })
          });
  
          const responseData = await response.json();
  
          if (responseData.errors) {
              throw new Error(`Erro ao atualizar o campo ${fieldId}: ${responseData.errors[0].message}`);
          }
  
          return responseData.data.setTableRecordFieldValue.table_record.id;
      }

      // Atualiza os campos no Pipefy
      await updateField(STATUS_FIELD_ID, statusPagamento);
      await updateField(MATRICULA_FIELD_ID, statusMatricula);

      return `Registro ${recordId} atualizado com sucesso!`;
  } catch (error) {
      console.log("Erro ao atualizar status:", error);
      throw new Error(`Erro ao atualizar status: ${error.message}`);
  }
}
