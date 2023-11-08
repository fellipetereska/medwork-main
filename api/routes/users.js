import express from "express";
// import { getTableData, addTableData, updateTableData, deleteTableData } from "../controllers/users.js";
import { db } from "../db.js";

const router = express.Router();

// Rota genérica para buscar informações de uma tabela

// router.get("/:table", getTableData);

// Rota genérica para adicionar informações a uma tabela
// router.post("/:table", addTableData);

// // Rota genérica para atualizar informações em uma tabela
// router.put("/:table/:id", updateTableData);

// // Rota genérica para excluir informações de uma tabela
// router.delete("/:table/:id", deleteTableData);


//Tabela Empresa
//Get table Empresa
router.get("/empresa", (req, res) => {
    const q = `SELECT * FROM empresa`;
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data);
    });
});

//Get table Contato
router.get("/contato", (req, res) => {
    const q = `SELECT * FROM contato`;
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data);
    });
});

//Get table Unidade
router.get("/unidade", (req, res) => {
    const q = `SELECT * FROM unidade`;
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data);
    });
});


//Add rows in table Empresa
router.post("/empresa", (req, res) => {
    const data = req.body;

    const q = "INSERT INTO empresa SET ?"

    db.query(q, data, (err, result) => {
        if (err) {
            console.error("Erro ao inserir empresa na tabela", err);
            return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
          }
      
          return res.status(200).json(`Empresa cadastrada com sucesso!`);
    })
});

//Add rows in table Contato
router.post("/contato", (req, res) => {
    const data = req.body;

    const q = "INSERT INTO contato SET ?"

    db.query(q, data, (err, result) => {
        if (err) {
            console.error("Erro ao inserir contato na tabela", err);
            return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
          }
      
          return res.status(200).json(`Contato cadastrado com sucesso!`);
    })
});

//Add rows in table Unidade
router.post("/unidade", (req, res) => {
    const data = req.body;

    const q = "INSERT INTO unidade SET ?"

    db.query(q, data, (err, result) => {
        if (err) {
            console.error("Erro ao inserir Unidade na tabela", err);
            return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
          }
      
          return res.status(200).json(`Unidade cadastrada com sucesso!`);
    })
});


//Update row in table Empresa
router.put("/empresa/:id_empresa", (req, res) => {
    const id_empresa = req.params.id_empresa; // Obtém o ID da empresa da URL
    const { nome_empresa, razao_social, cnpj_empresa, inscricao_estadual_empresa, inscricao_municipal_empresa } = req.body;

    const q = `
        UPDATE empresa
        SET nome_empresa = ?,
            razao_social = ?,
            cnpj_empresa = ?,
            endereco_empresa = ?,
            inscricao_estadual_empresa = ?,
            inscricao_municipal_empresa = ?,
        WHERE id_empresa = ?
    `;

    const values = [
        nome_empresa,
        razao_social,
        cnpj_empresa,
        inscricao_estadual_empresa,
        inscricao_municipal_empresa,
        id_empresa
    ];

    db.query(q, values, (err) => {
        if (err) {
            console.error("Erro ao atualizar dados na tabela", err);
            return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
        }

        return res.status(200).json("Empresa atualizada com sucesso!");
    });
});

//Update row int table Contato
router.put("/contato/:id_contato", (req, res) => {
    const id_contato = req.params.id_contato; // Obtém o ID da empresa da URL
    const { nome_contato, telefone_contato, email_contato, email_secundario_contato } = req.body;

    const q = `
        UPDATE contato
        SET nome_contato = ?,
            telefone_contato = ?,
            email_contato = ?,
            email_secundario_contato = ?,
        WHERE id_empresa = ?
    `;

    const values = [
        nome_contato,
        telefone_contato,
        email_contato,
        email_secundario_contato,
        id_contato
    ];

    db.query(q, values, (err) => {
        if (err) {
            console.error("Erro ao atualizar contato na tabela", err);
            return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
        }

        return res.status(200).json("Contato atualizado com sucesso!");
    });
});

//Update row in table Unidade
router.put("/unidade/:id_unidade", (req, res) => {
    const id_contato = req.params.id_unidade; // Obtém o ID da empresa da URL
    const { nome_unidade, cnpj_unidade, cep_unidade, endereco_unidade, bairro_unidade, uf_unidade } = req.body;

    const q = `
        UPDATE unidade
        SET nome_unidade = ?,
            cnpj_unidade = ?,
            cep_unidade = ?,
            endereco_unidade = ?,
            bairro_unidade = ?,
            uf_unidade = ?,
        WHERE id_empresa = ?
    `;

    const values = [
        nome_unidade,
        cnpj_unidade,
        cep_unidade,
        endereco_unidade,
        bairro_unidade,
        uf_unidade,
        id_contato
    ];

    db.query(q, values, (err) => {
        if (err) {
            console.error("Erro ao atualizar unidade na tabela", err);
            return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
        }

        return res.status(200).json("Unidade atualizada com sucesso!");
    });
});


//Delete rou in table Empresa
router.delete("/empresa/:id_empresa", (req, res) =>{
    const q = `DELETE FROM empresa WHERE id = ?`;

    db.query(q, [req.params.id_empresa], (err) => {
        console.error("Erro ao atualizar contato na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
    });

    return res.status(200).json(`Empresa excluída com sucesso!`);
});

//Delete row in table Contato
router.delete("/contato/:id_contato", (req, res) =>{
    const q = `DELETE FROM contato WHERE id = ?`;

    db.query(q, [req.params.id_contato], (err) => {
        console.error("Erro ao atualizar contato na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
    });

    return res.status(200).json(`Contato excluído com sucesso!`);
});

//Delete row in table Contato
router.delete("/unidade/:id_unidade", (req, res) =>{
    const q = `DELETE FROM unidade WHERE id = ?`;

    db.query(q, [req.params.id_contato], (err) => {
        console.error("Erro ao atualizar unidade na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
    });

    return res.status(200).json(`Unidade excluída com sucesso!`);
});


export default router;
