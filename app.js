import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { testConnection } from './Database/db.js'; // Import the DB connection
import adminRoutes from './router/adminRouter.js'; // Import admin routes
import catatanRoutes from './router/catatanRouter.js'; 
import fiturRoutes from './router/fiturRouter.js';
import mentorRoutes from './router/mentorRouter.js';

dotenv.config();
const app = express();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Admin routes
app.use('/adminRouter', adminRoutes);
// catatan routes
app.use('/catatanRouter', catatanRoutes);
// fitur routes
app.use('/fiturRouter', fiturRoutes);
// mentor routes
app.use('/mentorRouter', mentorRoutes);


// Start the server
app.listen(process.env.APP_PORT, async () => {
  await testConnection();  // Ensure database connection works
  console.log(`Running at http://localhost:${process.env.APP_PORT}`);
});
