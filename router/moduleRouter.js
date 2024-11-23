import express from "express";
import multer from "multer"; // Impor multer untuk menangani error khusus
import {
  createModul,
  getAllModuls,
  getModulSimple,
  editModul,
  deleteModul,
} from "../controllers/module.js";

// Import middleware untuk gambar, video, dan PDF
import { materiImages } from "../middlewares/multerMateriImages.js";
import { materiVideos } from "../middlewares/multerMateriVideos.js";
import { MateriPDF } from "../middlewares/multerMateriPdf.js";

// Fungsi untuk menangani error khusus dari multer
function handleMulterError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  next(err); // Lanjutkan ke handler error berikutnya jika bukan MulterError
}

const modulRouters = express.Router();

// Tambah data modul dengan gambar, video, atau PDF
modulRouters.post(
  "/moduls",
  (req, res, next) => {
    const upload = multer().fields([
      { name: "gambar", maxCount: 1 },
      { name: "video", maxCount: 1 },
      { name: "file", maxCount: 1 },
    ]);
    upload(req, res, (err) => {
      if (err) {
        return handleMulterError(err, req, res, next);
      }
      next();
    });
  },
  createModul
);

// Menampilkan semua data modul
modulRouters.get("/moduls", getAllModuls);

// Menampilkan data modul (hanya nama dan tanggal dibuat)
modulRouters.get("/moduls/simple", getModulSimple);

// Edit data modul dengan gambar, video, atau PDF berdasarkan modul_id
modulRouters.put(
  "/moduls/:modul_id",
  (req, res, next) => {
    const upload = multer().fields([
      { name: "gambar", maxCount: 1 },
      { name: "video", maxCount: 1 },
      { name: "file", maxCount: 1 },
    ]);
    upload(req, res, (err) => {
      if (err) {
        return handleMulterError(err, req, res, next);
      }
      next();
    });
  },
  editModul
);

// Hapus data modul berdasarkan modul_id
modulRouters.delete("/moduls/:modul_id", deleteModul);

export default modulRouters;
