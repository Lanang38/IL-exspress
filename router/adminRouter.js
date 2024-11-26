import express from 'express';
import passport from 'passport';
import { 
  registerAdmin, 
  loginAdmin, 
  ambilAdminByEmail, 
  ambilSemuaAdmin, 
  updateAdmin, 
  updatePassword, 
  hapusAdmin 
} from '../controllers/admin.js';
import { adminImages } from '../middlewares/multerAdmin.js';

const adminRoutes = express.Router();

// **Route Registrasi dan Login**
adminRoutes.post('/daftar', adminImages.single('foto_pr'), registerAdmin); // Registrasi admin baru
adminRoutes.post('/login', loginAdmin); // Login admin

// **Route CRUD Admin (dengan autentikasi JWT)**
adminRoutes.get('/', passport.authenticate('internal-rule', { session: false }), ambilSemuaAdmin); // Ambil semua admin
adminRoutes.get('/:email', passport.authenticate('internal-rule', { session: false }), ambilAdminByEmail); // Ambil admin berdasarkan email
adminRoutes.put('/:email', passport.authenticate('internal-rule', { session: false }), adminImages.single('foto_pr'), updateAdmin); // Update data admin
adminRoutes.put('/:email/password', passport.authenticate('internal-rule', { session: false }), updatePassword); // Update password admin
adminRoutes.delete('/:email', passport.authenticate('internal-rule', { session: false }), hapusAdmin); // Hapus admin

export default adminRoutes;
