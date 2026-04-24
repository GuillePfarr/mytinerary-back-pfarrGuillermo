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

// Firmware -> Backend
// Primera versión sin JWT de usuario.
// Más adelante agregamos token de dispositivo.
devicesRouter.post(
  "/:deviceId/snapshot",
  devicesController.receiveSnapshot
);

export default devicesRouter;