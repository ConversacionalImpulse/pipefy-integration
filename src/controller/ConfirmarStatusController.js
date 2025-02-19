import { updateUserStatus } from "../services/UpdateUserStatus.js"; 

export async function confirmarStatus(req, res) {
    let { cpf, pagamentoConfirmado } = req.body;

    console.log("CPF recebido no request:", cpf);

    if (!cpf) {
        return res.status(400).json({ error: "CPF é obrigatório" });
    }

    cpf = cpf.replace(/\D/g, ""); // Remove tudo que não for número

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
