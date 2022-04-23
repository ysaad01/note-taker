const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");


const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

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

app.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    let notesArray = JSON.parse(data);
    let newNote = req.body;
    newNote.id = uuidv4();
    notesArray.push(newNote);

    fs.writeFile(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify(notesArray),
      (err) => {
        if (err) throw err;
        res.json(newNote);
      }
    );
  });
});

app.delete("/api/notes/:id", (req, res) => {
  console.log("req.params", req.params);
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    let notesArray = JSON.parse(data);
    const filteredNotes = notesArray.filter(
      (note) => note.id !== req.params.id
    );

    fs.writeFile(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify(filteredNotes),
      (err) => {
        if (err) throw err;
        res.send("Note has been deleted!");
      }
    );
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(port, () => {
  console.log(`Launching Note Taker App on port ${port}`);
});
