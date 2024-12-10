import { query } from '../Database/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import crypto from 'crypto';



dotenv.config();

// Simpan kode OTP di memori (atau gunakan database jika diperlukan)
const otpStore = new Map(); // { email_user: { otp, expiresAt } }

// Load environment variables from .env file
const SECRET_KEY = process.env.SECRET_KEY; // Pastikan SECRET_KEY ada di file .env
const SALT_ROUNDS = 10;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/api/v1/mobilepengguna/auth/google/callback' // Callback URL
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

// **Endpoint untuk Google Login (Redirect ke URL login Google)**
export const googleAuth = (req, res) => {
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
  });
  res.redirect(authorizationUrl);
};

// **Callback setelah login Google berhasil**
export const googleAuthCallback = async (req, res) => {
  const { code } = req.query;

  try {
    // Ambil token dari Google
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Ambil data user dari Google
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });
    const { data } = await oauth2.userinfo.get();

    if (!data.email || !data.name) {
      return res.status(400).json({ msg: 'Failed to retrieve user info from Google' });
    }

    // Cek apakah user sudah terdaftar di database
    let result = await query('SELECT * FROM pengguna WHERE email_user = ?', [data.email]);

    if (result.length === 0) {
      // Jika belum terdaftar, buat user baru
      await query(
        `INSERT INTO pengguna (nama_user, email_user, telpon_user, tgl_pendaftaran, foto_profile) VALUES (?, ?, NULL, now(), ?)`,
        [data.name, data.email, data.picture]
      );

      result = await query('SELECT * FROM pengguna WHERE email_user = ?', [data.email]);
    }

    const user = result[0];

    // Generate token JWT
    const payload = { email: user.email_user }; // Menggunakan email sebagai payload
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });

    // Response dengan token JWT
    res.status(200).json({
      msg: 'Google Login successful',
      user: {
        email_user: user.email_user,
        nama_user: user.nama_user,
        foto_profile: user.foto_profile,
      },
      token,
    });
  } catch (error) {
    console.error('Google Login failed:', error);
    res.status(500).json({ msg: 'Server error during Google login' });
  }
};

// **Register User**
export const registerUsers = async (req, res) => {
  const { nama_user, email_user, password, telpon_user, tgl_pendaftaran } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const result = await query('SELECT * FROM pengguna WHERE email_user = ?', [email_user]);

    if (result.length > 0) {
      return res.status(400).json({ msg: 'Email already registered' });
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Simpan data user baru ke dalam database
    await query(
      `INSERT INTO pengguna (nama_user, email_user, password, telpon_user, tgl_pendaftaran) VALUES (?, ?, ?, ?, now())`,
      [nama_user, email_user, hashedPassword, telpon_user, tgl_pendaftaran]
    );

    // Generate JWT Token
    const payload = { email: email_user }; // Menggunakan email sebagai payload
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({
      msg: 'User registered successfully',
      token, // Return JWT token for authentication
    });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// **Login User**
export const loginUsers = async (req, res) => {
  const { email_user, password } = req.body;

  try {
    // Cek apakah email terdaftar
    const result = await query('SELECT * FROM pengguna WHERE email_user = ?', [email_user]);

    if (result.length === 0) {
      return res.status(404).json({ msg: 'Invalid email or password' });
    }

    const user = result[0];

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json({ msg: 'Invalid email or password' });
    }

    // Buat token JWT
    const token = jwt.sign(
      { email: user.email_user }, // Menggunakan email sebagai payload
      SECRET_KEY,
      { expiresIn: '1d' }
    );

    res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update data pengguna
export const updatePengguna = async (req, res) => {
  const { email_user, nama_user, telpon_user } = req.body;
  const foto_profile = req.file ? req.file.filename : null; // Ambil nama file yang diunggah

  try {
    // Validasi apakah pengguna dengan email_user yang diberikan ada
    const result = await query('SELECT * FROM pengguna WHERE email_user = ?', [email_user]);

    if (result.length === 0) {
      return res.status(404).json({ msg: 'Pengguna tidak ditemukan' });
    }

    // Ambil foto_profile yang sudah ada jika tidak ada file baru
    const existingFotoProfile = result[0].foto_profile;

    // Update nama_user, telpon_user, dan foto_profile berdasarkan email_user
    await query(
      `UPDATE pengguna SET nama_user = ?, telpon_user = ?, foto_profile = ? WHERE email_user = ?`,
      [nama_user, telpon_user, foto_profile || existingFotoProfile, email_user]
    );

    res.status(200).json({ msg: 'Data pengguna berhasil diupdate' });
  } catch (error) {
    console.error('Gagal mengupdate data pengguna:', error.message);
    res.status(500).json({ msg: 'Gagal mengupdate data pengguna' });
  }
};

// Menampilkan data pengguna berdasarkan akun yang login
export const ambilSemuaPengguna = async (req, res) => {
  const baseUrl = "http://localhost:3000/uploads/pengguna/images/"; // URL untuk file gambar

  // Ambil token dari header Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Token tidak diberikan atau tidak valid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded.email) {
      return res.status(401).json({ msg: 'Token tidak valid' });
    }

    // Ambil email dari payload token
    const email_user = decoded.email;

    // Ambil data pengguna berdasarkan email
    const result = await query(
      'SELECT nama_user, email_user, telpon_user, foto_profile FROM pengguna WHERE email_user = ?',
      [email_user]
    );

    if (result.length === 0) {
      return res.status(404).json({ msg: 'Data pengguna tidak ditemukan' });
    }

    // Tambahkan path lengkap untuk gambar
    const pengguna = result[0];
    pengguna.foto_profile = baseUrl + pengguna.foto_profile;

    res.status(200).json({ msg: 'Data pengguna berhasil diambil', data: pengguna });
  } catch (error) {
    console.error('Gagal mengambil data pengguna:', error.message);
    res.status(500).json({ msg: 'Gagal mengambil data pengguna' });
  }
};

export const updatePassword = async (req, res) => {
  const { email_user, oldPassword, newPassword, confirmPassword } = req.body;

  try {
    // Validasi apakah email pengguna ada di database
    const result = await query('SELECT * FROM pengguna WHERE email_user = ?', [email_user]);

    if (result.length === 0) {
      return res.status(404).json({ msg: 'Pengguna tidak ditemukan' });
    }

    const user = result[0];

    // Verifikasi apakah password lama cocok
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: 'Password lama salah' });
    }

    // Validasi apakah password baru dan konfirmasi password cocok
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ msg: 'Password baru dan konfirmasi password tidak cocok' });
    }

    // Hash password baru sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // Update password di database
    await query('UPDATE pengguna SET password = ? WHERE email_user = ?', [hashedPassword, email_user]);

    res.status(200).json({ msg: 'Password berhasil diupdate' });
  } catch (error) {
    console.error('Gagal mengupdate password:', error.message);
    res.status(500).json({ msg: 'Gagal mengupdate password' });
  }
};


