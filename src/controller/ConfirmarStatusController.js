import { updateUserStatus } from '../services/UpdateUserStatus.js';

export async function confirmarStatus(req, res) {
    let { cpf, pagamentoConfirmado } = req.body;

    console.log("CPF recebido no request:", cpf);

    if (!cpf) {
        return res.status(400).json({ error: "CPF é obrigatório" });
    }

    cpf = cpf.replace(/\D/g, ""); // Normaliza o CPF

    let statusPagamento = pagamentoConfirmado ? "PAGO" : "NÃO PAGO";
    let statusMatricula = pagamentoConfirmado ? "CONFIRMADA" : "CANCELADA";

    try {
        // Chama a função para atualizar o status do usuário
        const message = await updateUserStatus(cpf, statusPagamento, statusMatricula);
        res.status(200).json({
            message: message,  // Mensagem de sucesso
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}
