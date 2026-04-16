// import Device from "../config/Models/Device.js";
// import bcrypt from "bcryptjs";

// const devicesController = {
  
//   listMyDevices: async (req, res) => {
//     try {
//       const devices = await Device.find({ owner: req.user._id }).sort({ createdAt: -1 });
//       return res.json({ success: true, devices });
//     } catch {
//       return res.status(500).json({ success: false, error: "Error interno" });
//     }
//   },

  
//   claimDevice: async (req, res) => {
//     try {
//       const { deviceId, claimCode, name } = req.body;

//       if (!deviceId || typeof deviceId !== "string") {
//         return res.status(400).json({ success: false, error: "deviceId requerido" });
//       }
//       if (!claimCode || typeof claimCode !== "string") {
//         return res.status(400).json({ success: false, error: "claimCode requerido" });
//       }

      
//       const device = await Device.findOne({ deviceId });
//       if (!device) {
//         return res.status(404).json({ success: false, error: "Device no provisionado" });
//       }

     
//       if (device.owner) {
//         return res.status(409).json({ success: false, error: "Ese device ya está reclamado" });
//       }

     
//       const ok = await bcrypt.compare(claimCode, device.claimCodeHash);
//       if (!ok) {
//         return res.status(401).json({ success: false, error: "claimCode inválido" });
//       }

//       device.owner = req.user._id;
//       device.name = name || device.name || "Mi dispositivo";
//       device.claimedAt = new Date();

//       await device.save();

//       return res.status(200).json({ success: true, device });
//     } catch {
//       return res.status(500).json({ success: false, error: "Error interno" });
//     }
//   },

  
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
//         if (err) return res.status(500).json({ success: false, error: "No se pudo publicar MQTT" });
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
  
  listMyDevices: async (req, res) => {
    try {
      const devices = await Device.find({ owner: req.user._id }).sort({ createdAt: -1 });
      return res.json({ success: true, devices });
    } catch {
      return res.status(500).json({ success: false, error: "Error interno" });
    }
  },

  
  claimDevice: async (req, res) => {
    try {
      const { deviceId, claimCode, name } = req.body;

      if (!deviceId || typeof deviceId !== "string") {
        return res.status(400).json({ success: false, error: "deviceId requerido" });
      }
      if (!claimCode || typeof claimCode !== "string") {
        return res.status(400).json({ success: false, error: "claimCode requerido" });
      }

      
      const device = await Device.findOne({ deviceId });
      if (!device) {
        return res.status(404).json({ success: false, error: "Device no provisionado" });
      }

     
      if (device.owner) {
        return res.status(409).json({ success: false, error: "Ese device ya está reclamado" });
      }

     
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
