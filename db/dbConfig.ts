import { Pool } from 'pg';

const pool = new Pool({
    user: 'patelm', // replace with your PostgreSQL username
    host: 'localhost',      // replace with your PostgreSQL host
    database: 'satsDB', // replace with your PostgreSQL database name
    password: '12345678', // replace with your PostgreSQL password
    port: 5432,             // default PostgreSQL port
});

export default pool;
