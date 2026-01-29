import mongoose from "mongoose";
console.log("DATABASE_URL present:", !!process.env.DATABASE_URL);

const uri =
  process.env.DATABASE_URL ||
  process.env.MONGO_URI ||
  process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ DATABASE_URL no definida");
  process.exit(1);
}

mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });



// import mongoose from "mongoose";

// export default async function connectDB() {
//   const uri =
//     process.env.DATABASE_URL ||
//     process.env.MONGO_URI ||
//     process.env.MONGODB_URI;

//   if (!uri) {
//     throw new Error("Falta DATABASE_URL/MONGO_URI/MONGODB_URI en variables de entorno");
//   }

//   // log seguro (no muestra credenciales)
//   const safe = uri.replace(/\/\/(.*?):(.*?)@/, "//(user):(pass)@");
//   console.log("[DB] Using:", safe);

//   await mongoose.connect(uri);
//   console.log("Database connected");
// }
