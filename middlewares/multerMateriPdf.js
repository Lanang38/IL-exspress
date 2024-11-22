import multer from "multer";
import path from "path";

// Configure storage
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
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Multer configuration
const MateriPDF = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max size
  fileFilter: fileFilter
});

export { MateriPDF };
