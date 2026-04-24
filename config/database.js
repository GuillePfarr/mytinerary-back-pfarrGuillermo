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




