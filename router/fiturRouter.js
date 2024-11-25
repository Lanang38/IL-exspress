import express from "express";
import { tambahFitur, hapusFitur, getFitur } from "../controllers/fitur.js";

const fiturRoutes = express.Router();

// Route untuk menambah fitur
fiturRoutes.post("/", tambahFitur);
fiturRoutes.get("/", getFitur);

// Route untuk menghapus fitur berdasarkan ID
fiturRoutes.delete("/:fitur_id", hapusFitur);

export default fiturRoutes;
