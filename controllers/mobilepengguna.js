import { query } from '../Database/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import bcrypt from 'bcrypt';

dotenv.config();

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
    const payload = { email: user.email_user, id: user.id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });

    // Response dengan token JWT
    res.status(200).json({
      msg: 'Google Login successful',
      user: {
        id: user.id,
        nama_user: user.nama_user,
        email_user: user.email_user,
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
    const payload = { email: email_user };
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
      { email: user.email_user, id: user.id },
      SECRET_KEY,
      { expiresIn: '1d' }
    );

    res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
