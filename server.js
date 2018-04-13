// Require dependencies
const express = require('express');

// Instantiate server
const app = express();

// Mount middleware (Middleware based on body-parser is available in Express v4.16.0 onwards.)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
app.use('/', htmlRouter);

/****************
 * Start server *
 ****************/

// Start server
app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
