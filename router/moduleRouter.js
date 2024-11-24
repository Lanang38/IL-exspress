import express from "express";
import {
  createModul,
  getAllModuls,
  getModulSimple,
  editModul,
  deleteModul,
} from "../controllers/module.js";
import { upload, handleMulterError } from "../middlewares/multerModul.js";

const router = express.Router();

// Tambah data modul
router.post("/", upload, handleMulterError, createModul);

// Menampilkan semua data modul
router.get("/", getAllModuls);

// Menampilkan data modul (hanya nama dan tanggal dibuat)
router.get("/nama", getModulSimple);

// Edit data modul
router.put("/:modul_id", upload, handleMulterError, editModul);

// Hapus data modul
router.delete("/:modul_id", deleteModul);

export default router;
