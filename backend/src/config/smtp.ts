import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const emailConfig = {
  from: process.env.SMTP_FROM || 'noreply@janiamesquita.com.br',
  notificationEmail: process.env.NOTIFICATION_EMAIL || 'janiamesquita@outlook.com',
};

// Verificar conexão SMTP
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Erro na configuração SMTP:', error);
  } else {
    console.log('✅ SMTP configurado e pronto para enviar emails');
  }
});

export default transporter;
