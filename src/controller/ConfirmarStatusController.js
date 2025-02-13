import { updateUserStatus } from "../services/UpdateUserStatus.js";
import { normalizeCPF } from "../utils/normalizeCPF.js"; // Criando uma função utilitária para reutilização

export async function confirmarStatus(req, res) {
    let { cpf, pagamentoConfirmado } = req.body;

    // Normalizando o CPF antes de usá-lo
    cpf = normalizeCPF(cpf);

    let statusPagamento = pagamentoConfirmado ? "PAGO" : "NÃO PAGO";
    let statusMatricula = pagamentoConfirmado ? "CONFIRMADA" : "CANCELADA";

    try {
        const recordId = await updateUserStatus(cpf, statusPagamento, statusMatricula);
        res.status(200).json({
            message: "Status atualizado com sucesso",
            recordId: recordId,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}
