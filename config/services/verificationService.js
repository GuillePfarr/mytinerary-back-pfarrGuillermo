import bcrypt from "bcryptjs";

export const isEmailVerificationEnabled = () => {
  return String(process.env.EMAIL_VERIFICATION_ENABLED || "false") === "true";
};

export const generateVerificationCode = () => {
  return String(Math.floor(100000 + Math.random() * 900000));
};

export const hashVerificationCode = async (code) => {
  return bcrypt.hash(code, 10);
};

export const compareVerificationCode = async (code, hash) => {
  return bcrypt.compare(code, hash);
};

export const getVerificationExpirationDate = () => {
  return new Date(Date.now() + 15 * 60 * 1000);
};

export const getPasswordResetExpirationDate = () => {
  return new Date(Date.now() + 15 * 60 * 1000);
};