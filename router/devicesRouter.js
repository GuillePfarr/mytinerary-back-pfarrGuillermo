import { Router } from "express";
import { requireAuth } from "../config/Middlewares/requireAuth.js";
import devicesController from "../controllers/devicesController.js";

const devicesRouter = Router();

devicesRouter.get("/", requireAuth, devicesController.listMyDevices);

devicesRouter.post("/claim", requireAuth, devicesController.claimDevice);

devicesRouter.post(
  "/:deviceId/relays/:relayId",
  requireAuth,
  devicesController.setRelay,
);

// Firmware -> Backend
// Primera versión sin JWT de usuario.
// Más adelante agregamos token de dispositivo.
devicesRouter.post("/:deviceId/snapshot", devicesController.receiveSnapshot);

export default devicesRouter;
