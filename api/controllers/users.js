import { db } from "../db.js";

// Define o objeto de mapeamento de tabelas para campos
const tableFieldsMap = {
  empresa: {
    table: 'empresa',
    fields: ['nome_empresa', 'razao_social', 'cnpj', 'endereco', 'cidade', 'contato', 'telefone'],
  },
  setor: {
    table: 'setor',
    fields: ['nome_setor', 'descricao', 'fk_id_empresa'],
  },
};

export const getTableData = (req, res) => {
  const tableName = req.params.table;
  const tableFields = tableFieldsMap[tableName];

  if (!tableFields) {
    return res.status(404).json({ error: 'Tabela não encontrada' });
  }

  const q = `SELECT * FROM ${tableFields.table}`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
}

export const addTableData = (req, res) => {
  const tableName = req.params.table;
  const tableFields = tableFieldsMap[tableName];

  if (!tableFields) {
    return res.status(404).json({ error: 'Tabela não encontrada' });
  }

  const fields = tableFields.fields;

  const values = fields.map(field => req.body[field]);

  const q = `INSERT INTO ${tableFields.table} (${fields.join(', ')}) VALUES (?)`;

  db.query(q, [values], (err) => {
    if (err) {
      console.error("Erro ao inserir dados na tabela", err);
      return res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
    }

    return res.status(200).json(`${tableName} cadastrado com sucesso!`);
  });
}

export const updateTableData = (req, res) => {
  const tableName = req.params.table;
  const tableFields = tableFieldsMap[tableName];

  if (!tableFields) {
    return res.status(404).json({ error: 'Tabela não encontrada' });
  }

  const fields = tableFields.fields;

  const q = `UPDATE ${tableFields.table} SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE id = ?`;

  const values = fields.map(field => req.body[field]);

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(`${tableName} atualizado com sucesso!`);
  });
}

export const deleteTableData = (req, res) => {
  const tableName = req.params.table;
  const tableFields = tableFieldsMap[tableName];

  if (!tableFields) {
    return res.status(404).json({ error: 'Tabela não encontrada' });
  }

  const q = `DELETE FROM ${tableFields.table} WHERE id = ?`;

  db.query(q, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(`${tableName} excluído com sucesso!`);
  });
}
