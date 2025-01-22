const express = require("express");
const { executeQuery } = require("./api");
const { createRecordQuery } = require("./queries");
require("dotenv").config({ path: "../.env" });

console.log("Token carregado:", process.env.PIPEFY_TOKEN);

// Configurações
const TABLE_ID = "305637362";

// Instancia o app do Express
const app = express();
app.use(express.json()); // Middleware para tratar JSON no corpo das requisições

// Endpoint para integração com Pipefy
app.post("/pipefy-integration", async (req, res) => {
  try {
    const { title, fields } = req.body; // Obtém os dados do corpo da requisição

    // Gera a query para criar o registro
    const query = createRecordQuery(TABLE_ID, title, fields);
    console.log("Query gerada:", query); // Log da query para verificar

    // Executa a query
    const result = await executeQuery(query);

    // Retorna sucesso
    res.status(200).json({
      message: "Registro criado com sucesso!",
      result,
    });
  } catch (error) {
    console.error("Erro ao criar registro:", error.message);

    // Retorna erro
    res.status(500).json({
      message: "Erro ao processar a requisição.",
      error: error.message,
    });
  }
});

// Rota para teste inicial
app.get("/", (req, res) => {
  res.send("API do Pipefy funcionando!");
});

// Define a porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
