// Require dependencies
const express = require('express');
const path = require("path");
// Import helper functions
const { allPropsPresent, elemsAreAllType, minValueTupleKey } = require('./utils.js');
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

/** (This function is still under construction...)
 *  Find most compatible arch enemy
 *    - Returns arch enemy object
 */
const getArchEnemy = (user) => {
  // Simulate database roundtrip
  try {
    return new Promise((resolve, reject) => {
      // Create weakMap?
      // Get user scores
      // Map 
    });
  } catch (err) {
    // Server side err
    console.error(err);
    // Client side error
    const error = new Error(`Query failure, database did not update.`);
    error.status = 500;
    return next(error);
  }

  // Extract answer array from object
  const scores = user.scores;
  // Declare map to store aggregate results: [ [<index of foe>, <score>], [...], ... ]
  let foeMap = new Map();
  // Iterate over all foes
  for (let indexOfFoe = 0; indexOfFoe < foes.length; indexOfFoe++) {
    // Declare counter
    let cumulativeScore = 0;
    // Iterate over scores
    for (let indexOfScore = 0; indexOfScore < scores.length; indexOfScore++) {
      // perform mathematical sum of abs val of difference of matched element between arrays
      cumulativeScore += Math.abs(scores[indexOfScore] - foes[indexOfFoe].score[indexOfScore]);
    }
    // Add to Map [<index of foe>, <score diff>]
    foeMap.set(indexOfFoe, cumulativeScore);
  }
  // Return foe object that has the most compatibility
  return foes[keyOfHighestValue(foeMap)];
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
