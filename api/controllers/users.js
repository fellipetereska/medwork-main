import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM empresa";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
}

export const addUser = (req, res) => {
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

        return res.status(200).json("Aluno Cadastrado com sucesso!")
    })
}

export const updateUser = (req, res) => {
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

        return res.status(200).json("Aluno Atualizado com Sucesso!")
    })
}

export const deleteUser = (req, res) => {
    const q = "DELETE FROM empresa WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err)

        return res.status(200).json("Aluno Excluido com sucesso")
    })
}