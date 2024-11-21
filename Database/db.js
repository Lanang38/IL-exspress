import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config()

const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

async function testConnection() {
  try {
    await db.getConnection();
    console.log("Connection Database Succsess :)");
  } catch (error) {
    console.error("Database Connection Failed", error);
  }
}

async function query(command, values) {
  try {
    const [value] = await db.query(command, values ?? []);
    return value;
  } catch (error) {
    console.error(error);
  }
}

export { db, testConnection, query };
