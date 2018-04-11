// Require dependencies
var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
// Instantiate express app
var app = express();
app.use(bodyParser.text());
// Define port
var PORT = 8080;

/*****************
 * Define routes *
 ****************/

// 'Home' route -GET
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

// 'Survey' route - GET
app.get("/survey", function (req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

// 'Survey' route - POST
app.post("/survey", function (req, res) {
  // do something...
});

// Wildcard route, redirect to home page
app.get("*", function (req, res) {
  res.redirect('/');
});

/****************
 * Start server *
 ****************/

// ANSI Bash Formatting
let bold = '\x1B[1m', blueBG = '\x1B[44m', reset = '\x1B[0m';
// Server listen on PORT
app.listen(PORT, () => console.log(`Server listening at: ${bold}${blueBG} localhost:${PORT} ${reset}`));
