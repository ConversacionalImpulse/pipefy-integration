export function NormalizeCPF(cpf) {
    return cpf.replace(/\D/g, ""); // Remove tudo que não for número
}
