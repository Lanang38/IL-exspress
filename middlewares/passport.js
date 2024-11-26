import passport from 'passport';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt';
import { query } from '../Database/db.js';

const SECRET_KEY = process.env.SECRET_KEY; // Ambil dari .env
const ExtractJWT = passportJWT.ExtractJwt;
const StrategyJWT = passportJWT.Strategy;

// **Passport JWT Strategy**
passport.use(
  'internal-rule',
  new StrategyJWT(
    {
      secretOrKey: SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        // Ambil data admin berdasarkan email
        const result = await query('SELECT * FROM admin WHERE email_admin = ?', [payload.email]);

        if (result.length > 0) {
          const admin = result[0];

          // Pastikan hash password dari payload cocok dengan hash password di database
          if (payload.password_hash === admin.password) {
            return done(null, admin);
          } else {
            return done(null, false); // Token tidak valid jika password telah berubah
          }
        } else {
          return done(null, false);
        }
      } catch (error) {
        console.error('Passport Error:', error);
        done(error, false);
      }
    }
  )
);

export default passport;
