import { Router } from "express";
import { signIn, signUp} from "../controllers/authController"
const authRouter = Router ()

authRouter.get( "/", signIn)
authRouter.post( "/", signUp)

export default authRouter