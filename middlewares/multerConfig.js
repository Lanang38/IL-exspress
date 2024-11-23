import multer from "multer";
import path from "path";

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = {
      gambar: "uploads/materi/images",
      video: "uploads/materi/videos",
      file: "uploads/materi/pdf",
    }[file.fieldname];
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// Filter jenis file
const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    gambar: ["image/jpeg", "image/png", "image/gif"],
    video: ["video/mp4", "video/mkv", "video/avi"],
    file: ["application/pdf"],
  }[file.fieldname];

  if (allowedTypes?.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for ${file.fieldname}.`), false);
  }
};

// Konfigurasi multer
export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Maksimal 50MB
  fileFilter,
});
