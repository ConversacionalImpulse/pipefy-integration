import express from "express";
const routes = express.Router();

import { home } from "../controller/controller_api.js";
import { createData } from "../controller/controller_pipefy.js";

routes.get("/", home);
routes.post("/inscricao", createData);

export default routes;
