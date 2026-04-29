import passport from "./passport.js";

export const requireAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      const isExpired = info?.name === "TokenExpiredError";

      return res.status(401).json({
        success: false,
        code: isExpired ? "TOKEN_EXPIRED" : "UNAUTHORIZED",
        error: isExpired
          ? "Tu sesión expiró. Iniciá sesión nuevamente."
          : "No autorizado",
      });
    }

    req.user = user;
    return next();
  })(req, res, next);
};
