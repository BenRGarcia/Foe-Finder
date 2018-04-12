// Require dependencies
const express = require('express');
const path = require("path");

// Create router
const htmlRouter = express.Router();

// '/' route - GET
htmlRouter.get("/", function (req, res) {
  console.log(`GET at path: '/'`);
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

// '/survey' route - GET
htmlRouter.get("/survey", function (req, res) {
  console.log(`GET at path '/survey'`);
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});

htmlRouter.get("*", function (req, res) {
  console.log(`REDIRECTED`);
  res.status(301).redirect('/');
});

module.exports = htmlRouter;
