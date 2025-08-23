const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.redirect("subscribe-whisper-of-ink");
});

app.get("/subscribe-whisper-of-ink", (req, res) => {
  res.render("subscribe", {
    username: "",
    email: "",
    genre: [],
    errors: {}
  });
});

app.get("/explore", (req, res) => {
  res.render("dashboard", {
    username: null,
    email: null,
    genre: null,
    isSubscribed: false,
  });
});

app.post("/dashboard", (req, res) => {
  const { username, email } = req.body;
  let genre = req.body.genre;
  const errors = {};

  // --- Validation ---
  if (!username || username.trim().length < 3 || username.trim().length > 25) {
    errors.username = "Full name must be in range of 3-25 characters!";
  } else if (!/^[A-Za-z\s]+$/.test(username)) {
    errors.username = "Full name must contain only alphabets and spaces!";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format.";
  }

  if (!genre) {
    errors.genre = "Please select at least one genre.";
  } else if (!Array.isArray(genre)) {
    genre = [genre];
  }

  // If errors, re-render subscribe page
  if (Object.keys(errors).length > 0) {
    return res.status(400).render("subscribe", {
      errors,
      username,
      email,
      genre: genre || [],
    });
  }

  // Optional: prepare genre string for display
  const genreDisplay = genre.join(", ");

  // Success → render dashboard
  res.render("dashboard", {
    username,
    email,
    genre: genreDisplay,
    isSubscribed: true,
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
