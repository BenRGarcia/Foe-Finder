// Require dependencies
const express = require('express');
const path = require("path");
let foes = require('../data/foes.js');

// Return true/false if new foe has all required properties
const isValid = (newFoe) => {
  const requiredProps = ["name", "quip", "photo", "scores"];
  const foeProps = Object.keys(newFoe);
          // Correct number of props
  return foeProps.length === requiredProps.length && 
          // All required props present
         foeProps.every(prop => requiredProps.indexOf(prop) !== -1) &&
          // 'scores' property is correct length
         newFoe.scores.length === 10;
};

// Determine arch enemy
const findArchEnemy = (newFoe) => {
  const answers = newFoe.scores;
  // Iterate over all foes
  // perform mathematical sum of abs val of difference of each element between arrays
  // store in new Map [<score diff>, <index of foe> ]
  
  // Return foe object that has the most compatibility
}

// Create router
const apiRouter = express.Router();

// Path: '/api/friends'
apiRouter.route('/')
  .get((req, res, next) => res.json(foes))
  .post((req, res, next) => {
    let newFoe = req.body;
    if (isValid(newFoe)) {
      
    }
  });

module.exports = apiRouter;
