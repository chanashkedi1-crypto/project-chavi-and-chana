import mysql from 'mysql2/promise';
import dotenv from 'dotenv';


dotenv.config();
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mysql2026@',
    database: 'init_db'
});
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

export default db;