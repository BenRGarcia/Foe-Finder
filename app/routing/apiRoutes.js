// Require dependencies
const express = require('express');
const path = require("path");
// Import helper functions
const { allPropsPresent, elemsAreAllType, mapFactory, minValueTupleKey } = require('./utils.js');
// Import database substitute
let foes = require('../data/foes.js');

/**
 *  Data validation:
 *    - Returns true/false if data object is valid
 */
const validateInput = (req, res, next) => {
  // Declare variable, store request body
  const newUser = req.body;
  // Define array of required data object props
  const requiredProps = ["name", "quip", "photo", "scores"]
  // Test data object for presence of all required props
  if (!allPropsPresent(newUser, requiredProps)) {
    const error = new Error(`Request body missing required properties`);
    error.status = 400;
    return next(error);
  }
  // Test 'score' data prop for number type of elements
  if (!elemsAreAllType(newUser.scores, 'number')) {
    const error = new Error(`Property 'scores' array contains incorrect primitive data type. Should be 'number'.`);
    error.status = 400;
    return next(error);
  }
  // Data is valid, go to next middleware in stack
  next();
};

/**
 *  Find most compatible arch enemy
 *    - Returns arch enemy object
 */
const getArchEnemy = (user) => {
  // Simulate database roundtrip
  try {
    return new Promise((resolve, reject) => {

    });
  } catch (err) {
    // Server side err
    console.error(err);
    // Client side error
    const error = new Error(`Query failure, database did not update.`);
    error.status = 500;
    return next(error);
  }
}

// Create router
const apiRouter = express.Router();

// Path: '/api/friends'
apiRouter.route('/')
  .get((req, res, next) => res.json(foes))
  .post(validateInput, (req, res, next) => {
    let newUser = req.body;
    // Simulate database roundtrip
    getArchEnemy(newUser)
      .then( archEnemy => {
        res.send(archEnemy)
      });
  });

// Error handling
apiRouter.use((err, req, res, next) => {
  err = err.status || 500;
  res.status(err).send(err.message);
});

module.exports = apiRouter;
