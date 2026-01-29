import { Router } from "express";

const router = Router();

// POST /api/mqtt-test/relay25
// Body: { "state": "ON" } o { "state": "OFF" }
router.post("/relay25", (req, res) => {
  const { state } = req.body;

  if (state !== "ON" && state !== "OFF") {
    return res.status(400).json({ success: false, error: "state debe ser ON u OFF" });
  }

  const mqttClient = req.app.get("mqttClient");
  const topic = "devices/esp32_01/relays/25/cmd";

  mqttClient.publish(topic, state, { qos: 1 }, (err) => {
    if (err) {
      return res.status(500).json({ success: false, error: "publish fallo" });
    }
    return res.json({ success: true, topic, state });
  });
});

export default router;
