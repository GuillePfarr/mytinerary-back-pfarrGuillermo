// import mongoose from "mongoose";

// const deviceSchema = new mongoose.Schema(
//   {
//     // puede ser null hasta que el usuario lo reclame
//     owner: {
//       type: mongoose.Types.ObjectId,
//       ref: "user",
//       default: null,
//     },

//     name: {
//       type: String,
//       default: "Mi dispositivo",
//     },

//     // ID único que también usa el ESP32 (ej: "esp32_01")
//     deviceId: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     // hash del código de claim (PIN / QR)
//     claimCodeHash: {
//       type: String,
//       required: true,
//     },

//     // cuándo fue reclamado por un usuario
//     claimedAt: {
//       type: Date,
//       default: null,
//     },

//     // estado real de relés, ej: { "25": "ON" }
//     relayStates: {
//       type: Map,
//       of: String,
//       default: {},
//     },
//   },
//   { timestamps: true }
// );

// const Device = mongoose.model("device", deviceSchema);
// export default Device;

import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    // puede ser null hasta que el usuario lo reclame
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      default: null,
    },

    name: {
      type: String,
      default: "Mi dispositivo",
    },

    // ID único que también usa el ESP32 (ej: "esp32_01")
    deviceId: {
      type: String,
      required: true,
      unique: true,
    },

    // hash del código de claim (PIN / QR)
    claimCodeHash: {
      type: String,
      required: true,
    },

    // cuándo fue reclamado por un usuario
    claimedAt: {
      type: Date,
      default: null,
    },

    // estado real de relés, ej: { "25": "ON" }
    relayStates: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true }
);

const Device = mongoose.model("device", deviceSchema);
export default Device;