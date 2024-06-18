import mysql from "mysql";

// export const pool = mysql.createPool({
//     host: '50.116.112.129', port: 3306,
//     user: 'asse3972_medworkldn',
//     password: 'mdk@#ldn!$',
//     database: 'asse3972_db_medwork',
//     multipleStatements: true,
//     connectionLimit: 10,
// });

// export const pool = mysql.createPool({
//     host: 'localhost', port: 3306,
//     user: 'root',
//     password: 'mdaiik123',
//     database: 'asse3972_db_medwork',
// });

export const pool = mysql.createPool({
    host: '50.116.112.129', port: 3306,
    user: 'asse3972_medworkld_joao',
    password: 'Jo@159a753s',
    database: 'asse3972_db_medwork_dev',
    multipleStatements: true,
    connectionLimit: 10,
});