import express from "express";
import { getTableData, addTableData, updateTableData, deleteTableData } from "../controllers/users.js";

const router = express.Router();

// Rota genérica para buscar informações de uma tabela
router.get("/:table", getTableData);

// Rota genérica para adicionar informações a uma tabela
router.post("/:table", addTableData);

// Rota genérica para atualizar informações em uma tabela
router.put("/:table/:id", updateTableData);

// Rota genérica para excluir informações de uma tabela
router.delete("/:table/:id", deleteTableData);

export default router;
