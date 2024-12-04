import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../Database/db.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY; // Pastikan SECRET_KEY ada di file .env
const SALT_ROUNDS = 10;

// **Register User**
export const registerUsers = async (req, res) => {
  const { nama_user, email_user, password, telpon_user } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const result = await query('SELECT * FROM pengguna WHERE email_user = ?', [email_user]);

    if (result.length > 0) {
      return res.status(400).json({ msg: 'Email already registered' });
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log("Hashed Password:", hashedPassword);

    // Simpan data user baru ke dalam database
    await query(
      `INSERT INTO pengguna (nama_user, email_user, password, telpon_user) VALUES (?, ?, ?, ?)`,
      [nama_user, email_user, hashedPassword, telpon_user]
    );

    // Generate JWT Token
    const payload = { email: email_user };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    console.log("Generated Token:", token);

    res.status(201).json({
      msg: 'User registered successfully',
      token: token, // Return JWT token for authentication
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
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(404).json({ msg: 'Invalid email or password' });
    }

    // Buat token JWT
    const token = jwt.sign(
      {
        email: user.email_user,
        id: user.id, // Asumsi kolom `id` ada dalam tabel
      },
      SECRET_KEY,
      { expiresIn: '1d' }
    );
    console.log("Generated Token:", token);

    res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
