// Import the Express framework
import express from "express";

// Import database helper functions
import { get, all, run } from "./database/db.mjs";

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

// Read data sent from HTML forms
app.use(express.urlencoded({ extended: false }));

// Define the homepage route
app.get("/", (req, res) => {
  res.render("home");
});

// Define the FAQ page route
app.get("/faq", (req, res) => {
  res.render("faq");
});

// Define the contact page route
app.get("/contact", (req, res) => {
  res.render("contact", {
    errorMessage: "",
    successMessage: ""
  });
});

// Receive and validate the contact form data
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Check that every form field has a value
  if (!name || !email || !message) {
    res.status(400).render("contact", {
      errorMessage: "Please complete all fields before sending your message.",
      successMessage: ""
    });
    return;
  }

  // Save the message using a parameterised query
  await run(
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
    [name, email, message]
  );

  // Show confirmation after the message is saved
  res.render("contact", {
    errorMessage: "",
    successMessage: "Thank you. Your message has been sent successfully."
  });
});

// Define dynamic routes for aquarium zones
app.get("/zone/:slug", async (req, res) => {
  const zone = await get(
    "SELECT * FROM zones WHERE slug = ?",
    [req.params.slug]
  );

  // Show the custom 404 page when a zone does not exist
  if (!zone) {
    res.status(404).render("404");
    return;
  }

  // Get exhibits belonging to the selected zone
  const exhibits = await all(
    "SELECT * FROM exhibits WHERE zone_id = ?",
    [zone.id]
  );

  res.render("zone", { zone, exhibits });
});

// Show the custom 404 page for an unknown route
app.use((req, res) => {
  res.status(404).render("404");
});

// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}` );
});
