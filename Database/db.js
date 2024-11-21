import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a MySQL connection pool
const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Test the connection to the database
async function testConnection() {
  try {
    const connection = await db.getConnection();  // Get a connection to check
    console.log('Connection to Database Success :)');
    connection.release();  // Release the connection after test
  } catch (error) {
    console.error('Database Connection Failed', error);
  }
}

// Query function to run SQL commands
async function query(command, values) {
  try {
    const [results] = await db.query(command, values ?? []);  // Safe default value for undefined values
    return results;
  } catch (error) {
    console.error('Database Query Error', error);
    throw error;  // Rethrow to allow proper error handling further
  }
}

export { db, testConnection, query };
