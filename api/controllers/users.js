import { db } from "../db.js";

//Empresa
export const getEmpresas = (_, res) => {
    const q = "SELECT * FROM empresa";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
}

export const addEmpresas = (req, res) => {
    const q = "INSERT INTO empresa (`nome_empresa`, `razao_social`, `cnpj`, `endereco`, `cidade`, `contato`, `telefone`) VALUES (?)";

    const values = [
        req.body.nome_empresa,
        req.body.razao_social,
        req.body.cnpj,
        req.body.endereco,
        req.body.cidade,
        req.body.contato,
        req.body.telefone
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Empresa Cadastrado com sucesso!")
    })
}

export const updateEmpresas = (req, res) => {
    const q = "UPDATE empresa SET `nome_empresa` = ?, `razao_social` = ?, `cnpj` = ?, `endereco` = ?, `cidade` = ?, `contato` = ?, `telefone` = ? WHERE `id` = ?";
    const values = [
        req.body.nome_empresa,
        req.body.razao_social,
        req.body.cnpj,
        req.body.endereco,
        req.body.cidade,
        req.body.contato,
        req.body.telefone
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err)

        return res.status(200).json("Empresa Atualizado com Sucesso!")
    })
}

export const deleteEmpresas = (req, res) => {
    const q = "DELETE FROM empresa WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err)

        return res.status(200).json("Empresa Excluido com sucesso")
    })
}



//Setores
export const getSetores = (_, res) => {
        const q = "SELECT * FROM setor";
    
        db.query(q, (err, data) => {
            if (err) return res.json(err);
    
            return res.status(200).json(data);
        });
    }
    
export const addSetores = (req, res) => {
        const q = "INSERT INTO setor (`nome_setor`, `descricao`, `fk_id_empresa`) VALUES (?)";
    
        const values = [
            req.body.nome_setor,
            req.body.descricao
        ];
    
        db.query(q, [values], (err) => {
            if (err) return res.json(err);
    
            return res.status(200).json("Setor Cadastrado com sucesso!")
        })
    }
    
export const updateSetores = (req, res) => {
        const q = "UPDATE setor SET `nome_setor` = ?, `descricao` = ?, `fk_id_empresa` = ? WHERE `id` = ?";
        const values = [
            req.body.nome_setor,
            req.body.descricao
        ];
    
        db.query(q, [...values, req.params.id], (err) => {
            if (err) return res.json(err)
    
            return res.status(200).json("Setor Atualizado com Sucesso!")
        })
    }
    
export const deleteSetores = (req, res) => {
        const q = "DELETE FROM setor WHERE `id` = ?";
    
        db.query(q, [req.params.id], (err) => {
            if (err) return res.json(err)
    
            return res.status(200).json("Setor Excluido com sucesso")
        })
    }


