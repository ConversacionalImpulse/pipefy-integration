import express from "express";
const routes = express.Router();

import { home } from "../controller/controller_api.js";
import { createData } from "../controller/controller_pipefy.js";
import { getUser } from "../controller/GetUserByCPFController.js";
import { confirmarStatus } from "../controller/ConfirmarStatusController.js";

routes.get("/", home);
routes.post("/inscricao", createData);
routes.get("/user/:cpf", getUser);
routes.post("/confirmar-status", confirmarStatus);

export default routes;
