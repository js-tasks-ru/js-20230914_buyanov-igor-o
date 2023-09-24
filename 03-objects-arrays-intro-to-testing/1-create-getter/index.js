/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const key_seq = path.split(".")
    return function (obj){
        let copy_obj = {...obj};
        for(let k of key_seq)
        {
            if(!copy_obj.hasOwnProperty(k))
            {
                return undefined
            }
            copy_obj = copy_obj[k]
        }
        return copy_obj
    }   

}