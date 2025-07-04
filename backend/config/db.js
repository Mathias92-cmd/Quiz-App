import mongoose, { mongo } from "mongoose";

export async function connectToDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ", conn.connection.host);
  } catch (error) {
    console.log("Error connection to MongoDB : ", error.message);
    process.exit(1);
  }
}
