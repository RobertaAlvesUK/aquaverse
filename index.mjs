// Import the Express framework
import express from "express";

// Create the Express application
const app = express();

// Set the port number the server will run on
const PORT = 5000;

// Tell Express to use EJS as the template engine
app.set("view engine", "ejs");

// Tell Express where to find the view files
app.set("views", "views");

// Serve static files (CSS, images, JS) from the public folder
app.use(express.static("public"));

// Define the homepage route
app.get("/", (req, res) => {
  res.render("home");
});

// Define the FAQ page route
app.get("/faq", (req, res) => {
  res.render("faq");
});


// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}` );
});
