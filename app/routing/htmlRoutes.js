// Require dependencies
const express = require('express');
const path = require("path");

// Create router
const htmlRouter = express.Router();

htmlRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

htmlRouter.get("/survey", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});

htmlRouter.get("*", (req, res, next) => {
  res.status(301).redirect('/');
});

module.exports = htmlRouter;
