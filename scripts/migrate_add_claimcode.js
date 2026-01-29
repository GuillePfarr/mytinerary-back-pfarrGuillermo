// import "dotenv/config";
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import Device from "../config/Models/Device.js";
// import connectDB from "../config/database.js";


// //const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
// const MONGO_URI =
//   process.env.DATABASE_URL ||
//   process.env.MONGO_URI ||
//   process.env.MONGODB_URI;

// if (!MONGO_URI) {
//   console.error("❌ Falta MONGO_URI (o MONGODB_URI) en variables de entorno");
//   process.exit(1);
// }

// const DEFAULT_CLAIM_CODE = "111111"; // ✅ elegí un PIN simple para dev (lo vas a usar luego si querés)

// async function run() {

// console.log("Using DATABASE_URL:", process.env.DATABASE_URL ? "OK (present)" : "MISSING");

//   await mongoose.connect(MONGO_URI);
//   console.log("✅ Conectado a Mongo");

//   const device = await Device.findOne({ deviceId: "esp32_01" });

//   if (!device) {
//     console.log("ℹ️ No existe esp32_01, nada para migrar.");
//     await mongoose.disconnect();
//     return;
//   }

//   if (device.claimCodeHash) {
//     console.log("ℹ️ esp32_01 ya tiene claimCodeHash, no hago nada.");
//     await mongoose.disconnect();
//     return;
//   }

//   const hash = await bcrypt.hash(DEFAULT_CLAIM_CODE, 10);

//   device.claimCodeHash = hash;
//   device.claimedAt = device.owner ? new Date() : null;

//   await device.save();

//   console.log("✅ Migración OK: esp32_01 actualizado.");
//   console.log(`👉 Claim code para DEV (si lo necesitaras): ${DEFAULT_CLAIM_CODE}`);

//   await mongoose.disconnect();
//   console.log("✅ Desconectado");
// }

// run().catch(async (err) => {
//   console.error("❌ Error en migración:", err);
//   try {
//     await mongoose.disconnect();
//   } catch {}
//   process.exit(1);
// });

import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Device from "../config/Models/Device.js";
import connectDB from "../config/database.js";

const DEFAULT_CLAIM_CODE = "111111"; // PIN simple para DEV

async function run() {
  console.log("Using DATABASE_URL:", process.env.DATABASE_URL ? "OK (present)" : "MISSING");

  // ✅ usa la MISMA conexión que usa el server (config/database.js)
  await connectDB();

  const device = await Device.findOne({ deviceId: "esp32_01" });

  if (!device) {
    console.log("ℹ️ No existe esp32_01, nada para migrar.");
    await mongoose.disconnect();
    return;
  }

  if (device.claimCodeHash) {
    console.log("ℹ️ esp32_01 ya tiene claimCodeHash, no hago nada.");
    await mongoose.disconnect();
    return;
  }

  const hash = await bcrypt.hash(DEFAULT_CLAIM_CODE, 10);

  device.claimCodeHash = hash;
  device.claimedAt = device.owner ? new Date() : null;

  await device.save();

  console.log("✅ Migración OK: esp32_01 actualizado.");
  console.log(`👉 Claim code para DEV (si lo necesitaras): ${DEFAULT_CLAIM_CODE}`);

  await mongoose.disconnect();
  console.log("✅ Desconectado");
}

run().catch(async (err) => {
  console.error("❌ Error en migración:", err?.message || err);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
