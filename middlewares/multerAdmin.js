import multer from "multer";
import path from "path";

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Pastikan folder 'uploads/admin/images' sudah ada atau buat terlebih dahulu
    cb(null, "uploads/admin/images");
  },
  filename: (req, file, cb) => {
    const uniqueNumber = Math.floor(Math.random() * 100000);
    const timestamp = Date.now();
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uniqueNumber}-${timestamp}${fileExtension}`;
    cb(null, fileName);
  },
});

// Filter file untuk hanya menerima gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

// Inisialisasi Multer
const adminImages = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal file 5MB
  fileFilter: fileFilter,
});

export { adminImages };
