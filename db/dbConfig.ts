<<<<<<< HEAD
import { Pool } from 'pg';

const pool = new Pool({
    user: 'patelm', // replace with your PostgreSQL username
    host: 'localhost',      // replace with your PostgreSQL host
    database: 'satsDB', // replace with your PostgreSQL database name
    password: '12345678', // replace with your PostgreSQL password
    port: 5432,             // default PostgreSQL port
});

export default pool;
=======
require('dotenv').config();
import { Pool } from 'pg';

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const pool = new Pool({
    database: dbName, 
    user: dbUser,
    host: 'localhost',
    password: dbPass,
    port: 5432,
});

export default pool;
>>>>>>> f2ce5511a0e46cbc1cd88c913bde165ac763111a
