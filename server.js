// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");

dotenv.config({
  path: "./config.env",
});
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/getdata", (req, res) => {
  try {
    // Read the data from a file
    const data = JSON.parse(fs.readFileSync("data.json", "utf8"));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error reading data file." });
  }
});

app.post("/updatedata", (req, res) => {
  try {
    const newData = req.body;

    // Read the existing data from a file
    const existingData = JSON.parse(fs.readFileSync("data.json", "utf8"));

    // Push the new data object into the existing data array
    existingData.push(newData);

    // Write the updated data array back to the file
    fs.writeFileSync("data.json", JSON.stringify(existingData, null, 2));

    res.json(existingData);
  } catch (error) {
    res.status(500).json({ error: "Error updating data file." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
