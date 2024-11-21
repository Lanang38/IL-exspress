import express from "express";
import { tambahFitur, hapusFitur } from "../controllers/fitur.js";

const fiturRoutes = express.Router();

// Route untuk menambah fitur
fiturRoutes.post("/fitur", tambahFitur);

// Route untuk menghapus fitur berdasarkan ID
fiturRoutes.delete("/fitur/:fitur_id", hapusFitur);

export default fiturRoutes;
