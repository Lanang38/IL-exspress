import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { query } from '../Database/db.js';

const SECRET_KEY = 'your_secret_key'; // SECRET KEY langsung diberikan
const SALT_ROUNDS = 10;

// Login Admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await query('SELECT * FROM admin WHERE email_admin = ?', [email]);

    if (result.length === 0) {
      return res.status(401).json({ msg: 'Login failed, invalid email or password' });
    }

    const admin = result[0];
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ msg: 'Login failed, invalid email or password' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email_admin }, SECRET_KEY, { expiresIn: '1d' });

    res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ msg: 'Login failed, server error' });
  }
};

// Tambah Admin
export const tambahAdmin = async (req, res) => {
  const {
    nama_admin,
    email_admin,
    password,
    telepon_admin,
    nama_panggilan_admin,
    tanggal_lahir,
    tempat_lahir,
    alamat,
  } = req.body;
  const foto_pr = req.file ? req.file.filename : null;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

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

    res.status(201).json({ msg: 'Admin added successfully' });
  } catch (error) {
    console.error('Failed to add admin:', error);
    res.status(500).json({ msg: 'Failed to add admin, server error' });
  }
};

// Update Data Admin
export const updateAdmin = async (req, res) => {
  const { email } = req.params;
  const {
    nama_admin,
    nama_panggilan_admin,
    tanggal_lahir,
    tempat_lahir,
    telepon_admin,
    alamat,
  } = req.body;
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

// Hapus Admin
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

// Ambil Admin Berdasarkan Email
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

// Ambil Semua Admin
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
