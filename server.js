// Require dependencies
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');

// Instantiate server
const app = express();

// Mount middleware
app.use(bodyParser.json());

// Define port
const PORT = process.env.PORT || 3000;

/****************************
 * Import and mount routers *
 ****************************/

// API Route
const apiRouter = require('./app/routing/apiRoutes.js');
app.use('/api/friends', apiRouter);

// HTMl Route
const htmlRouter = require('./app/routing/htmlRoutes.js');
app.use('*', htmlRouter);

/****************
 * Start server *
 ****************/

// ANSI Bash Formatting
let bold = '\x1B[1m', blueBG = '\x1B[44m', reset = '\x1B[0m';
// Start server
app.listen(PORT, () => console.log(`Server listening at: ${bold}${blueBG} localhost:${PORT} ${reset}`));
