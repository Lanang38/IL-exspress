import express from "express";
import multer from "multer";
import {
  createModul,
  getAllModuls,
  getModulSimple,
  editModul,
  deleteModul,
} from "../controllers/module.js";

// Fungsi untuk menangani error khusus dari multer
function handleMulterError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
}

const modulRouters = express.Router();

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "gambar") {
      cb(null, "uploads/materi/images");
    } else if (file.fieldname === "video") {
      cb(null, "uploads/materi/videos");
    } else if (file.fieldname === "file") {
      cb(null, "uploads/materi/pdf");
    } else {
      cb(new Error("Invalid file type!"), false);
    }
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// Filter tipe file
const fileFilter = (req, file, cb) => {
  const imageTypes = ["image/jpeg", "image/png", "image/gif"];
  const videoTypes = ["video/mp4", "video/mkv", "video/avi"];
  const pdfType = ["application/pdf"];

  if (file.fieldname === "gambar" && imageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.fieldname === "video" && videoTypes.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.fieldname === "file" && pdfType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for field: ${file.fieldname}`), false);
  }
};

// Middleware multer
const upload = multer({
  storage,
  fileFilter,
}).fields([
  { name: "gambar", maxCount: 1 },
  { name: "video", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);

// Tambah data modul
modulRouters.post("/moduls", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return handleMulterError(err, req, res, next);
    }
    next();
  });
}, createModul);

// Menampilkan semua data modul
modulRouters.get("/moduls", getAllModuls);

// Menampilkan data modul (hanya nama dan tanggal dibuat)
modulRouters.get("/moduls/simple", getModulSimple);

// Edit data modul
modulRouters.put("/moduls/:modul_id", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return handleMulterError(err, req, res, next);
    }
    next();
  });
}, editModul);

// Hapus data modul
modulRouters.delete("/moduls/:modul_id", deleteModul);

export default modulRouters;