// **Lupa Password - Kirim OTP ke Email**
export const lupaPassword = async (req, res) => {
  const { email_user } = req.body;

  try {
    // Validasi apakah email pengguna ada di database
    const result = await query('SELECT * FROM pengguna WHERE email_user = ?', [email_user]);

    if (result.length === 0) {
      return res.status(404).json({ msg: 'Email tidak ditemukan' });
    }

    // Generate kode OTP (4 digit)
    const otp = crypto.randomInt(1000, 9999);

    // Simpan OTP ke memori dengan waktu kedaluwarsa 15 menit
    const expiresAt = Date.now() + 60 * 60 * 1000; // 15 menit
    otpStore.set(email_user, { otp, expiresAt });

    // Konfigurasi transport email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Sesuaikan dengan penyedia email Anda
      auth: {
        user: process.env.EMAIL_SENDER, // Email pengirim
        pass: process.env.EMAIL_PASSWORD, // Password atau App Password
      },
    });

    // Kirim email dengan OTP
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: email_user,
      subject: 'Kode OTP Reset Password',
      text: `Kode OTP Anda untuk reset password adalah ${otp}. Kode ini berlaku selama 30 menit.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: 'Kode OTP telah dikirim ke email Anda' });
  } catch (error) {
    console.error('Gagal mengirim OTP:', error.message);
    res.status(500).json({ msg: 'Gagal mengirim OTP' });
  }
};

// **Reset Password dengan OTP**
export const resetPasswordWithOTP = async (req, res) => {
  const { email_user, otp, newPassword, confirmPassword } = req.body;

  try {
    // Validasi apakah email pengguna ada di database
    const result = await query('SELECT * FROM pengguna WHERE email_user = ?', [email_user]);

    if (result.length === 0) {
      return res.status(404).json({ msg: 'Email tidak ditemukan' });
    }

    // Ambil OTP yang tersimpan
    const storedOtp = otpStore.get(email_user);

    if (!storedOtp) {
      return res.status(400).json({ msg: 'OTP tidak valid atau sudah kedaluwarsa' });
    }

    // Validasi OTP dan waktu kedaluwarsa
    if (storedOtp.otp !== parseInt(otp) || Date.now() > storedOtp.expiresAt) {
      return res.status(400).json({ msg: 'OTP tidak valid atau sudah kedaluwarsa' });
    }

    // Validasi password baru dan konfirmasi password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ msg: 'Password baru dan konfirmasi password tidak cocok' });
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // Update password di database
    await query('UPDATE pengguna SET password = ? WHERE email_user = ?', [hashedPassword, email_user]);

    // Hapus OTP setelah berhasil reset
    otpStore.delete(email_user);

    res.status(200).json({ msg: 'Password berhasil direset' });
  } catch (error) {
    console.error('Gagal reset password:', error.message);
    res.status(500).json({ msg: 'Gagal reset password' });
  }
};

