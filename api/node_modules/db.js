import mysql from "mysql";

export const db = mysql.createConnection({
    host: 'db4free.net', port: 3306,
    user: 'medworkldn',
    password: 'mdaiik123',
    database: 'bd_medwork'
})
