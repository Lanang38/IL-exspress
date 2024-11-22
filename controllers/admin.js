import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { query } from '../Database/db.js';
import crypto from 'crypto'; // Import crypto untuk SHA-256

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Gunakan .env untuk keamanan

// Fungsi untuk mengenkripsi password dengan SHA-256
const encryptPasswordWithSHA256 = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Login Admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ambil data admin berdasarkan email
    const result = await query('SELECT * FROM admin WHERE email_admin = ?', [email]);

    if (result.length === 0) {
      return res.status(401).json({ msg: 'Login failed, invalid email or password' });
    }

    const admin = result[0];

    // Enkripsi password yang dimasukkan oleh pengguna menggunakan SHA-256
    const encryptedPassword = encryptPasswordWithSHA256(password);

    // Verifikasi password dengan password yang tersimpan di database (yang juga sudah dienkripsi dengan SHA-256)
    if (encryptedPassword !== admin.password) {
      return res.status(401).json({ msg: 'Login failed, invalid email or password' });
    }

    // Generate JWT token setelah login berhasil
    const token = jwt.sign(
      { id: admin.id, email: admin.email_admin }, 
      SECRET_KEY, 
      { expiresIn: '1d' } // Token akan berlaku selama 1 hari
    );

    // Kirimkan token dan pesan sukses
    res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ msg: 'Login failed' });
  }
};

// Ambil Admin Berdasarkan Email
export const ambilAdminByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const result = await query('SELECT * FROM admin WHERE email_admin = ?', [email]);

    if (result.length === 0) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    res.status(200).json({ msg: 'Admin data fetched successfully', data: result[0] });
  } catch (error) {
    console.error('Failed to fetch admin data', error);
    res.status(500).json({ msg: 'Failed to fetch admin data' });
  }
};

// Ambil Semua Admin
export const ambilSemuaAdmin = async (req, res) => {
  try {
    const result = await query('SELECT foto_pr, nama_panggilan_admin, email_admin, telepon_admin FROM admin');
    res.status(200).json({ msg: 'Admin data fetched successfully', data: result });
  } catch (error) {
    console.error('Failed to fetch all admin data', error);
    res.status(500).json({ msg: 'Failed to fetch all admin data' });
  }
};

// Tambah Foto Admin
export const tambahFotoAdmin = async (req, res) => {
  const { email } = req.params;
  const { foto } = req.body;

  try {
    const result = await query('UPDATE admin SET foto_pr = ? WHERE email_admin = ?', [foto, email]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    res.status(200).json({ msg: 'Photo added successfully' });
  } catch (error) {
    console.error('Failed to add photo', error);
    res.status(500).json({ msg: 'Failed to add photo' });
  }
};

// Update Foto Admin
export const updateFotoAdmin = async (req, res) => {
  const { email } = req.params;
  const { foto } = req.body;

  try {
    const result = await query('UPDATE admin SET foto_pr = ? WHERE email_admin = ?', [foto, email]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    res.status(200).json({ msg: 'Photo updated successfully' });
  } catch (error) {
    console.error('Failed to update photo', error);
    res.status(500).json({ msg: 'Failed to update photo' });
  }
};

// Hapus Foto Admin
export const hapusFotoAdmin = async (req, res) => {
  const { email } = req.params;

  try {
    const result = await query('UPDATE admin SET foto_pr = NULL WHERE email_admin = ?', [email]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    res.status(200).json({ msg: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Failed to delete photo', error);
    res.status(500).json({ msg: 'Failed to delete photo' });
  }
};

// Update Data Admin
export const updateAdmin = async (req, res) => {
  const { email } = req.params;
  const { nama_admin, nama_panggilan_admin, tanggal_lahir, tempat_lahir, telepon_admin, alamat } = req.body;

  try {
    const result = await query(
      'UPDATE admin SET nama_admin = ?, nama_panggilan_admin = ?, tanggal_lahir = ?, tempat_lahir = ?, telepon_admin = ?, alamat = ? WHERE email_admin = ?',
      [nama_admin, nama_panggilan_admin, tanggal_lahir, tempat_lahir, telepon_admin, alamat, email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    res.status(200).json({ msg: 'Admin data updated successfully' });
  } catch (error) {
    console.error('Failed to update admin data', error);
    res.status(500).json({ msg: 'Failed to update admin data' });
  }
};
