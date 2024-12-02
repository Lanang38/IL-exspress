import express from "express";
import { getMobileKategori } from "../controllers/mobilekategori.js";

const mobilemkategoriRouter = express.Router();

// Route untuk mengambil data notifikasi, kategori, dan mentor
mobilemkategoriRouter.get("/", getMobileKategori);

export default mobilemkategoriRouter;