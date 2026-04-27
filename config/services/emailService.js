import nodemailer from "nodemailer";

const getEmailMode = () => {
  return String(process.env.EMAIL_MODE || "console").toLowerCase();
};

const isEmailConfigured = () => {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.EMAIL_FROM
  );
};

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || "true") === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendVerificationEmail = async ({ to, code }) => {
  const mode = getEmailMode();

  if (mode !== "smtp") {
    console.log(`[EMAIL][CONSOLE MODE] Verification code for ${to}: ${code}`);
    return;
  }

  if (!isEmailConfigured()) {
    console.log(`[EMAIL][FALLBACK] Verification code for ${to}: ${code}`);
    return;
  }

  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Código de verificación",
    text: `Tu código de verificación es: ${code}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Código de verificación</h2>
        <p>Usá este código para verificar tu email:</p>
        <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">
          ${code}
        </div>
        <p>Este código vence en 15 minutos.</p>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async ({ to, code }) => {
  const mode = getEmailMode();

  if (mode !== "smtp") {
    console.log(`[EMAIL][CONSOLE MODE] Password reset code for ${to}: ${code}`);
    return;
  }

  if (!isEmailConfigured()) {
    console.log(`[EMAIL][FALLBACK] Password reset code for ${to}: ${code}`);
    return;
  }

  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Código para restablecer contraseña",
    text: `Tu código para restablecer contraseña es: ${code}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Restablecer contraseña</h2>
        <p>Usá este código para cambiar tu contraseña:</p>
        <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">
          ${code}
        </div>
        <p>Este código vence en 15 minutos.</p>
      </div>
    `,
  });
};