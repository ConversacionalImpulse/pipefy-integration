import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/routes/routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

export default app; // 🔥 Importante para Vercel
