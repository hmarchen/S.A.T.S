import pool from './dbConfig';

const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to the database successfully!');

        // Perform the SELECT query
        const result = await client.query('SELECT * FROM Email');
        console.log('Email Records:', result.rows); // Display the records in the console

        client.release();
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

testConnection(); 