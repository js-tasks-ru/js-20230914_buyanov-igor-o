import { sortNumber, sortStrings, createElement, createElementByTemplate } from "../../common/utils";


export default class SortableTable {
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    this.headerConfig = [...headersConfig]
    this.data = [...data]
    this.imgCellTemplate = headersConfig[0].template

    this.prepareSortData();
    
    this.render();

    this.currentSortedHeader;
    this.sort(sorted.id, sorted.order)
  }
  
  prepareSortData(){

    this.sortTypeMap = new Map()
    for(let a of this.headerConfig){
      if(a.sortable){
        this.sortTypeMap[a.id] = a.sortType
      }
    }

    this.sortMethodMap = {
      "string" : sortStrings,
      "number" : sortNumber
    }
  }

  render(){

    this.cellNames = [];
    this.headerConfig.forEach((elem) => {this.cellNames.push(elem.id)})

    this.element = createElement("div", {"className": "products-list__container", "data-element": "productsContainer"});
    
    this.subElements = {"header": this.createHeaderElemet(),
                        "body": this.createBodyTableElement()};
  }

  sort(field, direction){
    this.sortMethodMap[this.sortTypeMap[field]](this.data, field, direction)
    this.subElements.body.remove();
    this.subElements.body = this.createBodyTableElement();
    
    const cellIndex = this.headerConfig.findIndex(obj => obj.id === field);
    const headerCell = this.subElements.header.children[cellIndex]
    
    if(this.currentSortedHeader){
      this.currentSortedHeader.removeAttribute("data-order")
      this.currentSortedHeader.lastElementChild.remove()
    }
    headerCell.setAttribute("data-order", direction)
    headerCell.append(createElementByTemplate(`<span data-element="arrow" class="sortable-table__sort-arrow">
    <span class="sort-arrow"></span>
  </span>`))
    this.currentSortedHeader = headerCell

  }

  createHeaderCellByTemplate(data){
    return `
    <div class="sortable-table__cell" data-id="${data.id}" data-sortable="${data.sortable}">
        <span>${data.title}</span>
    </div>`
  }

  createHeaderElemet(){
    const headerRoot = createElement("div", {"className": "sortable-table__header sortable-table__row", "data-element" : "header"})
    let currHeaderElement = undefined;
    for(let colHead of this.headerConfig){
      currHeaderElement = createElementByTemplate(this.createHeaderCellByTemplate(colHead))
      headerRoot.append(currHeaderElement)
      if(colHead.sortable){
        currHeaderElement.addEventListener("pointerdown", this.titleClickHandler)
      }
    }
    this.element.append(headerRoot)
    return headerRoot
  }

  titleClickHandler = e => {
    
    const { id, order } = e.currentTarget.dataset;

    if(!order){
      this.sort(id, "desc")
    } else if(order == "desc"){
      this.sort(id, "asc")
    } else{
      this.sort(id, "desc")
    }
  }

  createTableRowElement(data){
    const rootAElement = createElement("a", { "className": "sortable-table__row", "href": `"/products/${data.id}"`})

    let currElement;

    for(let cName of this.cellNames){
      if(cName == "images"){
        currElement = createElementByTemplate(this.imgCellTemplate(data.images))
      } else{
        currElement = createElement("div", {"className": "sortable-table__cell"})
        currElement.innerHTML = data[cName]
      }

      rootAElement.append(currElement)
    }
    return rootAElement;
  }

  createBodyTableElement(){

    const bodyElement = createElement("div", {"className": "sortable-table__body", "data-element" : "body"})
    for(let rowData of this.data){
      bodyElement.append(this.createTableRowElement(rowData))
    }
    this.element.append(bodyElement)
    return bodyElement

  }

  remove(){
    this.element.remove()
    this.subElements = {};
  }

  destroy(){
    this.remove()
  }
}
