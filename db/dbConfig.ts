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
