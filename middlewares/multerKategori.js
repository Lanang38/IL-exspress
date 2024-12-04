import multer from "multer";
import path from "path";

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/kategori/images"); // Folder tujuan untuk gambar
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getMilliseconds();
    const fileName = `${timestamp}-${file.originalname}`;
    console.log(file);
    cb(null, fileName); // Simpan file dengan nama ini
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
const kategoriImages = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file 5MB
  fileFilter: fileFilter,
});

export { kategoriImages };
