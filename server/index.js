const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bypassCors = require("@awaismirza/bypass-cors"); // Import bypass-cors

const app = express();
const PORT = 8000 || 5000; // Use environment variable or default

// Apply bypass-cors to allow bypassing CORS for all live URLs
app.use(bypassCors());

// Add custom CORS headers (optional, if specific configurations needed)
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://parkme-lac.vercel.app/" // Replace with your frontend URL
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

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

// In-memory queue to hold long-polling clients
let longPollingClients = [];

// Route for long polling to notify clients of new entries
app.get("/api/notify", (req, res) => {
  // Add client to the queue and hold the request
  longPollingClients.push(res);

  // Respond when a new entry is available
  res.on("close", () => {
    // Clean up when client disconnects
    longPollingClients = longPollingClients.filter((client) => client !== res);
  });
});

// Import routes
const parkingRoutes = require("./routes/parking");
app.use("/api", parkingRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
