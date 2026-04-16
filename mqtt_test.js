import dotenv from "dotenv";
import mqtt from "mqtt";

dotenv.config();

const url = process.env.MQTT_URL;

const client = mqtt.connect(url, {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
  reconnectPeriod: 0,
});

client.on("connect", () => {
  console.log("✅ OK: conectado a HiveMQ");
  client.end(true, () => process.exit(0));
});

client.on("error", (err) => {
  console.log("❌ ERROR:", err.message);
  process.exit(1);
});