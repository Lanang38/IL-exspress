import express from 'express';
import passport from 'passport';
import {
  registerUsers,
  loginUsers,
  googleAuth,
  googleAuthCallback,
} from '../controllers/mobilepengguna.js';
import { penggunaimages } from '../middlewares/multerpengguna.js';

const mobilepenggunaRoutes = express.Router();



// **Route Registrasi dan Login**
mobilepenggunaRoutes.post('/daftar', registerUsers); // Registrasi user baru
mobilepenggunaRoutes.post('/login', loginUsers); // Login user

// **Route Google Login**
mobilepenggunaRoutes.get('/auth/google', googleAuth); // Redirect ke Google
mobilepenggunaRoutes.get('/auth/google/callback', googleAuthCallback); // Callback setelah login Google



export default mobilepenggunaRoutes;