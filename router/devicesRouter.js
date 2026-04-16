import { Router } from "express";
import passport from "../config/Middlewares/passport.js";
import devicesController from "../controllers/devicesController.js";

const devicesRouter = Router();



devicesRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  devicesController.listMyDevices
);

devicesRouter.post(
  "/claim",
  passport.authenticate("jwt", { session: false }),
  devicesController.claimDevice
);

devicesRouter.post(
  "/:deviceId/relays/:relayId",
  passport.authenticate("jwt", { session: false }),
  devicesController.setRelay
);

export default devicesRouter;
