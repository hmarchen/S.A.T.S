import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres', // replace with your PostgreSQL username
    host: 'localhost',      // replace with your PostgreSQL host
    database: 'sats', // replace with your PostgreSQL database name
    password: 'password', // replace with your PostgreSQL password
    port: 5433,             // default PostgreSQL port
});

export default pool;
