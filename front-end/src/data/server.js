import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Helpers to handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// File path to the JSON file
const filePath = path.join(__dirname, "data.json");

// API endpoint to register user
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file." });
    }
    let jsonData = JSON.parse(data);
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "customer",
    };
    jsonData.user.push(newUser);
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing data file." });
      }
      res
        .status(201)
        .json({ message: "User registered successfully.", newUser });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
