import express from "express";
import { addKategori, getAllKategori, deleteKategori } from "../controllers/kategori.js";
import { kategoriImages } from "../middlewares/multerKategori.js";

const kategoriRouter = express.Router();

// Tambah kategori dengan gambar
kategoriRouter.post("/", kategoriImages.single("gambar"), addKategori);

// Ambil semua kategori
kategoriRouter.get("/", getAllKategori);

// Hapus kategori berdasarkan ID
kategoriRouter.delete("/:kategori_id", deleteKategori);

export default kategoriRouter;
