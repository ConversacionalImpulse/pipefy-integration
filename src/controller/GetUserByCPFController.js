import { getUserByCPF } from "../services/GetUserByCPF.js";

export async function getUser(req, res) {
  const { cpf } = req.params;

  try {
    // Chama o serviço que consulta os dados e filtra pelo CPF
    const user = await getUserByCPF(cpf);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
