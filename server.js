const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();
const port = 3000;

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(port, () => {
  console.log(`Launching Note Taker App on port ${port}`);
});
