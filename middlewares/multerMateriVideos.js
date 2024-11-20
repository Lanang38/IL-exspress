import multer from "multer";
import path from "path";

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/materi/videos"); // Folder tempat menyimpan file
  },
  filename: (req, file, cb) => {
    const uniqueNumber = Math.floor(Math.random() * 100000); // Nomor unik
    const timestamp = Date.now(); // Timestamp
    const fileExtension = path.extname(file.originalname); // Ekstensi file
    const fileName = `${uniqueNumber}-${timestamp}${fileExtension}`; // Format nama file
    cb(null, fileName); // Simpan file dengan nama ini
  },
});

// Filter file untuk hanya menerima video
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["video/mp4", "video/mkv", "video/avi", "video/mov"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};

// Inisialisasi Multer
const materiVideos = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Batas ukuran file 50 MB
  fileFilter: fileFilter,
});

export { materiVideos };
