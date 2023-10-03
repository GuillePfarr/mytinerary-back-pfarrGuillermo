import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../Models/User.js";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "Aldi$Berliner*"

}
const fn = async (jwt_payload, done) => {
    try {
        const user = await User.findOne({ email: jwt_payload.email })

        if (!user) {
            done(null, false)

        }
console.log(user)
        done(null, user)
    } catch (err) {
        next(err, false)
    }
}



  export default passport.use(new Strategy(options, fn))