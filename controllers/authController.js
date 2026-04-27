import User from "../config/Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../config/services/emailService.js";
import {
  compareVerificationCode,
  generateVerificationCode,
  getVerificationExpirationDate,
  hashVerificationCode,
  isEmailVerificationEnabled,
} from "../config/services/verificationService.js";

const buildUserResponse = (user) => ({
  email: user.email,
  image: user.image,
  name: user.name,
  _id: user._id,
  isEmailVerified: user.isEmailVerified,
});

const signToken = (user) => {
  const payload = {
    sub: String(user._id),
    email: user.email,
    name: user.name,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
};

export const signUp = async (req, res) => {
  try {
    let { email, password, name, image, country } = req.body;

    email = String(email || "").trim().toLowerCase();
    password = String(password || "");

    if (!email || !password || !name || !image) {
      return res.status(400).json({
        success: false,
        error: "Datos incompletos",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    const userInDB = await User.findOne({ email });

    if (userInDB) {
      return res.status(409).json({
        success: false,
        error: "El email ya está registrado",
      });
    }

    const verificationEnabled = isEmailVerificationEnabled();
    const passwordHash = await bcrypt.hash(password, 10);

    const userData = {
      email,
      password: passwordHash,
      name,
      image,
      country,
      isEmailVerified: !verificationEnabled,
    };

    if (verificationEnabled) {
      const code = generateVerificationCode();
      userData.emailVerificationCodeHash = await hashVerificationCode(code);
      userData.emailVerificationExpires = getVerificationExpirationDate();

      const newUser = await User.create(userData);

      await sendVerificationEmail({ to: email, code });

      return res.status(201).json({
        success: true,
        requiresEmailVerification: true,
        email: newUser.email,
        message: "Te enviamos un código de verificación a tu email.",
      });
    }

    const newUser = await User.create(userData);
    const token = signToken(newUser);

    return res.status(201).json({
      success: true,
      requiresEmailVerification: false,
      user: buildUserResponse(newUser),
      token,
    });
  } catch (error) {
    console.error("[AUTH] signUp error:", error);

    return res.status(500).json({
      success: false,
      error: "Error interno",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    let { email, code } = req.body;

    email = String(email || "").trim().toLowerCase();
    code = String(code || "").trim();

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        error: "Email y código son requeridos",
      });
    }

    const user = await User.findOne({ email }).select(
      "+emailVerificationCodeHash"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Usuario no encontrado",
      });
    }

    if (user.isEmailVerified) {
      const token = signToken(user);

      return res.status(200).json({
        success: true,
        user: buildUserResponse(user),
        token,
        message: "Email ya verificado",
      });
    }

    if (!user.emailVerificationCodeHash || !user.emailVerificationExpires) {
      return res.status(400).json({
        success: false,
        error: "No hay código de verificación activo",
      });
    }

    if (user.emailVerificationExpires < new Date()) {
      return res.status(400).json({
        success: false,
        error: "El código de verificación expiró",
      });
    }

    const validCode = await compareVerificationCode(
      code,
      user.emailVerificationCodeHash
    );

    if (!validCode) {
      return res.status(401).json({
        success: false,
        error: "Código de verificación inválido",
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationCodeHash = null;
    user.emailVerificationExpires = null;

    await user.save();

    const token = signToken(user);

    return res.status(200).json({
      success: true,
      user: buildUserResponse(user),
      token,
      message: "Email verificado correctamente",
    });
  } catch (error) {
    console.error("[AUTH] verifyEmail error:", error);

    return res.status(500).json({
      success: false,
      error: "Error interno",
    });
  }
};

export const resendVerificationCode = async (req, res) => {
  try {
    let { email } = req.body;

    email = String(email || "").trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email requerido",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Usuario no encontrado",
      });
    }

    if (user.isEmailVerified) {
      return res.status(200).json({
        success: true,
        alreadyVerified: true,
        message: "El email ya está verificado",
      });
    }

    const code = generateVerificationCode();

    user.emailVerificationCodeHash = await hashVerificationCode(code);
    user.emailVerificationExpires = getVerificationExpirationDate();

    await user.save();

    await sendVerificationEmail({ to: email, code });

    return res.status(200).json({
      success: true,
      email,
      message: "Te enviamos un nuevo código de verificación.",
    });
  } catch (error) {
    console.error("[AUTH] resendVerificationCode error:", error);

    return res.status(500).json({
      success: false,
      error: "Error interno",
    });
  }
}; 


export const signIn = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = String(email || "").trim().toLowerCase();
    password = String(password || "");

    const userInDB = await User.findOne({ email }).select("+password");

    if (!userInDB) {
      return res.status(401).json({
        success: false,
        error: "Email o contraseña incorrectos",
      });
    }

    const validPassword = await bcrypt.compare(password, userInDB.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: "Email o contraseña incorrectos",
      });
    }

    if (!userInDB.isEmailVerified) {
      return res.status(403).json({
        success: false,
        requiresEmailVerification: true,
        email: userInDB.email,
        error: "Debés verificar tu email antes de iniciar sesión",
      });
    }

    const token = signToken(userInDB);

    return res.status(200).json({
      success: true,
      user: buildUserResponse(userInDB),
      token,
    });
  } catch (error) {
    console.error("[AUTH] signIn error:", error);

    return res.status(500).json({
      success: false,
      error: "Error interno",
    });
  }
};

export const signInToken = (req, res) => {
  return res.status(200).json({
    success: true,
    user: buildUserResponse(req.user),
  });
};