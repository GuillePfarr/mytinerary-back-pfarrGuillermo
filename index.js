import "dotenv/config.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import indexRouter from "./router/indexRouter.js";
import "./config/database.js";
import { createMqttClient } from "./config/mqtt.js";

const server = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://mytinerary-guille-pfarr.vercel.app",
];

server.use(helmet());

server.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS: origin not allowed"));
    },
    credentials: false,
  }),
);

server.use(express.json({ limit: "100kb" }));

const mqttClient = createMqttClient();
server.set("mqttClient", mqttClient);

server.use("/api", indexRouter);

server.get("/", (request, response) => {
  response.send("Bienvenido a mi servidor");
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
