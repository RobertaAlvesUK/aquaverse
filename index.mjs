// Import the Express framework
import express from "express";

// Create the Express application
const app = express();

// Set the port number the server will run on
const PORT = 5000;

// Define the homepage route
app.get("/", (req, res) => {
  res.send("Hello, AquaVerse!");
});

// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}` );
});

