import express from "express";
import { getEmpresas, addEmpresas, updateEmpresas, deleteEmpresas, getSetores, addSetores, updateSetores, deleteSetores } from "../controllers/users.js";

const router = express.Router();

//Rotas da tabela empresa
router.get("/empresas", getEmpresas);

router.post("/empresas", addEmpresas);

router.put("/empresas/:id", updateEmpresas);

router.delete("/empresas/:id", deleteEmpresas);

//Rotas da tabela setor
router.get("/setores", getSetores);

router.post("/setores", addSetores);

router.put("/setores/:id", updateSetores);

router.delete("/setores/:id", deleteSetores);

export default router;