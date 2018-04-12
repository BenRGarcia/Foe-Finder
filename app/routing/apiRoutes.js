// Require dependencies
const express = require('express');

// Create router
const apiRouter = express.Router();

// '/api/friends' - GET
apiRouter.get('/', (req, res, next) => {
  // display a JSON of all possible friends.
});

// '/api/friends' - POST
apiRouter.post('/', (req, res, next) => {
  // handle incoming survey results, compatibility logic
});

module.exports = apiRouter;
