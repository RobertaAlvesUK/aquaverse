// Import the Express framework
import express from "express";

// Import database helper functions
import { all, get } from "./database/db.mjs";

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

// Define one dynamic route for all aquarium zones
app.get("/zone/:slug", async (req, res) => {
  try {
    // Get the zone by slug using a parameterised query
    const zone = await get(
      "SELECT * FROM zones WHERE slug = ?",
      [req.params.slug]
    );

    // Show an error message if the zone does not exist
    if (!zone) {
      return res.status(404).render("404");
    }

    // Get all exhibits that belong to the selected zone
    const exhibits = await all(
      "SELECT * FROM exhibits WHERE zone_id = ?",
      [zone.id]
    );

    // Render the zone page with database data
    res.render("zone", { zone, exhibits });
  } catch (error) {
    console.error(error);
    res.status(500).send("Database error.");
  }
});

// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}` );
});
