import express from "express";
import { 
  getUsers, 
  deleteUser, 
  getUserByEmail, 
  getUserByName 
} from "../controllers/pengguna.js"; // Pastikan fungsi diimpor dengan benar

const penggunaRoutes = express.Router();

// Route untuk mendapatkan semua pengguna dengan pagination (jika ada)
penggunaRoutes.get("/", getUsers);

// Route untuk mendapatkan pengguna berdasarkan email
penggunaRoutes.get("/email/:email_user", getUserByEmail);

// Route untuk mendapatkan pengguna berdasarkan nama
penggunaRoutes.get("/name/:nama_user", getUserByName);

// Route untuk menghapus pengguna berdasarkan email
penggunaRoutes.delete("/:email_user", deleteUser);

export default penggunaRoutes;