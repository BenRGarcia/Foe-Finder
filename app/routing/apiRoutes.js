// Require dependencies
const express = require('express');
// Import helper function
const allPropsPresent = require('./utils.js');
// Import database substitute
let foes = require('../data/foes.js');

/*************************************************************
 * Data validation, 'next()' stack only if data object valid *
 *************************************************************/
const validateInput = (req, res, next) => {
  // For naming convenience/clarity, define prop to store request body
  req.newUser = req.body;
  // Define array of required newUser object props
  const requiredProps = ["name", "quip", "photo", "scores"]
  // Test data object for presence of all required props
  if (!allPropsPresent(req.newUser, requiredProps)) {
    const error = new Error(`Request body has erroneous properties`);
    error.status = 400;
    return next(error);
  }
  // Test 'score' data prop for correct array length
  if (req.newUser.scores.length !== 10) {
    const error = new Error(`Property 'scores' array contains incorrect number of elements. Should have 10.`);
    error.status = 400;
    return next(error);
  }
  // Convert 'body-parsed' string values to numbers
  req.newUser.scores = req.newUser.scores.map(el => parseInt(el));
  // Test 'score' prop for prim data type 'number' of elements
  if (!req.newUser.scores.every(el => typeof el === 'number' && !isNaN(el))) {
    const error = new Error(`Property 'scores' array contains incorrect primitive data type. Should be 'number'.`);
    error.status = 400;
    return next(error);
  }
  // Test 'score' data prop for numbers between specified range
  if (!req.newUser.scores.every(num => num >= 1 && num <= 5)) {
    const error = new Error(`Property 'scores' array contains numbers outside acceptable range`);
    error.status = 400;
    return next(error);
  }
  // Data is valid, go to next middleware in stack
  next();
};

/**************************************************************
 * Find most compatible arch enemy, returns arch enemy object *
 **************************************************************/
const getArchEnemy = (req, res, next) => {
  // Define variable to hold arch enemy
  let archEnemy = [null, Infinity];
  // Iterate over array of foes (imported on line 6)
  foes.forEach(foe => {
    // Iterate over 'scores' array
    let cumulativeDiff = foe.scores.reduce((acc, cur, i) => {
      // Perform compatibility computation
      return Math.abs(cur - req.newUser.scores[i]);
    });
    // Test for lowest cumulative diff
    if (cumulativeDiff < archEnemy[1]) archEnemy = [foe, cumulativeDiff];
  });
  // Add arch enemy to req body
  req.archEnemy = archEnemy[0];
  // Arch enemy found, go to next middleware in stack
  next();
};

/******************************
 * Routing and Error Handling *
 ******************************/

// Create router
const apiRouter = express.Router();

// Path: '/api/friends'
apiRouter.route('/')
  .get((req, res, next) => res.json(foes))
  .post(validateInput, getArchEnemy, (req, res, next) => {
    // Add new user to 'foes' array
    foes.push(req.newUser);
    // Send response object
    res.send(req.archEnemy)
  });

// Client-Side Error handling
apiRouter.use((err, req, res, next) => {
  let status = err.status || 500;
  if (status >= 500) err.message = 'Internal Server Error';
  res.status(status).send({ error: err.message});
});

module.exports = apiRouter;
