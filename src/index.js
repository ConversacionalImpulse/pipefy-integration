const { executeQuery } = require("./api");
const { createRecordQuery } = require("./queries");
require("dotenv").config(); // Carrega variáveis do .env

// Configurações
const TABLE_ID = "305637362"; 

// Dados do registro
const recordData = {
  title: "João da Silva", // Título do registro
  fields: [
    { id: "Nome", value: "João da Silva" },
    { id: "Email", value: "joao.silva@gmail.com" }, 
    { id: "Telefone", value: "+5511999999999" } 
  ],
};

// Função principal
async function main() {
  try {
    const query = createRecordQuery(TABLE_ID, recordData.title, recordData.fields);
    const result = await executeQuery(query);

    console.log("Registro criado com sucesso:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Erro ao criar registro:", error.message);
  }
}

// Executar
main();
