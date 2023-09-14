import { Router } from "express";
import { signIn, signUp, signInToken} from "../controllers/authController.js"
import { signUpValidator} from "../config/Middlewares/signUpValidator.js"
import passport from "../config/Middlewares/passport.js";
const authRouter = Router ()

authRouter.post( "/signIn", signIn)
authRouter.post( "/signUp", signUpValidator, signUp)
authRouter.post("/signin/token", passport.authenticate('jwt', {session:false}), signInToken )

export default authRouter