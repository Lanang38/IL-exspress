import express from "express";
import {
  addKategori,
  getAllKategori,
  getSimpleKategori,
  deleteKategori,
} from "../controllers/kategori.js";
import { kategoriImages } from "../middlewares/multerKategori.js";

const kategoriRouters = express.Router();

// Route untuk menambahkan kategori dengan upload file
kategoriRouters.post(
  "/kategori",
  kategoriImages.single("gambar"), // Middleware multer untuk satu file
  addKategori
);

// Route untuk mendapatkan semua kategori
kategoriRouters.get("/kategori", getAllKategori);

// Route untuk mendapatkan kategori sederhana (hanya nama dan gambar)
kategoriRouters.get("/kategori/simple", getSimpleKategori);

// Route untuk menghapus kategori berdasarkan ID
kategoriRouters.delete("/kategori/:kategori_id", deleteKategori);

export default kategoriRouters;