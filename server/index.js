const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Configure CORS with specific origin and headers
const corsOptions = {
  origin: "https://parkme-lac.vercel.app", // Update with your client URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies if needed
};
app.use(cors(corsOptions));

// Configure Socket.IO with CORS
const io = new Server(server, {
  cors: corsOptions,
});

const PORT = 8000 || 5000; // Use environment variable or default

app.use(bodyParser.json());

// Add a route to display "Server is working" in the browser
app.get("/", (req, res) => {
  res.send("Server is working");
});

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/parking_management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Notify clients of new entries via Socket.IO
io.on("connection", (socket) => {
  console.log("Client connected");

  // Example: Send a message to the client
  socket.emit("message", "Welcome to the server!");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Import routes after setting up Socket.IO
const parkingRoutes = require("./routes/parking")(io); // Pass io instance
app.use("/api", parkingRoutes);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
