import express from 'express';
import {
  loginAdmin,
  ambilAdminByEmail,
  ambilSemuaAdmin,
  tambahFotoAdmin,
  updateFotoAdmin,
  hapusFotoAdmin,
  updateAdmin,
} from '../controllers/admin.js';

const adminRoutes = express.Router();

// Routes for admin
adminRoutes.post('/login', loginAdmin);  // POST route for admin login
adminRoutes.get('/email/:email', ambilAdminByEmail);  // GET route for fetching admin by email
adminRoutes.get('/', ambilSemuaAdmin);  // GET route for fetching all admins
adminRoutes.post('/email/:email/foto', tambahFotoAdmin);  // POST route for adding admin photo
adminRoutes.put('/email/:email/foto', updateFotoAdmin);  // PUT route for updating admin photo
adminRoutes.delete('/email/:email/foto', hapusFotoAdmin);  // DELETE route for removing admin photo
adminRoutes.put('/email/:email', updateAdmin);  // PUT route for updating admin details

export default adminRoutes;
