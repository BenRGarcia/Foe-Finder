// Require dependencies
const express = require('express');
const path = require("path");
let foes = require('../data/foes.js');

// Create router
const apiRouter = express.Router();

// '/api/friends' - GET
apiRouter.get('/', (req, res, next) => {
  res.json(foes);
});

// '/api/friends' - POST
apiRouter.post('/', (req, res, next) => {
  // handle incoming survey results, compatibility logic
});

module.exports = apiRouter;
