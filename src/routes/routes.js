import express from "express";
const routes = express.Router();

import { home } from "../controller/controller_api.js";
import { createData } from "../controller/controller_pipefy.js";
import { getUser } from "../controller/GetUserByCPFController.js";

routes.get("/", home);
routes.post("/inscricao", createData);
routes.get("/user/:cpf", getUser);

export default routes;
