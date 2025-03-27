const mongoose = require("mongoose");

/**
 * MongoDB connection options
 * @type {Object}
 */
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

/**
 * MongoDB connection function
 * @returns {Promise<void>}
 */
const connection = () => {
  // Track connection status
  let isConnected = false;

  // Connect to MongoDB
  return mongoose
    .connect(process.env.CONNECTION_URL, options)
    .then(() => {
      isConnected = true;
      console.log("Database connection successful");
    })
    .catch((error) => {
      isConnected = false;
      console.error("Database connection error:", error);
      throw error;
    });
};

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB");
});

// Handle application termination
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("Mongoose connection closed through app termination");
    process.exit(0);
  } catch (err) {
    console.error("Error during mongoose connection closure:", err);
    process.exit(1);
  }
});

module.exports = connection;
