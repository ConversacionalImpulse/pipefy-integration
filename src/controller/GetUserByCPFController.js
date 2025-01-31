import { getUserByCPF } from "../services/GetUserByCPF.js";

export async function getUser(req, res) {
  try {
    const { cpf } = req.params;
    const user = await getUserByCPF(cpf);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
