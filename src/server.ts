import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer(app);

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.db_url as string);
    console.log("✅ Connected to MongoDB");

    // Start the server
    server.listen(config.port, () => {
      console.log(`🚀 Backend app listening on port ${config.port}`);
    });

    // Initialize Socket.io
    const io = new Server(server, {
      cors: {
        origin: "*", // Adjust this to your frontend domain for security
      },
    });

    // Attach io to the app for global use
    app.set("io", io);

    io.on("connection", (socket) => {
      console.log(`🔌 A user connected: ${socket.id}`);
      console.log("Headers:", socket.handshake.headers);
      console.log("Query Params:", socket.handshake.query);

      socket.on("disconnect", () => {
        console.log(`❌ A user disconnected: ${socket.id}`);
      });
    });
  } catch (err) {
    console.error(`❌ Failed to start server:`, err);
  }
}

// Start the main function
main();

// Graceful Shutdown Handlers
process.on("unhandledRejection", (err: any) => {
  console.error(
    `😈 unhandledRejection detected. Reason: ${err.message || err}`
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on("uncaughtException", (err: any) => {
  console.error(`😈 uncaughtException detected. Reason: ${err.message || err}`);
  process.exit(1);
});
