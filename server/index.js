const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http"); // New
const { Server } = require("socket.io"); // New

const app = express();
const server = http.createServer(app); // New
const io = new Server(server, {
  cors: {
    origin: "https://parkme-lac.vercel.app", // Client URL
    methods: ["GET", "POST"],
  },
});

const PORT = 8000 || 5000;

app.use(cors());
app.use(bodyParser.json());

// Add a route to display "Server is working" in the browser
app.get("/", (req, res) => {
  res.send("Server is working");
});

mongoose
  .connect("mongodb://localhost:27017/parking_management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Notify clients of new entries
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Import routes after setting up Socket.IO
const parkingRoutes = require("./routes/parking")(io); // Pass io instance
app.use("/api", parkingRoutes);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
