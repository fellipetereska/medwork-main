import mysql from "mysql";

export const pool = mysql.createPool({
    host: '50.116.112.129', port: 3306,
    user: 'asse3972_medworkldn',
    password: 'mdk@#ldn!$',
    database: 'asse3972_db_medwork',
    multipleStatements: true,
    connectionLimit: 10,
});
