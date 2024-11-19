// routes/index.js
import express from 'express';
import adminRoutes from './adminRouter/adminRouter'; // Import the adminRoutes

const Router = express();
const api = '/api/v1';

// Use the adminRoutes for the /api/v1/admin path
Router.use(`${api}/admin`, adminRoutes);

export default Router;
