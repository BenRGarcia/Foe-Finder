// Require dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Mount middleware
app.use(bodyParser.json());

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
