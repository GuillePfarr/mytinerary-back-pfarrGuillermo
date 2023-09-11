import { Router } from "express";
import { signIn, signUp} from "../controllers/authController.js"
const authRouter = Router ()

authRouter.get( "/", signIn)
authRouter.post( "/", signUp)

export default authRouter