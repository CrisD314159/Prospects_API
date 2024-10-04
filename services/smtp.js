import nodemailer from 'nodemailer'
import fs from 'fs'
import dotenv from 'dotenv';

dotenv.config();

export async function sendEmailWithAttachment(email) {
  // Configura el transportador SMTP
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Carga el HTML desde el archivo
  const htmlContent = fs.readFileSync('mail.html', 'utf8');

  // Lee el archivo que deseas enviar
  const filePath = 'reports/prospects-report.pdf'; // Cambia esto por la ruta de tu archivo
  const fileName = 'prospects-report.pdf'; // Nombre que tendrá el archivo adjunto

  // Configura el correo
  let mailOptions = {
    from: '"Camu" <notifications@camu.com>', // Remitente
    to: email, // Destinatario
    subject: 'Archivo Generado', // Asunto
    html: htmlContent, // Cuerpo del correo en HTML
    attachments: [
      {
        filename: fileName,
        path: filePath,
      },
    ],
  };

  // Envía el correo
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Mensaje enviado: %s', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo: ', error);
  }
}
