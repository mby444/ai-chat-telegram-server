import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_URI: mongoUri } = process.env;

export const connectDB = async (callback = Function()) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected!");
    callback();
  } catch (err) {
    console.log(err);
  }
};

export default {
  connectDB,
};
