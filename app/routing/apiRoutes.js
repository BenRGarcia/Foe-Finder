// Require dependencies
const express = require('express');
const path = require("path");
let foes = require('../data/foes.js');

// Return true/false if new foe has all required properties
const isValid = (newFoe) => {
  const requiredProps = ["name", "quip", "photo", "scores"];
  const foeProps = Object.keys(newFoe);
  /**
   *  This input validation is unsophisticated, need to refactor
   */
          // Correct number of props
  return foeProps.length === requiredProps.length && 
          // All required props present
         foeProps.every(prop => requiredProps.indexOf(prop) !== -1) &&
          // 'scores' array is correct length
         newFoe.scores.length === 10 &&
          // All elements of 'scores' are numbers
         newFoe.scores.every( score => typeof score === "number");
};

// Determine arch enemy
const archEnemy = (newFoe) => {
  // Extract answer array from object
  const answers = newFoe.scores;
  // Declare map to store aggregate results: [ [<index of foe>, <score>], [...], ... ]
  let foeMap = new Map();
  // Iterate over all foes
  for (let indexOfFoe = 0; indexOfFoe < foes.length; indexOfFoe++) {
    // Declare counter
    let cumulativeScore = 0;
    // Iterate over scores
    for (let indexOfScore = 0; indexOfScore < answers.length; indexOfScore++) {
      // perform mathematical sum of abs val of difference of matched element between arrays
      cumulativeScore += Math.abs( answers[indexOfScore] - foes[indexOfFoe].score[indexOfScore] );
    }
    // Add to Map [<index of foe>, <score diff>]
    foeMap.set(indexOfFoe, cumulativeScore);
  }
  // Return foe object that has the most compatibility
  return foes[keyOfHighestValue(foeMap)];
}

// Returns the 'value' of the mathematically greatest key in a map
const keyOfHighestValue = (map) => {
  let highValue;
  for (true) {

  }
  // Return Map's value of high key
  return key;
}

// Create router
const apiRouter = express.Router();

// Path: '/api/friends'
apiRouter.route('/')
  .get((req, res, next) => res.json(foes))
  .post((req, res, next) => {
    let newFoe = req.body;
    if (isValid(newFoe)) res.send(archEnemy(newFoe))
    else res.status(400).send();
  });

module.exports = apiRouter;
