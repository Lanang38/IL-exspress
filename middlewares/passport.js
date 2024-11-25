import passport from 'passport';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt';
import { query } from '../Database/db.js';

const SECRET_KEY = 'your_secret_key'; // SECRET KEY langsung diberikan
const ExtractJWT = passportJWT.ExtractJwt;
const StrategyJWT = passportJWT.Strategy;

// Passport JWT Strategy
passport.use(
  'internal-rule',
  new StrategyJWT(
    {
      secretOrKey: SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      console.log('Incoming Payload:', payload); // Debugging payload
      if (!payload || !payload.email) {
        console.log('Invalid Payload'); // Log jika payload kosong atau tidak ada email
        return done(null, false);
      }

      try {
        const [admin] = await query('SELECT * FROM admin WHERE email_admin = ?', [payload.email]);

        if (!admin) {
          console.log('Admin not found'); // Log jika admin tidak ditemukan
          return done(null, false);
        }

        console.log('Admin authenticated:', admin); // Log admin jika autentikasi berhasil
        return done(null, { id: admin.id, email: admin.email_admin });
      } catch (err) {
        console.error('Database error:', err); // Log error database
        return done(err, false);
      }
    }
  )
);

export default passport;
