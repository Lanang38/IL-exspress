import passport from 'passport';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt';
import { query } from '../Database/db.js';
import crypto from 'crypto'; // Import crypto untuk SHA-256

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Gunakan .env untuk keamanan

// Fungsi untuk mengenkripsi password dengan SHA-256
const encryptPasswordWithSHA256 = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Ekstraksi JWT dari header Authorization
const ExtractJWT = passportJWT.ExtractJwt;
const strategyJWT = passportJWT.Strategy;

// Konfigurasi Passport untuk JWT
passport.use(
  'internal-rule',
  new strategyJWT(
    {
      secretOrKey: SECRET_KEY, // Gunakan secret key dari .env atau variabel lingkungan
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      passReqToCallback: false,
    },
    (payload, done) => {
      const { email, password } = payload; // Menambahkan password dari payload

      if (!email) {
        return done(null, false);
      }

      query('SELECT * FROM admin WHERE email_admin = ?', [email], (err, result) => {
        if (err) return done(err, false);

        if (result.length === 0) {
          return done(null, false); // Jika admin tidak ditemukan
        }

        // Verifikasi password menggunakan SHA-256
        const admin = result[0];
        const encryptedPassword = encryptPasswordWithSHA256(password); // Enkripsi password dari payload

        if (encryptedPassword !== admin.password) {
          return done(null, false); // Jika password tidak cocok
        }

        return done(null, { id: admin.id, email: admin.email_admin }); // Admin valid
      });
    }
  )
);

export default passport;
