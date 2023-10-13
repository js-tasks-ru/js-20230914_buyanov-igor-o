class Tooltip {
  static instance;

  constructor() {
    if(Tooltip.instance){
     return Tooltip.instance
    }
    Tooltip.instance = this;
    
  }

  pointeroverHandler = e =>{
    if (e.target.dataset.tooltip) {
      this.render(e.target.dataset.tooltip)
    }
  }

  pointeroutHander = e => {
    if (e.target.dataset.tooltip) {
      this.remove()
    }
  }

  render(str){
    this.element = document.createElement("div")
    this.element.innerHTML = str;
    this.element.className = "tooltip"
    document.body.append(this.element)

  }

  remove(){
    this.element.remove()
  }

  initialize () {
    
    document.body.addEventListener("pointerover", this.pointeroverHandler)
    document.body.addEventListener("pointerout", this.pointeroutHander)

  }

  destroy(){
    this.remove()
    document.body.removeEventListener("pointerover", this.pointeroverHandler)
    document.body.removeEventListener("pointerout", this.pointeroutHander)

  }
}

export default Tooltip;
