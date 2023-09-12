import { Router } from "express";
import { signIn, signUp} from "../controllers/authController.js"

import { signUpValidator} from "../config/Middlewares/signUpValidator.js"
const authRouter = Router ()

authRouter.post( "/signIn", signIn)
authRouter.post( "/signUp", signUpValidator, signUp)

export default authRouter