// import mongoose from "mongoose";

// const deviceSchema = new mongoose.Schema(
//   {
//     // tu User model se llama 'user', por eso el ref es "user"
//     owner: { type: mongoose.Types.ObjectId, ref: "user", required: true },

//     name: { type: String, default: "Mi dispositivo" },

//     // ID único que también usa el ESP32 (ej: "esp32_01")
//     deviceId: { type: String, required: true, unique: true },
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
      default: null,      // 👈 antes required:true
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
      required: true,     // 👈 todo device provisionado debe tenerlo
    },

    // cuándo fue reclamado por un usuario
    claimedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Device = mongoose.model("device", deviceSchema);
export default Device;
