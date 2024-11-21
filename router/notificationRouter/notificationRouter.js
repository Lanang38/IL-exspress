import express from "express";
import {
  tambahNotifikasi,
  ambilSemuaNotifikasi,
  ambilNotifikasiById,
  editNotifikasi,
  hapusNotifikasi,
} from "../../controllers/notification.js";

const notificationRoutes = express.Router();

// Tambah notifikasi
notificationRoutes.post("/", tambahNotifikasi);

// Ambil semua notifikasi
notificationRoutes.get("/", ambilSemuaNotifikasi);

// Ambil notifikasi berdasarkan ID
notificationRoutes.get("/:id", ambilNotifikasiById);

// Edit notifikasi berdasarkan ID
notificationRoutes.put("/:id", editNotifikasi);

// Hapus notifikasi berdasarkan ID
notificationRoutes.delete("/:id", hapusNotifikasi);

export default notificationRoutes;