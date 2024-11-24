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
  "/",
  (req, res, next) => {
    kategoriImages.single("gambar")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message }); // Tampilkan error multer
      }
      next();
    });
  },
  addKategori
);

// Route untuk mendapatkan semua kategori
kategoriRouters.get("/", getAllKategori);

// Route untuk mendapatkan kategori sederhana (hanya nama dan gambar)
kategoriRouters.get("/nama", getSimpleKategori);

// Route untuk menghapus kategori berdasarkan ID
kategoriRouters.delete("/:kategori_id", deleteKategori);

export default kategoriRouters;