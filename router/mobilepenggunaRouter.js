import express from 'express';
import passport from 'passport';
import { 
  registerUsers, 
  loginUsers, 

} from '../controllers/mobilepengguna.js';
import { penggunaimages } from '../middlewares/multerpengguna.js';

const mobilepenggunaRoutes = express.Router();

// **Route Registrasi dan Login**
mobilepenggunaRoutes.post('/daftar',  registerUsers); // Registrasi admin baru
mobilepenggunaRoutes.post('/login', loginUsers); // Login admin



export default mobilepenggunaRoutes;
