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

router.put("/empresas/activate/:id_empresa", (req, res) => {
  const id_empresa = req.params.id_empresa;
  const { ativo } = req.body;

  const q = 'UPDATE empresas SET ativo = ? WHERE id_empresa = ?';
  const values = [ativo, id_empresa];

  pool.getConnection((err, con) => {
    if (err) return res.status(500).json({ error: 'Erro ao obter conexão.' });

    con.query(q, values, (err) => {
      con.release();

      if (err) {
        console.error('Erro ao atualizar status da empresa:', err);
        return res.status(500).json({ error: 'Erro ao atualizar status da empresa.' });
      }

      res.status(200).json({ message: 'Status da empresa atualizado com sucesso.' });
    });
  });
});


//Tabela Unidade
//Get table
router.get("/unidades", (req, res) => {
  const q = `SELECT * FROM unidades`;

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
router.post("/unidades", (req, res) => {
  const data = req.body;

  const q = "INSERT INTO unidades SET ?"

  pool.getConnection((err, con) => {
    if (err) return next(err);

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
  const {
    nome_unidade,
    cnpj_unidade,
    cep_unidade,
    endereco_unidade,
    numero_unidade,
    cidade_unidade,
    bairro_unidade,
    uf_unidade,
    fk_contato_id,
    fk_empresa_id,
  } = req.body;

  const q = `
    UPDATE unidades
    SET nome_unidade = ?,
    cnpj_unidade = ?,
    cep_unidade = ?,
    endereco_unidade = ?,
    numero_unidade = ?,
    bairro_unidade = ?,
    cidade_unidade = ?,
    uf_unidade = ?,
    fk_contato_id = ?,
    fk_empresa_id = ?
    WHERE id_unidade = ?
    `;

  const values = [
    nome_unidade,
    cnpj_unidade,
    cep_unidade,
    endereco_unidade,
    numero_unidade,
    cidade_unidade,
    bairro_unidade,
    uf_unidade,
    fk_contato_id,
    fk_empresa_id,
    id_unidade,
  ];

  pool.getConnection((err, con) => {
    if (err) return next(err);

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

router.put("/unidades/activate/:id_unidade", (req, res) => {
  const id_unidade = req.params.id_unidade;
  const { ativo } = req.body;

  const q = 'UPDATE unidades SET ativo = ? WHERE id_unidade = ?';
  const values = [ativo, id_unidade];

  pool.getConnection((err, con) => {
    if (err) return res.status(500).json({ error: 'Erro ao obter conexão.' });

    con.query(q, values, (err) => {
      con.release();

      if (err) {
        console.error('Erro ao atualizar status da unidade:', err);
        return res.status(500).json({ error: 'Erro ao atualizar status da unidade.' });
      }

      res.status(200).json({ message: 'Status da unidade atualizado com sucesso.' });
    });
  });
});


//Tabela Setores
//Get table
router.get("/setores", (req, res) => {
  const q = `SELECT * FROM setores`;

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
router.post("/setores", (req, res) => {
  const data = req.body;

  const q = "INSERT INTO setores SET ?"

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, data, (err, result) => {
      if (err) {
        console.error("Erro ao inserir setor na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json(`Setor cadastrada com sucesso!`);
    });

    con.release();
  })

});

//Update row in table
router.put("/setores/:id_setor", (req, res) => {
  const id_setor = req.params.id_setor; // Obtém o ID da empresa da URL
  const { nome_setor, ambiente_setor, observacao_setor, fk_unidade_id } = req.body;

  const q = `
    UPDATE setores
    SET nome_setor = ?,
    ambiente_setor = ?,
    observacao_setor = ?,
    fk_unidade_id = ?
    WHERE id_setor = ?
    `;

  const values = [
    nome_setor,
    ambiente_setor,
    observacao_setor,
    fk_unidade_id,
    id_setor,
  ];

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, values, (err) => {
      if (err) {
        console.error("Erro ao atualizar setor na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json("Setor atualizada com sucesso!");
    });

    con.release();
  })

});

//Update row in table
router.put("/setores/activate/:id_setor", (req, res) => {
  const id_setor = req.params.id_setor;
  const { ativo } = req.body;

  const q = 'UPDATE setores SET ativo = ? WHERE id_setor = ?';
  const values = [ativo, id_setor];

  pool.getConnection((err, con) => {
    if (err) return res.status(500).json({ error: 'Erro ao obter conexão.' });

    con.query(q, values, (err) => {
      con.release();

      if (err) {
        console.error('Erro ao atualizar status do setor:', err);
        return res.status(500).json({ error: 'Erro ao atualizar status do setor.' });
      }

      res.status(200).json({ message: 'Status do setor atualizado com sucesso.' });
    });
  });
});



//Tabela Cargo
//Get table
router.get("/cargos", (req, res) => {
  const q = `SELECT * FROM cargos`;

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
router.post("/cargos", (req, res) => {
  const data = req.body;

  const q = "INSERT INTO cargos SET ?"

  pool.getConnection((err, con) => {
    if (err) return next(err);

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
  const { nome_cargo, descricao, func_masc, func_fem, func_menor, fk_setor_id } = req.body;

  const q = `
    UPDATE cargos
    SET nome_cargo = ?,
    descricao = ?,
    func_masc = ?,
    func_fem = ?,
    func_menor = ?,
    fk_setor_id = ?
    WHERE id_cargo = ?
    `;

  const values = [
    nome_cargo,
    descricao,
    func_masc,
    func_fem,
    func_menor,
    id_cargo,
    fk_setor_id,
    id_cargo,
  ];

  pool.getConnection((err, con) => {
    if (err) return next(err);

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

router.put("/cargos/activate/:id_cargo", (req, res) => {
  const id_cargo = req.params.id_cargo;
  const { ativo } = req.body;

  const q = 'UPDATE cargos SET ativo = ? WHERE id_cargo = ?';
  const values = [ativo, id_cargo];

  pool.getConnection((err, con) => {
    if (err) return res.status(500).json({ error: 'Erro ao obter conexão.' });

    con.query(q, values, (err) => {
      con.release();

      if (err) {
        console.error('Erro ao atualizar status do cargo:', err);
        return res.status(500).json({ error: 'Erro ao atualizar status do cargo.' });
      }

      res.status(200).json({ message: 'Status do cargo atualizado com sucesso.' });
    });
  });
});



//Tabela Contato
//Get table
router.get("/contatos", (req, res) => {
  const q = `SELECT * FROM contatos`;

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
router.post("/contatos", (req, res) => {
  const data = req.body;

  const q = "INSERT INTO contatos SET ?"

  pool.getConnection((err, con) => {
    if (err) return next(err);

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
    if (err) return next(err);

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

router.put("/contatos/activate/:id_contato", (req, res) => {
  const id_contato = req.params.id_contato;
  const { ativo } = req.body;

  const q = 'UPDATE contatos SET ativo = ? WHERE id_contato = ?';
  const values = [ativo, id_contato];

  pool.getConnection((err, con) => {
    if (err) return res.status(500).json({ error: 'Erro ao obter conexão.' });

    con.query(q, values, (err) => {
      con.release();

      if (err) {
        console.error('Erro ao atualizar status do contato:', err);
        return res.status(500).json({ error: 'Erro ao atualizar status do contato.' });
      }

      res.status(200).json({ message: 'Status do contato atualizado com sucesso.' });
    });
  });
});




//Tabela Processos
//Get table
router.get("/processos", (req, res) => {
  const q = `SELECT * FROM processos`;

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
router.post("/processos", (req, res) => {
  const data = req.body;

  const q = "INSERT INTO processos SET ?"

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, data, (err, result) => {
      if (err) {
        console.error("Erro ao inserir processo na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json(`Processo cadastrado com sucesso!`);
    });

    con.release();
  })

});

//Update row int table
router.put("/processos/:id_processo", (req, res) => {
  const id_processo = req.params.id_processo; // Obtém o ID da empresa da URL
  const { nome_processo, descricao, fk_setor_id, fk_cargo_id } = req.body;

  const q = `
    UPDATE processos
    SET nome_processo = ?,
    descricao = ?,
    fk_setor_id = ?,
    fk_cargo_id = ?
    WHERE id_processo = ?
    `;

  const values = [
    nome_processo,
    descricao,
    fk_setor_id,
    fk_cargo_id,
    id_processo
  ];

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, values, (err) => {
      if (err) {
        console.error("Erro ao atualizar processo na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json("Processo atualizado com sucesso!");
    });

    con.release();
  })

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



//Tabela Riscos
//Get table
router.get("/riscos", (req, res) => {
  const q = `SELECT * FROM riscos`;

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
router.post("/riscos", (req, res) => {
  const data = req.body;

  const q = "INSERT INTO riscos SET ?"

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, data, (err, result) => {
      if (err) {
        console.error("Erro ao inserir risco na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json(`Risco cadastrado com sucesso!`);
    });

    con.release();
  })

});

//Update row int table
router.put("/riscos/:id_risco", (req, res) => {
  const id_risco = req.params.id_risco; // Obtém o ID da empresa da URL
  const {
    nome_risco,
    grupo_risco,
    codigo_esocial_risco,
    meio_propagacao_risco,
    unidade_medida_risco,
    classificacao_risco,
    nivel_acao_risco,
    limite_tolerancia_risco,
    danos_saude_risco,
    metodologia_risco,
    severidade_risco,
    pgr_risco,
    ltcat_risco,
    lip_risco,
    fk_processo_id
  } = req.body;

  const q = `
    UPDATE riscos
    SET nome_risco = ?,
    grupo_risco = ?,
    codigo_esocial_risco = ?,
    meio_propagacao_risco = ?,
    unidade_medida_risco = ?,
    classificacao_risco = ?,
    nivel_acao_risco = ?,
    limite_tolerancia_risco = ?,
    danos_saude_risco = ?,
    metodologia_risco = ?,
    severidade_risco = ?,
    pgr_risco = ?,
    ltcat_risco = ?,
    lip_risco = ?,
    fk_processo_id = ?
    WHERE id_risco = ?
    `;

  const values = [
    nome_risco,
    grupo_risco,
    codigo_esocial_risco,
    meio_propagacao_risco,
    unidade_medida_risco,
    classificacao_risco,
    nivel_acao_risco,
    limite_tolerancia_risco,
    danos_saude_risco,
    metodologia_risco,
    severidade_risco,
    pgr_risco,
    ltcat_risco,
    lip_risco,
    fk_processo_id,
    id_risco
  ];

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, values, (err) => {
      if (err) {
        console.error("Erro ao atualizar risco na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json("Risco atualizado com sucesso!");
    });

    con.release();
  })

});



//Medidas de Proteção
//Tabela EPI's
//Get table
router.get("/medidas_epi", (req, res) => {
  const q = `SELECT * FROM medidas_epi`;

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
router.post("/medidas_epi", (req, res) => {
  const data = req.body;

  const q = "INSERT INTO medidas_epi SET ?"

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, data, (err, result) => {
      if (err) {
        console.error("Erro ao inserir Medida na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json(`Medida cadastrado com sucesso!`);
    });

    con.release();
  })

});

router.put("/medidas_epi/:id_medida", (req, res) => {
  const id_medida = req.params.id_medida;
  const {
    nome_medida,
    certificado_medida,
    fator_reducao_medida,
    vencimento_certificado_medida,
    fabricante_medida,
  } = req.body;

  const q = `
    UPDATE medidas_epi
    SET nome_medida = ?,
    certificado_medida = ?,
    fator_reducao_medida = ?,
    vencimento_certificado_medida = ?,
    fabricante_medida = ?
    WHERE id_medida = ?
    `;

  const values = [
    nome_medida,
    certificado_medida,
    fator_reducao_medida,
    vencimento_certificado_medida,
    fabricante_medida,
    id_medida
  ];

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, values, (err) => {
      if (err) {
        console.error("Erro ao atualizar medida na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json("Medida atualizado com sucesso!");
    });

    con.release();
  })

});


//Medidas Adminitrativas
//Get Table
router.get("/medidas_adm", (req, res) => {
  const q = `SELECT * FROM medidas_adm`;

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
router.post("/medidas_adm", (req, res) => {
  const data = req.body;

  const q = "INSERT INTO medidas_adm SET ?"

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, data, (err, result) => {
      if (err) {
        console.error("Erro ao inserir Medida na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json(`Medida cadastrado com sucesso!`);
    });

    con.release();
  })

});

router.put("/medidas_adm/:id_medida_adm", (req, res) => {
  const id_medida_adm = req.params.id_medida_adm;
  const {
    descricao_medida_adm,
  } = req.body;

  const q = `UPDATE medidas_adm SET descricao_medida_adm = ? WHERE id_medida_adm = ?`;

  const values = [
    descricao_medida_adm,
    id_medida_adm,
  ];

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, values, (err) => {
      if (err) {
        console.error("Erro ao atualizar medida na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json("Medida atualizado com sucesso!");
    });

    con.release();
  })

});


//Medidas EPC's
//Get Table
router.get("/medidas_epc", (req, res) => {
  const q = `SELECT * FROM medidas_epc`;

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
router.post("/medidas_epc", (req, res) => {
  const data = req.body;

  const q = "INSERT INTO medidas_epc SET ?"

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, data, (err, result) => {
      if (err) {
        console.error("Erro ao inserir Medida na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json(`Medida cadastrado com sucesso!`);
    });

    con.release();
  })

});

router.put("/medidas_epc/:id_medida", (req, res) => {
  const id_medida = req.params.id_medida;
  const {
    descricao_medida
  } = req.body;

  const q = `UPDATE medidas_epc SET descricao_medida = ? WHERE id_medida = ?`;

  const values = [
    descricao_medida,
    id_medida
  ];

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, values, (err) => {
      if (err) {
        console.error("Erro ao atualizar medida na tabela", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json("Medida atualizado com sucesso!");
    });

    con.release();
  })

});





//Gestão

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
// Adicione a seguinte rota para selecionar a empresa correspondente ao id
router.get("/selectCompany/:id_empresa", (req, res) => {
  const { id_empresa } = req.params;

  const q = 'SELECT * FROM empresas WHERE id_empresa = ?';

  pool.getConnection((err, con) => {
    if (err) {
      console.error('Erro ao obter conexão do pool', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    con.query(q, [id_empresa], (err, results) => {
      con.release();

      if (err) {
        console.error('Erro ao selecionar Empresa', err);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      const company = results[0];

      if (company) {
        res.status(200).json({ message: 'Empresa encontrada com sucesso', company });
      } else {
        res.status(404).json({ message: 'Empresa não encontrada' });
      }
    });
  });
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



// Vinculos
//Vinculando processo aos setores
//Get Table
router.get("/setores_processos", (req, res) => {
  const q = `SELECT * FROM setores_processos`;

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
router.post("/setores_processos", (req, res) => {
  const data = req.body;

  const q = "INSERT INTO setores_processos SET ?"

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, data, (err, result) => {
      if (err) {
        console.error("Erro ao vincular processo no setor", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json(`Processo vinculado com sucesso!`);
    });

    con.release();
  })

});

//Delete rows in table
router.delete("/setores_processos/:id_setor_processo", (req, res) => {
  const id_setor_processo = req.params.id_setor_processo;

  const sql = "DELETE FROM setores_processos WHERE id_setor_processo = ?";

  pool.getConnection((err, con) => {
    if (err) {
      console.error("Erro ao obter conexão do pool", err);
      return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
    }

    con.query(sql, [id_setor_processo], (err, result) => {
      con.release();

      if (err) {
        console.error("Erro ao deletar o vínculo", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json({ message: "Vínculo excluido com sucesso" });
    });
  });
});


//Vinculando riscos aos processos
//Get Table
router.get("/processos_riscos", (req, res) => {
  const q = `SELECT * FROM processos_riscos`;

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
router.post("/processos_riscos", (req, res) => {
  const data = req.body;

  const q = "INSERT INTO processos_riscos SET ?"

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, data, (err, result) => {
      if (err) {
        console.error("Erro ao vincular risco ao processo", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json(`Vinculado com sucesso!`);
    });

    con.release();
  })

});

//Delete rows in table
router.delete("/processos_riscos/:id_processo_risco", (req, res) => {
  const id_processo_risco = req.params.id_processo_risco;

  const sql = "DELETE FROM processos_riscos WHERE id_processo_risco = ?";

  pool.getConnection((err, con) => {
    if (err) {
      console.error("Erro ao obter conexão do pool", err);
      return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
    }

    con.query(sql, [id_processo_risco], (err, result) => {
      con.release();

      if (err) {
        console.error("Erro ao deletar o vínculo", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json({ message: "Vínculo excluido com sucesso" });
    });
  });
});



//Vinculando medidas aos riscos
//Get Table
router.get("/riscos_medidas", (req, res) => {
  const q = `SELECT * FROM riscos_medidas`;

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
router.post("/riscos_medidas", (req, res) => {
  const data = req.body;

  const q = "INSERT INTO riscos_medidas SET ?"

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, data, (err, result) => {
      if (err) {
        console.error("Erro ao vincular Medida de proteção ao risco", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json(`Vinculado com sucesso!`);
    });

    con.release();
  })

});

router.delete("/riscos_medidas/:id_risco_medida", (req, res) => {
  const id_risco_medida = req.params.id_risco_medida;

  const sql = "DELETE FROM riscos_medidas WHERE id_risco_medida = ?";

  pool.getConnection((err, con) => {
    if (err) {
      console.error("Erro ao obter conexão do pool", err);
      return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
    }

    con.query(sql, [id_risco_medida], (err, result) => {
      con.release();

      if (err) {
        console.error("Erro ao deletar o vínculo", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json({ message: "Vínculo excluido com sucesso" });
    });
  });
});



//Inventário de Riscos
//Get Table
router.get("/inventario", (req, res) => {
  const q = `SELECT * FROM inventario`;

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
router.post("/inventario", (req, res) => {
  const data = req.body;

  const q = "INSERT INTO inventario SET ?"

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, data, (err, result) => {
      if (err) {
        console.error("Erro ao cadastrar iventário", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json(`Inventário adicionado com sucesso!`);
    });

    con.release();
  })

});

//Update row int table
router.put("/inventario/:id_inventario", (req, res) => {
  const id_inventario = req.params.id_inventario; // Obtém o ID da empresa da URL
  const {
    data,
    fk_empresa_id,
    fk_unidade_id,
    fk_setor_id,
    pessoas_expostas,
    fk_processo_id,
    fk_risco_id,
    fontes,
    medicao,
    medidas,
    probabilidade,
    nivel,
    comentarios
  } = req.body;

  const q = `
    UPDATE inventario
    SET data = ?,
    fk_empresa_id = ?,
    fk_unidade_id = ?,
    fk_setor_id = ?,
    pessoas_expostas = ?,
    fk_processo_id = ?,
    fk_risco_id = ?,
    fontes = ?,
    medicao = ?,
    medidas = ?,
    probabilidade = ?,
    nivel = ?,
    comentarios = ?
    WHERE id_inventario = ?
    `;

  const values = [
    data,
    fk_empresa_id,
    fk_unidade_id,
    fk_setor_id,pessoas_expostas,
    fk_processo_id,
    fk_risco_id,
    fontes,
    medicao,
    medidas,
    probabilidade,
    nivel,
    comentarios,
    id_inventario
  ];

  pool.getConnection((err, con) => {
    if (err) return next(err);

    con.query(q, values, (err) => {
      if (err) {
        console.error("Erro ao atualizar Inventário", err);
        return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
      }

      return res.status(200).json("Inventário atualizado com sucesso!");
    });
  })

});






export default router;