// routes/adminRoutes.js
import express from "express";
import {
  loginAdmin,
  ambilAdminByEmail,
  ambilSemuaAdmin,
  tambahFotoAdmin,
  updateFotoAdmin,
  hapusFotoAdmin,
  updateAdmin,
} from "../controllers/adminController.js";

const adminRoutes = express();

// Route untuk login admin
adminRoutes.post("/login", loginAdmin);

// Route untuk mengambil data admin berdasarkan email
adminRoutes.get("/admin/email/:email", ambilAdminByEmail);

// Route untuk mengambil semua data admin (foto, nama panggilan, email, telepon)
adminRoutes.get("/admin", ambilSemuaAdmin);

// Route untuk menambahkan foto admin
adminRoutes.post("/admin/email/:email/foto", tambahFotoAdmin);

// Route untuk mengupdate foto admin
adminRoutes.put("/admin/email/:email/foto", updateFotoAdmin);

// Route untuk menghapus foto admin
adminRoutes.delete("/admin/email/:email/foto", hapusFotoAdmin);

// Route untuk mengupdate data admin
adminRoutes.put("/admin/email/:email", updateAdmin);

export default adminRoutes;
