/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */


export function sortStrings(arr, param = 'asc') {
    let new_arr = [...arr]

    if (param === "asc") 
    {
        return new_arr.sort((a,b) => a.localeCompare(b, ["ru", "en"], {"caseFirst": "upper"}))
    }
    else {
        return new_arr.sort((a,b) => a.localeCompare(b, ["ru", "en"]) * -1)
    } 
}
