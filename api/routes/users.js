import express from "express";
import { pool } from "../db.js";
// import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


const router = express.Router();

const SECRET = 'medworkldn'

//Tabela Empresa
//Get table
router.get("/empresas", (req, res) => {
    const q = `SELECT * FROM empresas`;

    pool.getConnection((err, con) => {
        if (err) return next(err);

        con.query(q, (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(data);
        });

        con.release();
    })

});

//Add rows in table
router.post("/empresas", (req, res) => {
    const data = req.body;

    const q = "INSERT INTO empresas SET ?"

    pool.getConnection((err, con) => {
        if (err) return next(err);

        con.query(q, data, (err, result) => {
            if (err) {
                console.error("Erro ao inserir empresa na tabela", err);
                return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
            }

            return res.status(200).json(`Empresa cadastrada com sucesso!`);
        });

        con.release();
    })

});

//Update row in table
router.put("/empresas/:id_empresa", (req, res) => {
    const id_empresa = req.params.id_empresa; // Obtém o ID da empresa da URL
    const {
        nome_empresa,
        razao_social,
        cnpj_empresa,
        inscricao_estadual_empresa,
        inscricao_municipal_empresa,
        fk_contato_id } = req.body;

    const q = `
    UPDATE empresas
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

    pool.getConnection((err, con) => {
        if (err) return next(err);

        con.query(q, values, (err) => {
            if (err) {
                console.error("Erro ao atualizar dados na tabela", err);
                return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
            }

            return res.status(200).json("Empresa atualizada com sucesso!");
        });

        con.release();
    })

});

// //Delete rou in table
// router.delete("/empresa/:id_empresa", (req, res) => {
//     const q = `DELETE FROM empresa WHERE id = ?`;

//     db.query(q, [req.params.id_empresa], (err) => {
//         console.error("Erro ao deletar contato na tabela", err);
//         return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
//     });

//     return res.status(200).json(`Empresa excluída com sucesso!`);
// });


//Tabela Unidade
//Get table
router.get("/unidades", (req, res) => {
    const q = `SELECT * FROM unidades`;

    pool.getConnection((err, con) => {
        if(err) return next(err);

        con.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
    
            return res.status(200).json(data);
        });
        
        con.release();
    })

});

//Add rows in table
router.post("/unidades", (req, res) => {
    const data = req.body;

    const q = "INSERT INTO unidades SET ?"

    pool.getConnection((err, con) => {
        if(err) return next(err);

        con.query(q, data, (err, result) => {
            if (err) {
                console.error("Erro ao inserir Unidade na tabela", err);
                return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
            }
    
            return res.status(200).json(`Unidade cadastrada com sucesso!`);
        });

        con.release();
    })

});

//Update row in table
router.put("/unidades/:id_unidade", (req, res) => {
    const id_unidade = req.params.id_unidade; // Obtém o ID da empresa da URL
    const { nome_unidade, cnpj_unidade, cep_unidade, endereco_unidade, bairro_unidade, uf_unidade } = req.body;

    const q = `
    UPDATE unidades
    SET nome_unidade = ?,
    cnpj_unidade = ?,
    cep_unidade = ?,
    endereco_unidade = ?,
    bairro_unidade = ?,
    uf_unidade = ?
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

    pool.getConnection((err, con) => {
        if(err) return next(err);

        con.query(q, values, (err) => {
            if (err) {
                console.error("Erro ao atualizar unidade na tabela", err);
                return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
            }
    
            return res.status(200).json("Unidade atualizada com sucesso!");
        });

        con.release();
    })

});

//Delete row in table
// router.delete("/unidade/:id_unidade", (req, res) => {
//     const q = `DELETE FROM unidade WHERE id = ?`;

//     db.query(q, [req.params.id_unidade], (err) => {
//         console.error("Erro ao deletar unidade na tabela", err);
//         return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
//     });

//     return res.status(200).json(`Unidade excluída com sucesso!`);
// });


//Tabela Cargo
//Get table
router.get("/cargos", (req, res) => {
    const q = `SELECT * FROM cargos`;

    pool.getConnection((err, con) => {
        if(err) return next(err);

        con.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
    
            return res.status(200).json(data);
        });
        
        con.release();
    })

});

//Add rows in table
router.post("/cargos", (req, res) => {
    const data = req.body;

    const q = "INSERT INTO cargos SET ?"

    pool.getConnection((err, con) => {
        if(err) return next(err);

        con.query(q, data, (err, result) => {
            if (err) {
                console.error("Erro ao inserir Cargo na tabela", err);
                return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
            }
    
            return res.status(200).json(`Cargo cadastrada com sucesso!`);
        });

        con.release();
    })

});

//Update row in table
router.put("/cargos/:id_cargo", (req, res) => {
    const id_cargo = req.params.id_cargo; // Obtém o ID da empresa da URL
    const { nome_cargo, descricao, fun_masc, fun_fem, func_menor } = req.body;

    const q = `
    UPDATE unidades
    SET nome_cargo = ?,
    descricao = ?,
    fun_masc = ?,
    fun_fem = ?,
    func_menor = ?
    WHERE id_cargo = ?
    `;

    const values = [
        nome_cargo,
        descricao,
        fun_masc,
        fun_fem,
        func_menor,
        id_cargo
    ];

    pool.getConnection((err, con) => {
        if(err) return next(err);

        con.query(q, values, (err) => {
            if (err) {
                console.error("Erro ao atualizar cargo na tabela", err);
                return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
            }
    
            return res.status(200).json("Cargo atualizada com sucesso!");
        });

        con.release();
    })

});

