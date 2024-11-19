import express from "express";
import { tambahCatatan, hapusCatatan } from "../controllers/catatan.js";

const catatanRoutes = express.Router();

// Route untuk menambah catatan
catatanRoutes.post("/catatan", tambahCatatan);

// Route untuk menghapus catatan berdasarkan ID
catatanRoutes.delete("/catatan/:id_catatan", hapusCatatan);

export default catatanRoutes;
