import express from "express";
import multer from "multer";  // Impor multer
import {
  createModul,
  getAllModuls,
  getModulSimple,
  editModul,
  deleteModul,
} from "../controllers/module.js";

// Define handleMulterError inside the same file
function handleMulterError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else {
    next(err); // Pass to the next error handler if it's not a MulterError
  }
}

import { materiImages } from "../middlewares/multerMateriImages.js";
import { materiVideos } from "../middlewares/multerMateriVideos.js";
import { MateriPDF } from "../middlewares/multerMateriPdf.js";

const modulRouters = express.Router();

// Tambah data modul dengan gambar, video, atau PDF
modulRouters.post(
  "/moduls",
  materiImages.single("gambar"),  // Use 'gambar' field for images
  materiVideos.single("video"),   // Use 'video' field for videos
  MateriPDF.single("file"),        // Use 'pdf' field for PDFs
  handleMulterError,              // Handle any Multer-specific errors
  createModul                     // The controller to create the module
);

// Menampilkan semua data modul
modulRouters.get("/moduls", getAllModuls);

// Menampilkan data modul (hanya nama dan tanggal dibuat)
modulRouters.get("/moduls/simple", getModulSimple);

// Edit data modul dengan gambar, video, atau PDF berdasarkan modul_id
modulRouters.put(
  "/moduls/:modul_id",
  materiImages.single("gambar"),  // Middleware untuk gambar
  materiVideos.single("video"),  // Middleware untuk video
  MateriPDF.single("file"),       // Middleware untuk PDF
  editModul
);

// Hapus data modul berdasarkan modul_id
modulRouters.delete("/modul/:modul_id", deleteModul);

export default modulRouters;
