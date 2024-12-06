import multer from 'multer';
import path from 'path';

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/pengguna/images'); 
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getMilliseconds();
    const fileName = `${timestamp}-${file.originalname}`;
    console.log(file);
    cb(null, fileName);
  },
});

// Filter file untuk hanya menerima gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

// Inisialisasi Multer
const penggunaimages = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal file 5MB
  fileFilter: fileFilter,
});

export { penggunaimages };
