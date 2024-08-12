const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Sample users data
const sampleUsers = [
  {
    id: 1,
    username: "user1",
    password: "password1",
    interests: "cricket, sports, music",
  },
  { id: 2, username: "user2", password: "password2", interests: "" },
];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
// Login route
app.post("/login", (req, res) => {
  const { username, password, interests } = req.body;
  const user = sampleUsers.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res.json({ success: true, user });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }
});

// Register route
app.post("/register", (req, res) => {
  const { username, password, interests } = req.body;
  if (sampleUsers.some((user) => user.username === username)) {
    res
      .status(400)
      .json({ success: false, message: "Username already exists" });
  } else {
    const newUser = {
      id: sampleUsers.length + 1,
      username,
      password,
      interests,
    };
    sampleUsers.push(newUser);
    res.json({ success: true, user: newUser });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
