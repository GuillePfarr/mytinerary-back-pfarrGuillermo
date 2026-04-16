
// import mqtt from "mqtt";
// import Device from "./Models/Device.js";

// export function createMqttClient() {

//   const url = process.env.MQTT_URL;

//   const username = process.env.MQTT_USER || process.env.MQTT_USERNAME;
//   const password = process.env.MQTT_PASS || process.env.MQTT_PASSWORD;

//   const clientId = "backend-" + Math.random().toString(16).slice(2);

//   console.log(`[MQTT] BOOT clientId=${clientId}`);
//   console.log(`[MQTT] URL present: ${!!url}`);
//   console.log(`[MQTT] USER present: ${!!username}`);
//   console.log(`[MQTT] PASS present: ${!!password}`);

//   const client = mqtt.connect(url, {
//     clientId,
//     keepalive: 20,
//     reconnectPeriod: 3000,
//     username,
//     password,
//   });


//   return client;
// }

import mqtt from "mqtt";
import Device from "./Models/Device.js";

function parseRelayStateTopic(topic) {
  // Esperado: devices/<deviceId>/relays/<relayId>/state
  const parts = topic.split("/");

  if (parts.length !== 5) return null;
  if (parts[0] !== "devices") return null;
  if (parts[2] !== "relays") return null;
  if (parts[4] !== "state") return null;

  const deviceId = parts[1];
  const relayId = parts[3];

  if (!deviceId || !relayId) return null;

  return { deviceId, relayId };
}

export function createMqttClient() {
  const url = process.env.MQTT_URL;
  const username = process.env.MQTT_USER || process.env.MQTT_USERNAME;
  const password = process.env.MQTT_PASS || process.env.MQTT_PASSWORD;

  const clientId = "backend-" + Math.random().toString(16).slice(2);

  console.log(`[MQTT] BOOT clientId=${clientId}`);
  console.log(`[MQTT] URL present: ${!!url}`);
  console.log(`[MQTT] USER present: ${!!username}`);
  console.log(`[MQTT] PASS present: ${!!password}`);

  const client = mqtt.connect(url, {
    clientId,
    keepalive: 20,
    reconnectPeriod: 3000,
    username,
    password,
  });

  client.on("connect", () => {
    console.log("[MQTT] ✅ conectado");

    const stateTopic = "devices/+/relays/+/state";

    client.subscribe(stateTopic, { qos: 1 }, (err) => {
      if (err) {
        console.error("[MQTT] ❌ error al suscribirse a topic de estado:", err.message);
        return;
      }

      console.log(`[MQTT] 👂 suscripto a ${stateTopic}`);
    });
  });

  client.on("reconnect", () => {
    console.log("[MQTT] reconectando...");
  });

  client.on("error", (err) => {
    console.error("[MQTT] ❌ error:", err.message);
  });

  client.on("message", async (topic, payloadBuffer) => {
    try {
      const payload = payloadBuffer.toString().trim().toUpperCase();

      console.log(`[MQTT] mensaje recibido topic=${topic} payload=${payload}`);

      if (payload !== "ON" && payload !== "OFF") {
        console.warn(`[MQTT] payload ignorado por inválido: ${payload}`);
        return;
      }

      const parsed = parseRelayStateTopic(topic);
      if (!parsed) {
        console.warn(`[MQTT] topic ignorado por formato no esperado: ${topic}`);
        return;
      }

      const { deviceId, relayId } = parsed;

      const updateResult = await Device.updateOne(
        { deviceId },
        {
          $set: {
            [`relayStates.${relayId}`]: payload,
            lastSeenAt: new Date(),
          },
        }
      );

      if (updateResult.matchedCount === 0) {
        console.warn(`[MQTT] device no encontrado en DB: ${deviceId}`);
        return;
      }

      console.log(
        `[MQTT] ✅ estado persistido deviceId=${deviceId} relay=${relayId} state=${payload}`
      );
    } catch (error) {
      console.error("[MQTT] ❌ error procesando mensaje:", error.message);
    }
  });

  return client;
}