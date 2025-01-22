import express from "express";
const routes = express.Router();
import { executeQuery } from "../api.js";
import { createRecordQuery } from "../queries.js";

// Endpoint para criar registro na database
routes.post("/pesquisa", async (req, res) => {
  try {
    const { title, fields } = req.body; // Obtém os dados do corpo da requisição
    const tableId = "305637362"; // ID da tabela no Pipefy

    // Gera a query para criar o registro
    const query = createRecordQuery(tableId, title, fields);
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

export default routes;