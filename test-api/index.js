const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 3001;

app.get("/data", async (req, res) => {
  try {
    const dataPath = path.join(__dirname, "data.json");
    const fileData = await fs.readFile(dataPath, "utf-8");
    const jsonData = JSON.parse(fileData);
    res.json(jsonData);
  } catch (err) {
    console.error("Error reading JSON file:", err);
    res.status(500).json({ error: "Failed to read JSON data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
