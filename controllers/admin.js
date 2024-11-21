import { query } from '../Database/db.js';  // Adjusted path to your database module
import { adminImages } from "../middlewares/multerAdmin.js";

// Login using email and password
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await query('SELECT * FROM admin WHERE email_admin = ? AND password = ?', [email, password]);
    if (result.length === 0) {
      return res.status(401).json({ msg: 'Login failed, invalid email or password' });
    }
    return res.status(200).json({ msg: 'Login successful', data: result[0] });
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ msg: 'Login failed' });
  }
};

// Fetch admin data by email
export const ambilAdminByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await query('SELECT * FROM admin WHERE email_admin = ?', [email]);
    if (result.length === 0) {
      return res.status(404).json({ msg: 'Admin not found' });
    }
    return res.status(200).json({ msg: 'Admin data fetched successfully', data: result[0] });
  } catch (error) {
    console.error('Failed to fetch admin data', error);
    res.status(500).json({ msg: 'Failed to fetch admin data' });
  }
};

// Fetch all admins
export const ambilSemuaAdmin = async (req, res) => {
  try {
    const result = await query('SELECT foto_pr, nama_panggilan_admin, email_admin, telepon_admin FROM admin');
    return res.status(200).json({ msg: 'Admin data fetched successfully', data: result });
  } catch (error) {
    console.error('Failed to fetch all admin data', error);
    res.status(500).json({ msg: 'Failed to fetch all admin data' });
  }
};

// Tambahkan foto admin
export const tambahFotoAdmin = async (req, res) => {
  const { email } = req.params;
  // Mengecek apakah file ada di request
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const fotoPath = `/uploads/admin/images/${req.file.filename}`;

  try {
    // Update database dengan path foto yang baru
    const result = await query('UPDATE admin SET foto_pr = ? WHERE email_admin = ?', [fotoPath, email]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Admin not found' });
    }
    return res.status(200).json({ msg: 'Photo added successfully', fotoPath });
  } catch (error) {
    console.error('Failed to add photo', error);
    res.status(500).json({ msg: 'Failed to add photo' });
  }
};


// Update admin photo
export const updateFotoAdmin = async (req, res) => {
  const { email } = req.params;
  const { foto } = req.body;
  try {
    await query('UPDATE admin SET foto_pr = ? WHERE email_admin = ?', [foto, email]);
    return res.status(200).json({ msg: 'Photo updated success' });
  } catch (error) {
    console.error('Failed to update photo', error);
    res.status(500).json({ msg: 'Failed to update photo' });
  }
};

// Delete admin photo
export const hapusFotoAdmin = async (req, res) => {
  const { email } = req.params;
  try {
    await query('UPDATE admin SET foto_pr = NULL WHERE email_admin = ?', [email]);
    return res.status(200).json({ msg: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Failed to delete photo', error);
    res.status(500).json({ msg: 'Failed to delete photo' });
  }
};

// Update admin data
export const updateAdmin = async (req, res) => {
  const { email } = req.params;
  const { nama_admin, nama_panggilan_admin, tanggal_lahir, tempat_lahir, telepon_admin, alamat } = req.body;
  try {
    await query(
      'UPDATE admin SET nama_admin = ?, nama_panggilan_admin = ?, tanggal_lahir = ?, tempat_lahir = ?, telepon_admin = ?, alamat = ? WHERE email_admin = ?',
      [nama_admin, nama_panggilan_admin, tanggal_lahir, tempat_lahir, telepon_admin, alamat, email]
    );
    return res.status(200).json({ msg: 'Admin data updated successfully' });
  } catch (error) {
    console.error('Failed to update admin data', error);
    res.status(500).json({ msg: 'Failed to update admin data' });
  }
};
