const express = require("express");
const router = express.Router();
const path = require("path");

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/index.html"));
  });
  
  router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/exercise.html"));
  });

  router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/stats.html"));
  });

  return router;
}