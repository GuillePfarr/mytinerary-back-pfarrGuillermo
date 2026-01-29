// import mqtt from "mqtt";

// export function createMqttClient() {
//   const url = process.env.MQTT_URL;

//   if (!url) {
//     console.log("[MQTT] Falta MQTT_URL en variables de entorno");
//   }

//   const options = {
//     clientId: "backend-" + Math.random().toString(16).slice(2),
//     keepalive: 20,
//     reconnectPeriod: 3000,
//     username: process.env.MQTT_USER,
//     password: process.env.MQTT_PASS,
//   };

//   const client = mqtt.connect(url, options);

//   client.on("connect", () => console.log("[MQTT] Backend conectado"));
//   client.on("reconnect", () => console.log("[MQTT] Backend reconectando..."));
//   client.on("error", (err) =>
//     console.log("[MQTT] Error:", err.message)
//   );

//   return client;
// }

import mqtt from "mqtt";

export function createMqttClient() {
  const url = process.env.MQTT_URL;

  // Acepta ambos nombres (por si quedó algo viejo en Render)
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

  client.on("connect", () => console.log("[MQTT] Backend conectado"));
  client.on("reconnect", () => console.log("[MQTT] Backend reconectando..."));
  client.on("error", (err) => console.log("[MQTT] Error:", err.message));

  return client;
}
