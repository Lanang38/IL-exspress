import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { testConnection } from './Database/db.js'; // Import the DB connection
import router from './router/index.js'; // Import the main router

dotenv.config();
const app = express();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Gunakan router utama
app.use('/', router);

// Start the server
app.listen(process.env.APP_PORT, async () => {
  await testConnection();  // Ensure database connection works
  console.log(`Running at http://localhost:${process.env.APP_PORT}`);
});
