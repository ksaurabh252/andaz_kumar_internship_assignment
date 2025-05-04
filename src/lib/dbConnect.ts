import mongoose from "mongoose";

let isConnected = false;

export async function dbConnect() {
  if (isConnected) {
    return true;
  }
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to DB");
  });
  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }
  console.log("connecting to db");
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      retryWrites: true,
      w: "majority",
      appName: "Cluster0",
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    // Update the connection status
    isConnected = mongoose.connection.readyState === 1;

    // Log a successful connection message
    console.log("MongoDB connection status:", mongoose.connection.readyState);
    console.log("Connection attempt to:", process.env.MONGODB_URI);
    return isConnected;
  } catch (error) {
    console.error("Database connection error:", error);
    isConnected = false;
    throw error;
  }
}

export const checkConnectionStatus = () => {
  return {
    isConnected: mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState,
  };
};

//   switch (state) {
//     case 0:
//       return "disconnected";
//     case 1:
//       return "connected";
//     case 2:
//       return "connecting";
//     case 3:
//       return "disconnecting";
//     default:
//       return "unknown";
//   }
// };
