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
import { adminImages } from "../middlewares/multerAdmin.js";

const adminRoutes = express.Router();

// Routes untuk admin
adminRoutes.post('/login', loginAdmin);  // POST route untuk login admin
adminRoutes.get('/email/:email', ambilAdminByEmail);  // GET route untuk mengambil admin berdasarkan email
adminRoutes.get('/', ambilSemuaAdmin);  // GET route untuk mengambil semua admin
adminRoutes.post('/email/:email/foto', adminImages.single('foto'), tambahFotoAdmin);  // POST route untuk menambah foto admin
adminRoutes.put('/email/:email/foto', adminImages.single('foto'), updateFotoAdmin);  // PUT route untuk update foto admin
adminRoutes.delete('/email/:email/foto', hapusFotoAdmin);  // DELETE route untuk menghapus foto admin
adminRoutes.put('/email/:email', updateAdmin);  // PUT route untuk update data admin

export default adminRoutes;
