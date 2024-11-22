import express from "express";
import {
  createModul,
  getAllModuls,
  getModulSimple,
  editModul,
  deleteModul,
} from "../controllers/module.js";

const modulRouters = express.Router();

// Tambah data modul
modulRouters.post("/moduls", createModul);

// Menampilkan semua data modul
modulRouters.get("/moduls", getAllModuls);

// Menampilkan data modul (hanya nama dan tanggal dibuat)
modulRouters.get("/moduls/simple", getModulSimple);

// Edit data modul berdasarkan modul_id
modulRouters.put("/moduls/:modul_id", editModul);

// Hapus data modul berdasarkan modul_id
modulRouters.delete("/moduls/:modul_id", deleteModul);

export default modulRouters;
