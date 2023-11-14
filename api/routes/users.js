import express from "express";
import { db } from "../db.js";
import bcrypt from 'bcrypt';


const router = express.Router();


//Tabela Empresa
//Get table
router.get("/empresa", (req, res) => {
    const q = `SELECT * FROM empresa`;
    
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        
        return res.status(200).json(data);
    });
});

//Add rows in table
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

//Update row in table
router.put("/empresa/:id_empresa", (req, res) => {
    const id_empresa = req.params.id_empresa; // Obtém o ID da empresa da URL
    const { 
            nome_empresa, 
            razao_social, 
            cnpj_empresa, 
            inscricao_estadual_empresa, 
            inscricao_municipal_empresa,
            fk_contato_id } = req.body;
    
    const q = `
    UPDATE empresa
    SET nome_empresa = ?,
    razao_social = ?,
    cnpj_empresa = ?,
    inscricao_estadual_empresa = ?,
    inscricao_municipal_empresa = ?,
    fk_contato_id = ?
    WHERE id_empresa = ?
    `;
    
    const values = [
        nome_empresa,
        razao_social,
        cnpj_empresa,
        inscricao_estadual_empresa,
        inscricao_municipal_empresa,
        fk_contato_id,
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

//Delete rou in table
router.delete("/empresa/:id_empresa", (req, res) =>{
    const q = `DELETE FROM empresa WHERE id = ?`;
    
    db.query(q, [req.params.id_empresa], (err) => {
        console.error("Erro ao deletar contato na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
    });
    
    return res.status(200).json(`Empresa excluída com sucesso!`);
});



//Tabela Unidade
//Get table
router.get("/unidade", (req, res) => {
    const q = `SELECT * FROM unidade`;
    
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        
        return res.status(200).json(data);
    });
});

//Add rows in table
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

//Update row in table
router.put("/unidade/:id_unidade", (req, res) => {
    const id_unidade = req.params.id_unidade; // Obtém o ID da empresa da URL
    const { nome_unidade, cnpj_unidade, cep_unidade, endereco_unidade, bairro_unidade, uf_unidade } = req.body;
    
    const q = `
    UPDATE unidade
    SET nome_unidade = ?,
    cnpj_unidade = ?,
    cep_unidade = ?,
    endereco_unidade = ?,
    bairro_unidade = ?,
    uf_unidade = ?,
    WHERE id_unidade = ?
    `;
    
    const values = [
        nome_unidade,
        cnpj_unidade,
        cep_unidade,
        endereco_unidade,
        bairro_unidade,
        uf_unidade,
        id_unidade
    ];
    
    db.query(q, values, (err) => {
        if (err) {
            console.error("Erro ao atualizar unidade na tabela", err);
            return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
        }
        
        return res.status(200).json("Unidade atualizada com sucesso!");
    });
});

//Delete row in table
router.delete("/unidade/:id_unidade", (req, res) =>{
    const q = `DELETE FROM unidade WHERE id = ?`;
    
    db.query(q, [req.params.id_unidade], (err) => {
        console.error("Erro ao deletar unidade na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
    });
    
    return res.status(200).json(`Unidade excluída com sucesso!`);
});



//Tabela Contato
//Get table
router.get("/contato", (req, res) => {
    const q = `SELECT * FROM contato`;
    
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        
        return res.status(200).json(data);
    });
});

//Add rows in table
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

//Update row int table
router.put("/contato/:id_contato", (req, res) => {
    const id_contato = req.params.id_contato; // Obtém o ID da empresa da URL
    const { nome_contato, telefone_contato, email_contato, email_secundario_contato } = req.body;
    
    const q = `
    UPDATE contato
    SET nome_contato = ?,
    telefone_contato = ?,
    email_contato = ?,
    email_secundario_contato = ?,
    WHERE id_contato = ?
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

//Delete row in table
router.delete("/contato/:id_contato", (req, res) =>{
    const q = `DELETE FROM contato WHERE id = ?`;
    
    db.query(q, [req.params.id_contato], (err) => {
        console.error("Erro ao deletar contato na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
    });
    
    return res.status(200).json(`Contato excluído com sucesso!`);
});



//Tabela Usuarios
//Get table
router.get("/usuarios", (req, res) => {
    const q = `SELECT * FROM usuarios`;
    
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        
        return res.status(200).json(data);
    });
});

//Add rows in table
router.post("/usuarios", (req, res) => {
    const data = req.body;
    
    const q = "INSERT INTO usuarios SET ?"
    
    db.query(q, data, (err, result) => {
        if (err) {
            console.error("Erro ao inserir usuário na tabela", err);
            return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
        }
        
        return res.status(200).json(`Usuário cadastrado com sucesso!`);
    })
});

//Update row int table
router.put("/usuarios/:id_usuario", (req, res) => {
    const id_usuario = req.params.id_usuario; // Obtém o ID da empresa da URL
    const { nome_usuario, cpf_usuario, email_usuario, usuario, senha } = req.body;
    
    const q = `
    UPDATE usuaris
    SET nome_usuario = ?,
    cpf_usuario = ?,
    email_usuario = ?,
    usuario = ?,
    senha = ?
    WHERE id_usuario = ?
    `;
    
    const values = [
        nome_usuario,
        cpf_usuario,
        email_usuario,
        usuario,
        senha,
        id_usuario
    ];
    
    db.query(q, values, (err) => {
        if (err) {
            console.error("Erro ao atualizar usuário na tabela", err);
            return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
        }
        
        return res.status(200).json("Usuário atualizado com sucesso!");
    });
});

//Delete row in table
router.delete("/usuarios/:id_usuario", (req, res) =>{
    const q = `DELETE FROM usuarios WHERE id = ?`;
    
    db.query(q, [req.params.id_usuario], (err) => {
        console.error("Erro ao deletar usuário na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
    });
    
    return res.status(200).json(`Usuário excluído com sucesso!`);
});


// Verifica Usuário para Logar
// Rota para verificar o usuário ao fazer login
router.post('/login', async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        const query = 'SELECT * FROM usuarios WHERE usuario = ?';

        db.query(query, [usuario], async (err, results) => {
            if (err) {
                console.error('Erro ao verificar usuário', err);
                return res.status(500).json({ message: 'Erro interno do servidor' });
            }

            const user = results[0];

            if (user && user.senha === senha) {
                res.status(200).json({ message: 'Autenticação bem-sucedida', user });
            } else {
                res.status(401).json({ message: 'Usuário ou senha incorretos!' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

//Rota para Logout
router.post("/logout", async (req, res) => {

    res.json({ message: 'Logout bem-sucedido!' })
})

//Selecionar Empresa
router.post('/selectCompany', async (req, res) => {
    const { id_empresa } = req.body;

    try {
        const query = 'SELECT * FROM empresa WHERE id_empresa = ?';

        db.query(query, [id_empresa], async (err, results) => {
            if (err) {
                console.error('Erro ao selecionar Empresa', err);
                return res.status(500).json({ message: 'Erro interno do servidor' });
            }

            const company = results[0];

            if (company) {
                res.status(200).json({ message: 'Autenticação bem-sucedida', company });
            } else {
                res.status(401).json({ message: 'Selecione uma Empresa!' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});


export default router;