import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'palindromecheck_app',
    connectionLimit: 5
});

const getConnection = async () => {
    return pool.getConnection();
};

const testConnection = async () => {
    try {
        const conn = await getConnection();
        console.log("Database connected successfully");
        conn.release();
    } catch (err) {
        console.error("Database failed to connect", err);
    }
};

// Runs test if the file is executed directly
if (require.main === module ) {
    testConnection();
};

export { getConnection };