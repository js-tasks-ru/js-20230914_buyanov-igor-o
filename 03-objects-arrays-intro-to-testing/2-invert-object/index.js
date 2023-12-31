/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {

    if (typeof(obj) == "undefined")
    {
        return;
    }
    
    const newObj = {};

    for(let key in obj)
    {
        newObj[obj[key]] = key
    }
    return newObj

}

console.log(invertObj())