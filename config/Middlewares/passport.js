import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../Models/User.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyJwt = async (jwtPayload, done) => {
  try {
    if (!jwtPayload?.sub) {
      return done(null, false);
    }

    const user = await User.findById(jwtPayload.sub).select("-password");

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

passport.use(new Strategy(options, verifyJwt));

export default passport;