/**
 *  Returns true/false if elements of array are exact props of an object
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

module.exports = allPropsPresent;
