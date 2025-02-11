import { updateUserStatus } from "../services/UpdateUserStatus.js";

export async function confirmarStatus(req, res) {
    const { cpf, pagamentoConfirmado } = req.body;

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
