
import mqtt from "mqtt";
import Device from "./Models/Device.js";

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


  return client;
}