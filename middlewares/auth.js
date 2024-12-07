import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware untuk memverifikasi token JWT
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Mengambil token dari header Authorization

  if (!token) {
    return res.status(403).json({ msg: 'Token tidak ditemukan, akses ditolak' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verifikasi token
    req.user = decoded; // Simpan data user di request
    next(); // Lanjutkan ke handler berikutnya
  } catch (error) {
    return res.status(401).json({ msg: 'Token tidak valid' });
  }
};
