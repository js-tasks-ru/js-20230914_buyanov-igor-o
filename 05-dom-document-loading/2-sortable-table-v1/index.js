function createElementC(tag_name, class_info=undefined, attrs=undefined){
  const element = document.createElement(tag_name)
  if(class_info)
  {
    if(class_info instanceof Array){
      element.classList.add(...class_info);
    } else{
      element.className = class_info;
    }
  }

  if(attrs){
    for (const [key, value] of Object.entries(attrs)) {
      element.setAttribute(key, value)
    }
  }
  return element
}

function templateToElement(template){
  const element = document.createElement("div");
  element.innerHTML = template;
  return element.firstElementChild;
}

function sortStrings(arr, field, param = 'asc') {

  if (param === "asc") 
  {
      return arr.sort((a,b) => a[field].localeCompare(b[field], ["ru", "en"], {"caseFirst": "upper"}))
  }
  else {
      return arr.sort((a,b) => a[field].localeCompare(b[field], ["ru", "en"]) * -1)
  } 
}

function sortNumber(arr, field, param='asc'){
  if (param === "asc")
  {
    return arr.sort((a, b) => {return a[field] - b[field];});
  } else{
    return arr.sort((a, b) => {return b[field] - a[field];});
  }
}

export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = [...headerConfig]
    this.data = [...data]
    this.imgCellTemplate = headerConfig[0].template

    this.sortTypeMap = new Map()
    for(let a of headerConfig){
      if(a.sortable){
        this.sortTypeMap[a.id] = a.sortType
      }
    }

    this.cellNames = new Array;
    this.headerConfig.forEach((elem) => {this.cellNames.push(elem.id)})

    this.element = createElementC("div", "products-list__container", {"data-element": "productsContainer"});
    this.createHeaderElemet()
    this.createBodyTableElement()
  }

  sort(field, method){
    if(this.sortTypeMap[field] == "string"){
      sortStrings(this.data, field, method)
    }
    else{
      sortNumber(this.data, field, method)
    }
    const tableBody = this.element.getElementsByClassName("sortable-table__body")[0];
    tableBody.remove();
    this.createBodyTableElement();

  }

  headerCellTemplate(data){
    let forSortableCellTemplate = '';
    if(data.title == "Name"){
      forSortableCellTemplate = `<span data-element="arrow" class="sortable-table__sort-arrow">
      <span class="sort-arrow"></span>
    </span>`
    }

    return `
    <div class="sortable-table__cell" data-id="${data.id}" data-sortable="${data.sortable}">
        <span>${data.title}</span>
        ${forSortableCellTemplate}
    </div>`
  }

  createHeaderElemet(){
    const headerRoot = createElementC("div", ["sortable-table__header", "sortable-table__row"], {"data-element" : "header"})
    for(let colHead of this.headerConfig){
      headerRoot.append(templateToElement(this.headerCellTemplate(colHead)))
    }
    this.element.append(headerRoot)
  }

  createTableRowElement(data){
    const rootAElement = createElementC("a", "sortable-table__row", {"href": `"/products/${data.id}"`})

    let currElement;

    for(let cName of this.cellNames){
      if(cName == "images"){
        currElement = templateToElement(this.imgCellTemplate(data.images))
      } else{
        currElement = createElementC("div", "sortable-table__cell")
        currElement.innerHTML = data[cName]
      }

      rootAElement.append(currElement)
    }
    return rootAElement;
  }

  createBodyTableElement(){

    const bodyElement = createElementC("div", "sortable-table__body", {"data-element" : "body"})
    for(let rowData of this.data){
      bodyElement.append(this.createTableRowElement(rowData))
    }
    this.subElements = {"body": bodyElement}
    this.element.append(bodyElement)
  }

  remove(){
    this.element.remove()
  }

  destroy(){
    this.remove()
  }
}

