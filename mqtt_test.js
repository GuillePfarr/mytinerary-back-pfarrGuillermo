import mqtt from "mqtt";

const url = "mqtts://a0afdfe096bb4fd6b483725a3c548747.s1.eu.hivemq.cloud:8883";

const client = mqtt.connect(url, {
  username: "vanguard_backend",
  password: "Vanguard60438",
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
