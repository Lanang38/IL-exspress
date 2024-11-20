import multer from "multer";
import path from "path";

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/materi/pdf"); // Folder tempat menyimpan file PDF
  },
  filename: (req, file, cb) => {
    const uniqueNumber = Math.floor(Math.random() * 100000); // Nomor unik
    const timestamp = Date.now(); // Timestamp
    const fileExtension = path.extname(file.originalname); // Ekstensi file
    const fileName = `${uniqueNumber}-${timestamp}${fileExtension}`; // Format nama file
    cb(null, fileName); // Simpan file dengan nama ini
  },
});

// Filter file untuk hanya menerima PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Inisialisasi Multer
const MateriPDF = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Batas ukuran file 10 MB
  fileFilter: fileFilter,
});

export { MateriPDF };
