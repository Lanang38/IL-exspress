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


// Fungsi untuk menangani error khusus dari multer
function handleMulterError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  next(err); // Lanjutkan ke handler error berikutnya jika bukan MulterError
}

const modulRouters = express.Router();

//saddddddddddddd
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/materi/pdf");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Tambah data modul dengan gambar, video, atau PDF
modulRouters.post(
  "/moduls",
  (req, res, next) => {
    const upload = multer({storage, fileFilter}).fields([
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
