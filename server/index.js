const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const http = require("http"); // New
const { Server } = require("socket.io"); // New

const app = express();
const server = http.createServer(app); // New
const io = new Server(server, {
  cors: {
    origin: "https://parkme-lac.vercel.app", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000; // Use environment variable or default

// Use the cors middleware with specific configuration
const corsOptions = {
  origin: "https://parkme-lac.vercel.app", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies or authorization headers
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Add a route to display "Server is working" in the browser
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain"); // Explicitly set the response type
  res.send("Server is working");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Socket.IO connection for real-time notifications
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Import routes after setting up Socket.IO
const parkingRoutes = require("./routes/parking")(io); // Pass io instance
app.use("/api", parkingRoutes);

// Start the server with Socket.IO support
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/* 
 Testing Endpoints replace this http://localhost:5000 to the frontend url 
2.1. Test the /api/slots Endpoint (GET All Slots)
Purpose: Fetch the list of all parking slots.

Method: GET

Endpoint: http://localhost:5000/api/slots

Steps:

Open Postman and select GET as the request method.
Enter the URL (http://localhost:5000/api/slots).
Click Send.
Check the response body for a list of parking slots.
Expected Response:

json
Copy code
[
  { "slotId": "1", "status": "available" },
  { "slotId": "2", "status": "occupied", "vehicleNumber": "AB1234" }
]
2.2. Test the /api/slots/:id Endpoint (GET Specific Slot)
Purpose: Get details of a specific parking slot.

Method: GET

Endpoint: http://localhost:5000/api/slots/1

Steps:

Replace 1 in the URL with the desired slot ID.
Click Send.
Expected Response:

json
Copy code
{ "slotId": "1", "status": "available" }
2.3. Test the /api/slots Endpoint (POST Add Slot)
Purpose: Add a new parking slot.

Method: POST

Endpoint: http://localhost:5000/api/slots

Body (JSON):

json
Copy code
{ "slotId": "13", "status": "available" }
Steps:

Select the Body tab in Postman and choose raw.
Set the format to JSON.
Add the JSON payload above and click Send.
Expected Response:

json
Copy code
{ "message": "Slot added successfully!" }
2.4. Test the /api/slots/:id Endpoint (PUT Update Slot)
Purpose: Update the status of a specific parking slot.

Method: PUT

Endpoint: http://localhost:5000/api/slots/1

Body (JSON):

json
Copy code
{ "status": "occupied", "vehicleNumber": "XY5678" }
Steps:

Replace 1 with the slot ID.
Add the JSON payload in the request body and click Send.
Expected Response:

json
Copy code
{ "message": "Slot updated successfully!" }
2.5. Test the /api/slots/:id Endpoint (DELETE Slot)
Purpose: Delete a specific parking slot.

Method: DELETE

Endpoint: http://localhost:5000/api/slots/1

Steps:

Replace 1 with the slot ID.
Click Send.
Expected Response:

json
Copy code
{ "message": "Slot deleted successfully!" }
2.6. Test the /api/getDetailsByVehicle Endpoint (GET Vehicle Info)
Purpose: Retrieve user details by vehicle number.

Method: GET

Endpoint: http://localhost:5000/api/getDetailsByVehicle?vehicleNumber=AB1234

Steps:

Add the vehicle number as a query parameter (?vehicleNumber=AB1234).
Click Send.
Expected Response:

json
Copy code
{
  "vehicleNumber": "AB1234",
  "userName": "John Doe",
  "contactEmail": "john@example.com"
}

*/
