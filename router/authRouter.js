import { Router } from "express";
import {
  signIn,
  signUp,
  signInToken,
  verifyEmail,
  resendVerificationCode,
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController.js";
import { signUpValidator } from "../config/Middlewares/signUpValidator.js";
import passport from "../config/Middlewares/passport.js";
import { authRateLimiter } from "../config/Middlewares/authRateLimiter.js";

const authRouter = Router();

authRouter.post("/signIn", authRateLimiter, signIn);
authRouter.post("/signUp", authRateLimiter, signUpValidator, signUp);
authRouter.post("/verify-email", authRateLimiter, verifyEmail);
authRouter.post(
  "/resend-verification",
  authRateLimiter,
  resendVerificationCode
);

authRouter.post(
  "/request-password-reset",
  authRateLimiter,
  requestPasswordReset
);

authRouter.post(
  "/reset-password",
  authRateLimiter,
  resetPassword
);

authRouter.post(
  "/signin/token",
  passport.authenticate("jwt", { session: false }),
  signInToken
);

export default authRouter;