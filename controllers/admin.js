import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../Database/db.js';

const SECRET_KEY = process.env.SECRET_KEY; // Pastikan SECRET_KEY ada di .env
const SALT_ROUNDS = 10;

// **Register Admin**
export const registerAdmin = async (req, res) => {
  const { email_admin, password, nama_admin, telepon_admin, nama_panggilan_admin, tanggal_lahir, tempat_lahir, alamat } = req.body;
  const foto_pr = req.file ? req.file.filename : null;

  try {
    // Cek apakah email sudah terdaftar
    const result = await query('SELECT * FROM admin WHERE email_admin = ?', [email_admin]);

    if (result.length > 0) {
      return res.status(400).json({ msg: 'Email already registered' });
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Simpan data admin baru ke dalam database
    await query(
      `INSERT INTO admin 
      (nama_admin, email_admin, password, telepon_admin, nama_panggilan_admin, tanggal_lahir, tempat_lahir, alamat, foto_pr) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nama_admin,
        email_admin,
        hashedPassword,
        telepon_admin,
        nama_panggilan_admin,
        tanggal_lahir,
        tempat_lahir,
        alamat,
        foto_pr,
      ]
    );

    // Generate JWT Token
    const payload = { email: email_admin, password_hash: hashedPassword };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({
      msg: 'Admin registered and added successfully',
      token: token, // Return JWT token for authentication
    });

  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// **Login Admin**
export const loginAdmin = async (req, res) => {
  const { email_admin, password } = req.body;

  try {
    const result = await query('SELECT * FROM admin WHERE email_admin = ?', [email_admin]);

    if (result.length === 0) {
      return res.status(404).json({ msg: 'Invalid email or password' });
    }

    const admin = result[0];
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(404).json({ msg: 'Invalid email or password' });
    }

    // Buat token dengan hash password
    const token = jwt.sign(
      {
        email: admin.email_admin,
        id: admin.id,
        password_hash: admin.password, // Sertakan hash password
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// **Update Data Admin**
export const updateAdmin = async (req, res) => {
  const { email } = req.params;
  const { nama_admin, nama_panggilan_admin, tanggal_lahir, tempat_lahir, telepon_admin, alamat } = req.body;
  const foto_pr = req.file ? req.file.filename : null;

  try {
    const result = await query(
      'UPDATE admin SET nama_admin = ?, nama_panggilan_admin = ?, tanggal_lahir = ?, tempat_lahir = ?, telepon_admin = ?, alamat = ?, foto_pr = ? WHERE email_admin = ?',
      [
        nama_admin,
        nama_panggilan_admin,
        tanggal_lahir,
        tempat_lahir,
        telepon_admin,
        alamat,
        foto_pr,
        email,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    res.status(200).json({ msg: 'Admin updated successfully' });
  } catch (error) {
    console.error('Failed to update admin:', error);
    res.status(500).json({ msg: 'Failed to update admin, server error' });
  }
};

// **Update Password**
export const updatePassword = async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Update password di database
    const result = await query('UPDATE admin SET password = ? WHERE email_admin = ?', [
      hashedPassword,
      email,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    // Generate JWT Token baru
    const payload = { email, password_hash: hashedPassword };
    const newToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
      msg: 'Password updated successfully',
      token: newToken, // Return new JWT token
    });
  } catch (error) {
    console.error('Failed to update password:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// **Hapus Admin**
export const hapusAdmin = async (req, res) => {
  const { email } = req.params;

  try {
    const result = await query('DELETE FROM admin WHERE email_admin = ?', [email]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    res.status(200).json({ msg: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Failed to delete admin:', error);
    res.status(500).json({ msg: 'Failed to delete admin, server error' });
  }
};

// **Ambil Admin Berdasarkan Email**
export const ambilAdminByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const result = await query('SELECT * FROM admin WHERE email_admin = ?', [email]);

    if (result.length === 0) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    const admin = result[0];
    admin.foto_pr = admin.foto_pr ? `${process.env.BASE_URL}/uploads/${admin.foto_pr}` : null;

    res.status(200).json({ msg: 'Admin retrieved successfully', data: admin });
  } catch (error) {
    console.error('Failed to retrieve admin:', error);
    res.status(500).json({ msg: 'Failed to retrieve admin, server error' });
  }
};

// **Ambil Semua Admin**
export const ambilSemuaAdmin = async (req, res) => {
  try {
    const result = await query(
      'SELECT foto_pr, nama_panggilan_admin, email_admin, telepon_admin FROM admin'
    );

    const dataWithFotoURL = result.map((admin) => ({
      ...admin,
      foto_pr: admin.foto_pr ? `${process.env.BASE_URL}/uploads/${admin.foto_pr}` : null,
    }));

    res.status(200).json({ msg: 'All admins retrieved successfully', data: dataWithFotoURL });
  } catch (error) {
    console.error('Failed to retrieve admins:', error);
    res.status(500).json({ msg: 'Failed to retrieve admins, server error' });
  }
};
