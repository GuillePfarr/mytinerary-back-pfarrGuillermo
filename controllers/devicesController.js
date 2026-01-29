// import Device from "../config/Models/Device.js";

// const devicesController = {
//   // GET /api/devices
//   listMyDevices: async (req, res) => {
//     try {
//       const devices = await Device.find({ owner: req.user._id }).sort({ createdAt: -1 });
//       return res.json({ success: true, devices });
//     } catch {
//       return res.status(500).json({ success: false, error: "Error interno" });
//     }
//   },

//   // POST /api/devices/claim
//   // body: { deviceId: "esp32_01", name: "ESP32 Vivero" }
//   claimDevice: async (req, res) => {
//     try {
//       const { deviceId, name } = req.body;

//       if (!deviceId || typeof deviceId !== "string") {
//         return res.status(400).json({ success: false, error: "deviceId requerido" });
//       }

//       const existing = await Device.findOne({ deviceId });
//       if (existing) {
//         return res.status(409).json({ success: false, error: "Ese deviceId ya está registrado" });
//       }

//       const device = await Device.create({
//         owner: req.user._id,
//         deviceId,
//         name: name || "Mi dispositivo",
//       });

//       return res.status(201).json({ success: true, device });
//     } catch {
//       return res.status(500).json({ success: false, error: "Error interno" });
//     }
//   },

//   // POST /api/devices/:deviceId/relays/25
//   // body: { state: "ON" }
//   setRelay25: async (req, res) => {
//     try {
//       const { deviceId } = req.params;
//       const { state } = req.body;

//       if (state !== "ON" && state !== "OFF") {
//         return res.status(400).json({ success: false, error: "state debe ser ON u OFF" });
//       }

//       const device = await Device.findOne({ deviceId, owner: req.user._id });
//       if (!device) {
//         return res.status(404).json({ success: false, error: "Device no encontrado o no autorizado" });
//       }

//       const mqttClient = req.app.get("mqttClient");
//       const topic = `devices/${deviceId}/relays/25/cmd`;

//       mqttClient.publish(topic, state, { qos: 1 }, (err) => {
//         if (err) {
//           return res.status(500).json({ success: false, error: "No se pudo publicar MQTT" });
//         }
//         return res.json({ success: true });
//       });
//     } catch {
//       return res.status(500).json({ success: false, error: "Error interno" });
//     }
//   },
// };

// export default devicesController;


import Device from "../config/Models/Device.js";
import bcrypt from "bcryptjs";

const devicesController = {
  // GET /api/devices
  listMyDevices: async (req, res) => {
    try {
      const devices = await Device.find({ owner: req.user._id }).sort({ createdAt: -1 });
      return res.json({ success: true, devices });
    } catch {
      return res.status(500).json({ success: false, error: "Error interno" });
    }
  },

  // POST /api/devices/claim
  // body: { deviceId: "x1", claimCode: "123456", name?: "Patio" }
  claimDevice: async (req, res) => {
    try {
      const { deviceId, claimCode, name } = req.body;

      if (!deviceId || typeof deviceId !== "string") {
        return res.status(400).json({ success: false, error: "deviceId requerido" });
      }
      if (!claimCode || typeof claimCode !== "string") {
        return res.status(400).json({ success: false, error: "claimCode requerido" });
      }

      // ✅ ahora el device debe existir (provisionado por vos)
      const device = await Device.findOne({ deviceId });
      if (!device) {
        return res.status(404).json({ success: false, error: "Device no provisionado" });
      }

      // ✅ si ya está reclamado, no se puede
      if (device.owner) {
        return res.status(409).json({ success: false, error: "Ese device ya está reclamado" });
      }

      // ✅ validar claimCode
      const ok = await bcrypt.compare(claimCode, device.claimCodeHash);
      if (!ok) {
        return res.status(401).json({ success: false, error: "claimCode inválido" });
      }

      device.owner = req.user._id;
      device.name = name || device.name || "Mi dispositivo";
      device.claimedAt = new Date();

      await device.save();

      return res.status(200).json({ success: true, device });
    } catch {
      return res.status(500).json({ success: false, error: "Error interno" });
    }
  },

  // POST /api/devices/:deviceId/relays/25
  setRelay25: async (req, res) => {
    try {
      const { deviceId } = req.params;
      const { state } = req.body;

      if (state !== "ON" && state !== "OFF") {
        return res.status(400).json({ success: false, error: "state debe ser ON u OFF" });
      }

      const device = await Device.findOne({ deviceId, owner: req.user._id });
      if (!device) {
        return res.status(404).json({ success: false, error: "Device no encontrado o no autorizado" });
      }

      const mqttClient = req.app.get("mqttClient");
      const topic = `devices/${deviceId}/relays/25/cmd`;

      mqttClient.publish(topic, state, { qos: 1 }, (err) => {
        if (err) return res.status(500).json({ success: false, error: "No se pudo publicar MQTT" });
        return res.json({ success: true });
      });
    } catch {
      return res.status(500).json({ success: false, error: "Error interno" });
    }
  },
};

export default devicesController;
