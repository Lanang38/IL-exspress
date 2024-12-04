import multer from "multer";
import path from "path";

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/mentor/images");
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getMilliseconds();
    const fileName = `${timestamp}-${file.originalname}`;
    console.log(file);
    cb(null, fileName);
  },
});

// Filter hanya untuk file gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file gambar yang diperbolehkan!"), false);
  }
};

// Inisialisasi Multer
const mentorImages = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum ukuran file 5MB
  fileFilter: fileFilter,
});

export { mentorImages };
