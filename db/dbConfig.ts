import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

// returning undefined for some reason....
const dbName = process.env.REACT_APP_DB_NAME;
const dbUser = process.env.REACT_APP_DB_USER;
const dbPass = process.env.REACT_APP_DB_PASS;

const pool = new Pool({
    database: dbName || 'satsDB', 
    user: dbUser || 'sats_admin',
    host: 'localhost',
    password: dbPass || '12345678',
    port: 5432,
});

export default pool;