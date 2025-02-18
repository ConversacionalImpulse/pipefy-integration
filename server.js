import app from "./index.js"; // Importa a configuração do Express

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
