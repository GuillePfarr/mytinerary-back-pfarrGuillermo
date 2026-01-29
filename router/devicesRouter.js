
// console.log("[BOOT] devicesRouter cargado");
// import { Router } from "express";
// import passport from "../config/Middlewares/passport.js";
// import devicesController from "../controllers/devicesController.js";


// const devicesRouter = Router();

// // POST /api/devices/:deviceId/relays/25  body: { "state": "ON" }
// devicesRouter.post(
//   "/:deviceId/relays/25",
//   passport.authenticate("jwt", { session: false }),
//   devicesController.setRelay25
// );

// export default devicesRouter;



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
  "/:deviceId/relays/25",
  passport.authenticate("jwt", { session: false }),
  devicesController.setRelay25
);

export default devicesRouter;
