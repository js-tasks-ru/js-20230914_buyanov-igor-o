/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {

  let new_obj = []
  
  for (const [key, value] of Object.entries(obj)) {
    if (fields.includes(key)) new_obj.push([key, value])
  }
  return Object.fromEntries(new_obj)

};