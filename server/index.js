const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = 8000 || 5000; // Use process.env.PORT for deployment

// Create HTTP server
const server = http.createServer(app);

// Configure Socket.IO with CORS
const io = new Server(server, {
  cors: {
<<<<<<< HEAD
    origin: "https://parkme-lac.vercel.app", // Allow your frontend
=======
    origin: "https://parkme-lac.vercel.app", // Client URL
>>>>>>> e2275e8f64d7b4bdadd8a637d2acee06fa7f195a
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials
  },
});

// Middleware
app.use(
  cors({
    origin: "https://parkme-lac.vercel.app", // Allow your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies and credentials
  })
);
app.use(bodyParser.json());

// Basic route for testing
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

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Import and use routes
const parkingRoutes = require("./routes/parking")(io); // Pass io to routes
app.use("/api", parkingRoutes);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
