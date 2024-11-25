import express from 'express';
import passport from 'passport';
import {
  loginAdmin,
  ambilAdminByEmail,
  ambilSemuaAdmin,
  tambahAdmin,
  hapusAdmin,
  updateAdmin,
} from '../controllers/admin.js';
import { adminImages } from "../middlewares/multerAdmin.js";

const adminRoutes = express.Router();

// Route Login
adminRoutes.post('/login', loginAdmin);

// CRUD Admin
adminRoutes.post('/', passport.authenticate('internal-rule', { session: false }), adminImages.single('foto_pr'), tambahAdmin); // Tambah admin
adminRoutes.get('/', passport.authenticate('internal-rule', { session: false }), ambilSemuaAdmin); // Ambil semua admin
adminRoutes.get('/email/:email', passport.authenticate('internal-rule', { session: false }), ambilAdminByEmail); // Ambil admin by email
adminRoutes.put('/email/:email', passport.authenticate('internal-rule', { session: false }), adminImages.single('foto_pr'), updateAdmin); // Update data admin
adminRoutes.delete('/email/:email', passport.authenticate('internal-rule', { session: false }), hapusAdmin); // Hapus admin

export default adminRoutes;
