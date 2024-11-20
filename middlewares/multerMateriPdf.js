import multer from "multer";
import path from "path";

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/materi/pdf");
  },
  filename: (req, file, cb) => {
    const uniqueNumber = Math.floor(Math.random() * 100000);
    const timestamp = Date.now();
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uniqueNumber}-${timestamp}${fileExtension}`;
    cb(null, fileName);
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
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter,
});

export { MateriPDF };
