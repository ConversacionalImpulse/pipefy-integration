import dotenv from "dotenv";
import { createRecordTable } from "../services/CreateTableRecordSubscriptions.js";

dotenv.config();

export async function createData(req, res) {
  let { nome, telefone, email, cpf } = req.body;

  try {
    // Chamando a função de criação do registro
    const recordId = await createRecordTable(nome, telefone, email, cpf);

    // Respondendo ao cliente
    res.status(200).json({
      message: "Registro criado com sucesso",
      recordId: recordId,
      contagem: "A contagem das avaliações foi atualizada",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
