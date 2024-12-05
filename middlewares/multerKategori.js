import multer from "multer";

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "gambar") {
      cb(null, "uploads/kategori/images"); // Direktori untuk gambar
    } else if (file.fieldname === "icon") {
      cb(null, "uploads/kategori/icons"); // Direktori untuk icon
    } else {
      cb(new Error("Invalid file type!"), false); // Field tidak sesuai
    }
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getMilliseconds();
    const fileName = `${timestamp}-${file.originalname}`;
    console.log(file);
    cb(null, fileName); // Simpan file dengan nama ini
  },
});

// Filter untuk memastikan hanya tipe gambar yang diizinkan
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // Tipe file yang diizinkan
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

// Inisialisasi Multer dengan batas file dan filter
export const upload = multer({ 
  storage, 
  fileFilter 
}).fields([
  { name: "gambar", maxCount: 1 }, // Field untuk gambar
  { name: "icon", maxCount: 1 },   // Field untuk icon
]);

// Middleware untuk menangani error dari Multer
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};
