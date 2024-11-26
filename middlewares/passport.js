import passport from 'passport';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt';
import { query } from '../Database/db.js';

const SECRET_KEY = process.env.SECRET_KEY; // Ambil dari .env
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
      try {
        const result = await query('SELECT * FROM admin WHERE email_admin = ?', [payload.email]);

        if (result.length > 0) {
          return done(null, result[0]);
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
