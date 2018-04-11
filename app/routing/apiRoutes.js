// Require dependencies
const express = require('express');
// Create router
const apiRouter = express.Router();

// '/api/friends - GET
apiRouter.get('/', (req, res, next) => {
  // This will be used to display a JSON of all possible friends.
});

// '/api/friends' - POST
apiRouter.post('/', (req, res, next) => {
  // will be used to handle incoming survey results, handle the compatibility logic
});

module.exports = apiRouter;
