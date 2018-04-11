// Require dependencies
const express = require('express');
// Create router
const htmlRouter = express.Router();

// 'Home' route - GET
htmlRouter.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

// 'Survey' route - GET
htmlRouter.get("/survey", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});

// Wildcard route, redirect to home page
htmlRouter.get("*", function (req, res) {
  res.status(301).redirect('/');
});

module.exports = htmlRouter;