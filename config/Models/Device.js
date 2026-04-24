import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    // usuario dueño (null hasta claim)
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      default: null,
    },

    name: {
      type: String,
      default: "Mi dispositivo",
    },

    // ID físico único usado también por firmware
    deviceId: {
      type: String,
      required: true,
      unique: true,
    },

    // claim inicial
    claimCodeHash: {
      type: String,
      required: true,
    },

    deviceTokenHash: {
      type: String,
      default: null,
    },

    claimedAt: {
      type: Date,
      default: null,
    },

    // estado relés actual
    relayStates: {
      type: Map,
      of: String,
      default: {},
    },

    // NUEVO =====

    type: {
      type: String,
      default: "vivero",
    },

    model: {
      type: String,
      default: "Vivero_Uno",
    },

    firmwareVersion: {
      type: String,
      default: "",
    },

    hardwareVersion: {
      type: String,
      default: "",
    },

    timezone: {
      type: String,
      default: "",
    },

    online: {
      type: Boolean,
      default: false,
    },

    lastSeen: {
      type: Date,
      default: null,
    },

    lastSnapshot: {
      type: Object,
      default: null,
    }
  },
  { timestamps: true }
);

const Device = mongoose.model("device", deviceSchema);
export default Device;