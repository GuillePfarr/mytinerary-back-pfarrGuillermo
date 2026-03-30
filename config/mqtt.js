// import mqtt from "mqtt";

// export function createMqttClient() {

// console.log("[MQTT] === BOOT mqtt.js v2 ===");

//   const url = process.env.MQTT_URL;

//   // Acepta ambos nombres (por si quedó algo viejo en Render)
//   const username = process.env.MQTT_USER || process.env.MQTT_USERNAME;
//   const password = process.env.MQTT_PASS || process.env.MQTT_PASSWORD;

//   console.log("[MQTT] URL present:", !!url);
//   console.log("[MQTT] USER present:", !!username);
//   console.log("[MQTT] PASS present:", !!password);

//   const client = mqtt.connect(url, {
//     clientId: "backend-" + Math.random().toString(16).slice(2),
//     keepalive: 20,
//     reconnectPeriod: 3000,
//     username,
//     password,
//   });

//   client.on("connect", () => console.log("[MQTT] Backend conectado"));
//   client.on("reconnect", () => console.log("[MQTT] Backend reconectando..."));
//   client.on("error", (err) => console.log("[MQTT] Error:", err.message));

//   return client;
// }


import mqtt from "mqtt";
import Device from "./Models/Device.js";

export function createMqttClient() {
  console.log("[MQTT] === BOOT mqtt.js v3 ===");

  const url = process.env.MQTT_URL;

  const username = process.env.MQTT_USER || process.env.MQTT_USERNAME;
  const password = process.env.MQTT_PASS || process.env.MQTT_PASSWORD;

  console.log("[MQTT] URL present:", !!url);
  console.log("[MQTT] USER present:", !!username);
  console.log("[MQTT] PASS present:", !!password);

  const client = mqtt.connect(url, {
    clientId: "backend-" + Math.random().toString(16).slice(2),
    keepalive: 20,
    reconnectPeriod: 3000,
    username,
    password,
  });

  client.on("connect", () => {
    console.log("[MQTT] Backend conectado");

    client.subscribe("devices/+/relays/+/state", (err) => {
      if (err) {
        console.log("[MQTT] Error al suscribirse a state:", err.message);
      } else {
        console.log("[MQTT] Suscripto a devices/+/relays/+/state");
      }
    });
  });

  client.on("message", async (topic, payload) => {
    try {
      const state = payload.toString().trim().toUpperCase();

      console.log("[MQTT] STATE recibido:", topic, state);

      const parts = topic.split("/");

      // devices/esp32_01/relays/25/state
      const deviceId = parts[1];
      const relayId = parts[3];

      if (!deviceId || !relayId) {
        console.log("[MQTT] Topic inválido:", topic);
        return;
      }

      await Device.updateOne(
        { deviceId },
        { $set: { [`relayStates.${relayId}`]: state } }
      );

      console.log(
        `[MQTT] Estado guardado en Mongo: ${deviceId} relay ${relayId} = ${state}`
      );
    } catch (err) {
      console.log("[MQTT] Error procesando state:", err.message);
    }
  });

  client.on("reconnect", () => console.log("[MQTT] Backend reconectando..."));
  client.on("error", (err) => console.log("[MQTT] Error:", err.message));

  return client;
}