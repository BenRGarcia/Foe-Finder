// Require dependencies
const express = require('express');
const path = require("path");
// Import helper functions
const { allPropsPresent, elemsAreAllNums, mapFactory, minValueTupleKey } = require('./utils.js');
// Import database substitute
let foes = require('../data/foes.js');

/*************************************************************
 * Data validation, 'next()' stack only if data object valid *
 *************************************************************/
const validateInput = (req, res, next) => {
  // Declare variable, store request body
  const newUser = req.body;
  // Convert string values to numbers
  newUser.scores = newUser.scores.map(el => parseInt(el));
  console.log(newUser);
  // Define array of required data object props
  const requiredProps = ["name", "quip", "photo", "scores"]
  // Test data object for presence of all required props
  if (!allPropsPresent(newUser, requiredProps)) {
    const error = new Error(`Request body has erroneous properties`);
    error.status = 400;
    return next(error);
  }
  // Test 'score' data prop for correct array length
  if (newUser.scores.length !== 10) {
    const error = new Error(`Property 'scores' array contains incorrect number of elements. Should have 10.`);
    error.status = 400;
    return next(error);
  }
  // Test 'score' data prop for number type of elements
  if (!elemsAreAllNums(newUser.scores)) {
    const error = new Error(`Property 'scores' array contains incorrect primitive data type. Should be 'number'.`);
    error.status = 400;
    return next(error);
  }
  // Data is valid, go to next middleware in stack
  next();
};

/**************************************************************
 * Find most compatible arch enemy, returns arch enemy object *
 **************************************************************/
const getArchEnemy = (user) => {
  // Simulate database roundtrip
  try {
    return new Promise((resolve, reject) => {
      // Create map of [Foe objects, cumulative score difference]
      const foeMap = mapFactory(user, foes, 'scores');
      // Find/return object with lowest score difference
      const archEnemy = minValueTupleKey(foeMap);
      resolve(archEnemy);
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

/******************************
 * Routing and Error Handling *
 ******************************/

// Create router
const apiRouter = express.Router();

// Path: '/api/friends'
apiRouter.route('/')
  .get((req, res, next) => res.json(foes))
  .post(validateInput, (req, res, next) => {
    let newUser = req.body;
    // Simulate database roundtrip
    getArchEnemy(newUser)
      .then(archEnemy => {
        // Add new user to "Database"
        foes.push(newUser);
        // Send response object
        res.send(archEnemy)
      });
  });

// Client-Side Error handling
apiRouter.use((err, req, res, next) => {
  let status = err.status || 500;
  res.status(status).send({ error: err.message});
});

module.exports = apiRouter;
