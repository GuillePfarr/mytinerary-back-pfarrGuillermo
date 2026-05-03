import "dotenv/config";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import "../config/database.js";
import Device from "../config/Models/Device.js";

const args = process.argv.slice(2);

function getArg(name, defaultValue = "") {
  const index = args.indexOf(`--${name}`);

  if (index === -1) {
    return defaultValue;
  }

  const value = args[index + 1];

  if (!value || value.startsWith("--")) {
    return defaultValue;
  }

  return value;
}

function generateDeviceId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const random = crypto.randomBytes(3).toString("hex");

  return `vu_${date}_${random}`;
}

function generateClaimCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for (let i = 0; i < 8; i += 1) {
    const index = crypto.randomInt(0, alphabet.length);
    code += alphabet[index];
  }

  return code;
}

function generateDeviceToken() {
  return crypto.randomBytes(32).toString("hex");
}

async function ensureUniqueDeviceId() {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const deviceId = generateDeviceId();
    const existingDevice = await Device.findOne({ deviceId });

    if (!existingDevice) {
      return deviceId;
    }
  }

  throw new Error("No se pudo generar un deviceId único despues de 5 intentos.");
}

async function main() {
  const model = getArg("model", "Vivero_Uno");
  const hardwareVersion = getArg("hardware", "HW-1");
  const firmwareVersion = getArg("firmware", "");
  const type = getArg("type", "vivero");
  const name = getArg("name", "Mi dispositivo");
  const timezone = getArg("timezone", "");
  const apiBaseUrl = getArg("apiBaseUrl", "https://mytinerary-2s20.onrender.com");

  const deviceId = await ensureUniqueDeviceId();
  const claimCode = generateClaimCode();
  const deviceToken = generateDeviceToken();

  const claimCodeHash = await bcrypt.hash(claimCode, 10);
  const deviceTokenHash = await bcrypt.hash(deviceToken, 10);

  const device = await Device.create({
    owner: null,
    name,
    deviceId,
    claimCodeHash,
    deviceTokenHash,
    claimedAt: null,
    relayStates: {},
    type,
    model,
    firmwareVersion,
    hardwareVersion,
    timezone,
    online: false,
    lastSeen: null,
    lastHeartbeatAt: null,
    lastHeartbeat: null,
    lastSnapshot: null,
  });

  const outputDir = path.join(
    process.cwd(),
    "out",
    "provisioned-devices",
    deviceId,
  );

  await fs.mkdir(outputDir, { recursive: true });

  const deviceConfig = {
    deviceId,
    deviceToken,
    apiBaseUrl,
    model,
    hardwareVersion,
    firmwareVersion,
    timezone,
  };

  const claimInfo = {
    deviceId,
    claimCode,
    instructions:
      "Inicie sesion en la app, vaya a Devices y reclame el equipo usando este deviceId y claimCode.",
  };

  const claimText = [
    "Datos para reclamar dispositivo",
    "",
    `Device ID: ${deviceId}`,
    `Claim Code: ${claimCode}`,
    "",
    "Instrucciones:",
    "1. Inicie sesion en la app.",
    "2. Vaya a Devices.",
    "3. Ingrese el Device ID y el Claim Code.",
    "4. Asigne un nombre al dispositivo si lo desea.",
    "",
    "Importante: este codigo es solo para el cliente. No contiene el deviceToken secreto de la placa.",
    "",
  ].join("\n");

  await fs.writeFile(
    path.join(outputDir, "device.json"),
    JSON.stringify(deviceConfig, null, 2),
    "utf8",
  );

  await fs.writeFile(
    path.join(outputDir, "claim.json"),
    JSON.stringify(claimInfo, null, 2),
    "utf8",
  );

  await fs.writeFile(path.join(outputDir, "claim.txt"), claimText, "utf8");

  console.log("");
  console.log("Device provisionado correctamente");
  console.log("--------------------------------");
  console.log(`Mongo _id: ${device._id}`);
  console.log(`Device ID: ${deviceId}`);
  console.log(`Claim Code cliente: ${claimCode}`);
  console.log(`Output: ${outputDir}`);
  console.log("");
  console.log("Archivos generados:");
  console.log("- device.json  -> placa/SD, contiene deviceToken secreto");
  console.log("- claim.json   -> cliente, contiene claimCode");
  console.log("- claim.txt    -> cliente, version legible");
  console.log("");
  console.log("No subas la carpeta out/ al repositorio.");
}

main()
  .catch((error) => {
    console.error("");
    console.error("Error provisionando device:");
    console.error(error.message);
    console.error("");
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });