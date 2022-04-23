const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");


const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
    if (err) throw err
    res.send(data);
  })
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(port, () => {
  console.log(`Launching Note Taker App on port ${port}`);
});
