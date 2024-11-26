import express from 'express';
import passport from 'passport';
import { registerAdmin, ambilAdminByEmail, ambilSemuaAdmin, updateAdmin, hapusAdmin } from '../controllers/admin.js';
import { adminImages } from '../middlewares/multerAdmin.js';

const adminRoutes = express.Router();

// Route Login
adminRoutes.post('/login', registerAdmin);

// CRUD Admin
adminRoutes.post('/', passport.authenticate('internal-rule', { session: false }), adminImages.single('foto_pr'), registerAdmin); // Gabungkan register dan tambah admin
adminRoutes.get('/', passport.authenticate('internal-rule', { session: false }), ambilSemuaAdmin); // Ambil semua admin
adminRoutes.get('/:email', passport.authenticate('internal-rule', { session: false }), ambilAdminByEmail); // Ambil admin by email
adminRoutes.put('/:email', passport.authenticate('internal-rule', { session: false }), adminImages.single('foto_pr'), updateAdmin); // Update data admin
adminRoutes.delete('/:email', passport.authenticate('internal-rule', { session: false }), hapusAdmin); // Hapus admin

export default adminRoutes;
