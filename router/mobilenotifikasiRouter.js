import express from "express";
import { ambilNotifikasiKategoriMentor } from "../controllers/mobilenotifikasi.js";

const mobilenotifikasiRouter = express.Router();

// Route untuk mengambil data notifikasi, kategori, dan mentor
mobilenotifikasiRouter.get("/", ambilNotifikasiKategoriMentor);

export default mobilenotifikasiRouter;
