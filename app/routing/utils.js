/**
 *  Returns true/false if elements of array are all props of an object
 */
const allPropsPresent = (obj, reqPropsArray) => {
  // Create an array of object properties
  const objProps = Object.keys(obj);
  // Ensure exact number of props required actually exist
  if (objProps.length !== reqPropsArray.length) return false;
  // Ensure each prop is present in the object
  if (!objProps.every(prop => reqPropsArray.indexOf(prop) !== -1)) return false;
  // Ensure each property's value is not null or undefined
  if (!objProps.every(prop => obj[prop] !== null || undefined)) return false;
  // Return 'true', object properties match exactly with passed in array
  return true;
}

/**
 *  Returns true/false if all elements of an array are a specified type
 */
const elemsAreAllType = (arr, type) => {
  return arr.every(el => typeof el === type);
}

/**
 *  Returns map object of [ [<obj>, <cumulative diff of prop elements>], [ ... , ... ], ... ]
 */
const mapFactory = (ctrlObj, objArray, prop) => {
  // Create new weak map for object/value pairs ('weak' for garbage collection)
  const objDiffMap = new WeakMap();
  // Iterate over objects in objArray
  objArray.forEach(obj => {
    // Reduce each objects 'prop' array into cumulative difference of control obj array
    const cumulativeDiff = obj.prop.reduce((acc, cur, i, arr) => {
      return Math.abs(cur - ctrlObj.prop[i]);
    }, 0);
    // Add tuple to weakmap
    objDiffMap.set(obj, cumulativeDiff);
  });
  // Return new map to caller
  return objDiffMap;
};

/**
 *  Iterates over a Map object, returns the key of the lowest tuple value
 */
const minValueTupleKey = (mapObj) => {
  // Define variable to hold 'key' of tuple with the highest value
  let minValueTuple = [null, Infinity];
  // Iterate over tuples in mapObj
  for (let [key, value] of mapObj) {
    if (value < minValueTuple[1]) {
      minValueTuple = [key, value];
    }
  }
  return minValueTuple[0];
}

module.exports = {
  allPropsPresent,
  elemsAreAllType,
  minValueTupleKey
};
