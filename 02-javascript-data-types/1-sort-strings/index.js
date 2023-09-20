/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */


export function sortStrings(arr, param = 'asc') {
    let new_arr = arr.map((x) => x);

    if (param === "asc") 
    {
        return new_arr.sort((a,b) => a.localeCompare(b, ["ru", "en"], {"caseFirst": "upper"}))
    }
    else if ((param === "desc")){
        return new_arr.sort((a,b) => a.localeCompare(b, ["ru", "en"]) * -1)
    } 
    else{
        console.log("Only \'desc\' and \'asc\' are allowed as a param. Return Nan")
        return NaN
    }
}