//Delete row in table
// router.delete("/unidade/:id_unidade", (req, res) => {
//     const q = `DELETE FROM unidade WHERE id = ?`;

//     db.query(q, [req.params.id_unidade], (err) => {
//         console.error("Erro ao deletar unidade na tabela", err);
//         return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
//     });

//     return res.status(200).json(`Unidade excluída com sucesso!`);
// });



//Tabela Contato
//Get table
router.get("/contatos", (req, res) => {
    const q = `SELECT * FROM contatos`;

    pool.getConnection((err, con) => {
        if(err) return next(err);

        con.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
    
            return res.status(200).json(data);
        });

        con.release();
    })

});

//Add rows in table
router.post("/contatos", (req, res) => {
    const data = req.body;

    const q = "INSERT INTO contatos SET ?"

    pool.getConnection((err, con) => {
        if(err) return next(err);
        
        con.query(q, data, (err, result) => {
            if (err) {
                console.error("Erro ao inserir contato na tabela", err);
                return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
            }
    
            return res.status(200).json(`Contato cadastrado com sucesso!`);
        });

        con.release();
    })

});

//Update row int table
router.put("/contatos/:id_contato", (req, res) => {
    const id_contato = req.params.id_contato; // Obtém o ID da empresa da URL
    const { nome_contato, telefone_contato, email_contato, email_secundario_contato } = req.body;

    const q = `
    UPDATE contatos
    SET nome_contato = ?,
    telefone_contato = ?,
    email_contato = ?,
    email_secundario_contato = ?
    WHERE id_contato = ?
    `;

    const values = [
        nome_contato,
        telefone_contato,
        email_contato,
        email_secundario_contato,
        id_contato
    ];

    pool.getConnection((err, con) => {
        if(err) return next(err);

        con.query(q, values, (err) => {
            if (err) {
                console.error("Erro ao atualizar contato na tabela", err);
                return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
            }
    
            return res.status(200).json("Contato atualizado com sucesso!");
        });

        con.release();
    })

});

//Delete row in table
router.delete("/contato/:id_contato", (req, res) => {
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
    UPDATE usuarios
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
router.delete("/usuarios/:id_usuario", (req, res) => {
    const q = `DELETE FROM usuarios WHERE id = ?`;

    db.query(q, [req.params.id_usuario], (err) => {
        console.error("Erro ao deletar usuário na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
    });

    return res.status(200).json(`Usuário excluído com sucesso!`);
});


//Tabela Aparelhos
//Get table
router.get("/aparelhos", (req, res) => {
    const q = `SELECT * FROM aparelhos`;

    pool.getConnection((err, con) => {
        if (err) return next(err);

        con.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            con.release();
            return res.status(200).json(data);
        });
    })

});

//Add rows in table
router.post("/aparelhos", (req, res) => {
    const data = req.body;

    const q = "INSERT INTO aparelhos SET ?"

    pool.getConnection((err, con) => {

        if (err) return next(err);

        con.query(q, data, (err, result) => {
            if (err) {
                console.error("Erro ao inserir aparelho na tabela", err);
                return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
            }

            return res.status(200).json(`Aparelho cadastrado com sucesso!`);
        })
    })

});

//Update row int table
router.put("/aparelhos/:id_aparelho", (req, res) => {
    const id_aparelho = req.params.id_aparelho; // Obtém o ID da empresa da URL
    const { nome_aparelho, marca_aparelho, modelo_aparelho, data_calibracao_aparelho } = req.body;

    const q = `
    UPDATE aparelhos
    SET nome_aparelho = ?,
    marca_aparelho = ?,
    modelo_aparelho = ?,
    data_calibracao_aparelho = ?
    WHERE id_aparelho = ?
    `;

    const values = [
        nome_aparelho,
        marca_aparelho,
        modelo_aparelho,
        data_calibracao_aparelho,
        id_aparelho
    ];

    pool.getConnection((err, con) => {
        if (err) return next(err);

        con.query(q, values, (err) => {
            if (err) {
                console.error("Erro ao atualizar aparelho na tabela", err);
                return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
            }

            return res.status(200).json("Aparelho atualizado com sucesso!");
        });
    })

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
                const token = jwt.sign({ usuario: user.usuario, id: user.id }, SECRET, { expiresIn: '1h' });
                res.status(200).json({ message: 'Autenticação bem-sucedida', user, token });
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


//Validação do Token
router.post('/validate', (req, res) => {
    const getToken = req.headers.authorization;

    if (!getToken) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(getToken, SECRET);
        return res.status(200).json({ user: decoded });
    } catch (error) {
        console.error('Erro ao validar o token:', error);
        return res.status(401).json({ message: 'Token inválido' });
    }
});

export default router;