import express from "express";
import multer from "multer";
import { upload } from "../middlewares/multerConfig.js";
import {
  createModul,
  getAllModuls,
  getModulSimple,
  editModul,
  deleteModul,
} from "../controllers/moduleController.js";

const router = express.Router();

// Handler error khusus multer
function handleMulterError(err, req, res, next) {
  if (err instanceof multer.MulterError || err.message) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next(err);
}

// Tambah modul dengan file upload
router.post(
  "/moduls",
  upload.fields([
    { name: "gambar", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  handleMulterError,
  createModul
);

// Ambil semua modul
router.get("/moduls", getAllModuls);

// Ambil modul sederhana
router.get("/moduls/simple", getModulSimple);

// Edit modul dengan file upload
router.put(
  "/moduls/:modul_id",
  upload.fields([
    { name: "gambar", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  handleMulterError,
  editModul
);

// Hapus modul
router.delete("/moduls/:modul_id", deleteModul);

export default router;
