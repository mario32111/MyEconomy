const nodemailer = require('nodemailer');

// Crear transporter según el ambiente
const createTransporter = () => {
  // Verificar si tenemos las variables de entorno necesarias
  if (process.env.NODE_ENV === 'development') {
    if (!process.env.MAILTRAP_USER || !process.env.MAILTRAP_PASS) {
      console.warn('⚠️ No se han configurado credenciales de Mailtrap. El envío de correos no funcionará.');
      return null;
    }
    
    // Usar Mailtrap para desarrollo
    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    });
  } else {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('⚠️ No se han configurado credenciales de email. El envío de correos no funcionará.');
      return null;
    }
    
    // Usar servicio real para producción
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
};

const transporter = createTransporter();

exports.sendVerificationEmail = async (user, verificationUrl) => {
  // Si no hay transporter, no intentamos enviar el correo
  if (!transporter) {
    console.warn('⚠️ No se pudo enviar el correo porque no hay transporter configurado');
    throw new Error('Servicio de correo no configurado');
  }

  try {
    await transporter.sendMail({
      from: `"MyEconomy" <${process.env.EMAIL_FROM || 'noreply@myeconomy.com'}>`,
      to: user.email,
      subject: "Verifica tu cuenta de MyEconomy",
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2c3e50; text-align: center;">Bienvenido a MyEconomy</h1>
        <p>Hola ${user.name},</p>
        <p>Gracias por registrarte. Por favor verifica tu cuenta haciendo clic en el siguiente botón:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
            style="background-color: #3498db; color: white; padding: 12px 30px; 
            text-decoration: none; border-radius: 5px; font-weight: bold;">
            Verificar mi cuenta
          </a>
        </div>
        <p style="color: #7f8c8d; font-size: 0.9em;">
          Este enlace expirará en 24 horas. Si no solicitaste esta verificación, 
          puedes ignorar este correo.
        </p>
      </div>
      `
    });
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw new Error('Error al enviar email de verificación');
  }
};