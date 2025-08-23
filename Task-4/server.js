const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("subscribe", {
    email: "",
    password: "",
    errors: {},
    isSubscribed: false,
  });
});

app.post("/dashboard", (req, res) => {
  const { email, password } = req.body;
  const errors = {};

  // --- Validation ---
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
    errors.password =
      "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.";
  }

  // If errors, re-render subscribe page
  if (Object.keys(errors).length > 0) {
    return res.status(400).render("subscribe", { email, password, errors, isSubscribed: false });
  }

  // Success → render dashboard
  res.render("dashboard", { email, isSubscribed: true });
});

// Routes to render partial pages
app.get("/page/:name", (req, res) => {
  const pageName = req.params.name;
  res.render(`partials/${pageName}`, {}, (err, html) => {
    if (err) {
      res.status(404).send("Page not found");
    } else {
      res.send(html);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
