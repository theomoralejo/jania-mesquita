import dotenv from 'dotenv';

dotenv.config();

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
  expiresIn: '7d', // Token expira em 7 dias
};

export default jwtConfig;
