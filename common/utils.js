export const createElement = (tagName, properties) => 
    Object.assign(document.createElement(tagName), properties);

export function createElementByTemplate(template){
  const element = document.createElement("div");
  element.innerHTML = template;
  return element.firstElementChild;
}

export function sortStrings(arr, field, param = 'asc') {

  if (param === "asc") 
  {
      return arr.sort((a,b) => a[field].localeCompare(b[field], ["ru", "en"], {"caseFirst": "upper"}))
  }
  else {
      return arr.sort((a,b) => a[field].localeCompare(b[field], ["ru", "en"]) * -1)
  } 
}

export function sortNumber(arr, field, param='asc'){
  if (param === "asc")
  {
    return arr.sort((a, b) => {return a[field] - b[field];});
  } else{
    return arr.sort((a, b) => {return b[field] - a[field];});
  }
}