import express from "express";
import { tambahCatatan, hapusCatatan, getCatatan } from "../controllers/catatan.js";

const catatanRoutes = express.Router();

// Route untuk menambah catatan
catatanRoutes.post("/", tambahCatatan);
catatanRoutes.get("/", getCatatan);

// Route untuk menghapus catatan berdasarkan ID
catatanRoutes.delete("/:catatan_id", hapusCatatan);

export default catatanRoutes;
