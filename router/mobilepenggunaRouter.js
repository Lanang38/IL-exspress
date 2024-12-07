import express from 'express';
import passport from 'passport';
import {
  registerUsers,
  loginUsers,
  googleAuth,
  googleAuthCallback,
  ambilSemuaPengguna,
  updatePengguna,
  updatePassword,
  lupaPassword, // Tambahkan lupaPassword
  resetPasswordWithOTP, // Tambahkan resetPasswordWithOTP
} from '../controllers/mobilepengguna.js';
import { penggunaimages } from '../middlewares/multerpengguna.js';
import { verifyToken } from '../middlewares/auth.js'; // Import middleware verifyToken

const mobilepenggunaRoutes = express.Router();


// **Route Registrasi dan Login**
mobilepenggunaRoutes.post('/daftar', registerUsers); // Registrasi user baru
mobilepenggunaRoutes.post('/login', loginUsers); // Login user

// **Route Google Login**
mobilepenggunaRoutes.get('/auth/google', googleAuth); // Redirect ke Google
mobilepenggunaRoutes.get('/auth/google/callback', googleAuthCallback); // Callback setelah login Google

// **Update Profile**
mobilepenggunaRoutes.put('/profile', verifyToken, penggunaimages.single("foto_profile"), updatePengguna); 
// Verifikasi token sebelum update profil

// **Update Password**
mobilepenggunaRoutes.put('/password', verifyToken, updatePassword); 

// **Ambil Akun**
mobilepenggunaRoutes.get('/', verifyToken, ambilSemuaPengguna); 
// Verifikasi token untuk mendapatkan data pengguna

// **Lupa Password (Kirim OTP)**
mobilepenggunaRoutes.post('/lupapassword', lupaPassword); 

// **Reset Password dengan OTP**
mobilepenggunaRoutes.post('/resetpassword', resetPasswordWithOTP);

export default mobilepenggunaRoutes;
