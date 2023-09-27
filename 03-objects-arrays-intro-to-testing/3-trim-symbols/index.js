/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {

    let new_string = "";
    let counter = 0;

    for (let i = 0; i < string.length; i++) {
        if(string[i] == string[i-1] || counter == 0){
            counter += 1
        }
        else{
            if(counter > size) counter = size;
            new_string += string[i-1].repeat(counter);
            counter = 1
        }
      }      
      if(counter > size) counter = size;
      new_string += string.slice(-1).repeat(counter);
      return new_string;
}