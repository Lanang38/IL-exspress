import multer from "multer";

// Middleware untuk PDF
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/materi/pdf");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const pdfFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Middleware untuk Video
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/materi/videos");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const videoFilter = (req, file, cb) => {
  const allowedTypes = ["video/mp4", "video/mkv", "video/avi"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};

// Middleware untuk Gambar
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/materi/images");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const imageFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Export Middleware
export const MateriPDF = multer({ storage: pdfStorage, fileFilter: pdfFilter });
export const MateriVideos = multer({ storage: videoStorage, fileFilter: videoFilter });
export const MateriImages = multer({ storage: imageStorage, fileFilter: imageFilter });

