class Tooltip {
  static instance;

  constructor() {
    if(Tooltip.instance){
     return Tooltip.instance
    }
    Tooltip.instance = this;
    this.bodyElement = document.getElementsByTagName("body")[0]
    
  }

  pointeroverHandler = e =>{
    if (e.target.dataset.tooltip != undefined) {
      this.render(e.target.dataset.tooltip)
    }
  }

  pointeroutHander = e => {
    if (e.target.dataset.tooltip != undefined) {
      this.remove()
    }
  }

  render(str){
    this.element = document.createElement("div")
    this.element.innerHTML = str;
    this.element.className = "tooltip"
    this.bodyElement.append(this.element)

  }

  remove(){
    this.element.remove()
  }

  initialize () {
    
    this.bodyElement.addEventListener("pointerover", this.pointeroverHandler)
    this.bodyElement.addEventListener("pointerout", this.pointeroutHander)

  }

  destroy(){
    this.element.remove()
    this.bodyElement.removeEventListener("pointerover", this.pointeroverHandler)
    this.bodyElement.removeEventListener("pointerout", this.pointeroutHander)

  }
}

export default Tooltip;
