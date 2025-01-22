const { executeQuery } = require("./api");
const { createRecordQuery } = require("./queries");
require("dotenv").config({ path: "../.env" });

console.log("Token carregado:", process.env.PIPEFY_TOKEN);

// Configurações
const TABLE_ID = "305637362";

// Dados do registro
const recordData = {
  title: "Felipe Gaudêncio",
  fields: [
    { id: "nome", value: "Felipe Gaudêncio" },
    { id: "email", value: "felipe8675@gmail.com" },
    { id: "telefone", value: "+5511988887453" },
  ],
};

// Função principal
async function main() {
  try {
    // Gera a query
    const query = createRecordQuery(TABLE_ID, recordData.title, recordData.fields);
    console.log("Query gerada:", query);  // Log da query para verificar

    // Executa a query
    const result = await executeQuery(query);

    // Exibe o resultado
    console.log("Registro criado com sucesso:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    // Caso haja erro, exibe a mensagem e a resposta da API
    console.error("Erro ao criar registro:", error.message);
    if (error.response) {
      console.error("Detalhes do erro:", JSON.stringify(error.response.data, null, 2));
    }
  }
}

// Executar
main();
