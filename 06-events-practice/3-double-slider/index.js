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

export default class DoubleSlider {

    constructor(config){
        this.min = config?.min
        this.max = config?.max
        this.selected = config?.selected
        this.formatValue = config?.formatValue
        this.leftThumbPos = 0;
        this.rightThumbPos = 0;
        this.element;

        this.render();
        this.element.addEventListener("pointermove", this.movementHandler)
        this.element.addEventListener("pointerdown", this.pointerdownHandler)
        this.element.addEventListener("pointerup", this.pointerupHandler)
    }

    sliderTemplate(){
        let min = this.formatValue(this.min), max = this.formatValue(this.max), left = 0, right = 0;
        if(this.selected){
            left = this.getPercentage(this.selected.from, this.min, this.max)
            right = this.getPercentage(this.selected.to, this.min, this.max)
            this.leftThumbPos = left;
            this.rightThumbPos = right;
            min = this.formatValue(this.selected.from)
            max = this.formatValue(this.selected.to)
        }
        return `
        <div class="range-slider">
            <span data-element="from">${min}</span>
            <div class="range-slider__inner">
            <span class="range-slider__progress" style="left: ${left}%;right: ${right}%"></span>
            <span class="range-slider__thumb-left" style="left: ${left}%"></span>
            <span class="range-slider__thumb-right" style="right: ${right}%"></span>
            </div>
            <span data-element="to">${max}</span>
        </div>
        `
    }

    getSliderBounds(){
      const progressElement = this.element.getElementsByClassName("range-slider__inner")[0]
      const {x, width} = progressElement.getBoundingClientRect()
      this.leftBound = x
      this.rightBound = x + width
      if(!x || ! width){
        this.leftBound = 0;
        this.rightBound = 1000;
      }
    }

    getPercentage(curP, leftB, rightB){
      return Number(((curP - leftB) * 100 / (rightB - leftB)).toFixed(0))
    }

    getNumber(pec, leftB, rightB){
      return Number(((rightB - leftB) * pec / 100 + leftB).toFixed(0))
    }

    movementHandler = e =>
    {
      if(this.isPointerPressed)
      {     
        const {el, direction} = this.currentThumb
        const currPos = e.clientX
        let newPos = this.getPercentage(currPos, this.leftBound, this.rightBound)
        let span;
        if(direction == "left"){
          newPos = newPos >= 0 ? newPos: 0;
          newPos = newPos <= (100 - this.rightThumbPos) ? newPos: (100 - this.rightThumbPos);
          this.leftThumbPos = newPos;
          span = this.element.querySelector('[data-element="from"]');
          span.textContent = this.formatValue(this.getNumber(newPos, this.min, this.max))
          this.selected.from = this.getNumber(newPos, this.min, this.max)

        } else {
          newPos = 100 - newPos;
          newPos = newPos >= 0 ? newPos: 0;
          newPos = newPos <= (100 - this.leftThumbPos) ? newPos: (100 - this.leftThumbPos);
          this.rightThumbPos = newPos;
          span = this.element.querySelector('[data-element="to"]');
          span.textContent = this.formatValue(this.getNumber(100 - newPos, this.min, this.max))
          this.selected.to = this.getNumber(100 - newPos, this.min, this.max)
        }
        
        el.style[direction] = `${newPos}%`

        const progressElement = this.element.getElementsByClassName("range-slider__progress")[0]
        progressElement.style[direction] = `${newPos}%`
      }
          
    }

    pointerdownHandler = e =>
    {
      this.getSliderBounds()
        this.isPointerPressed = true;
        if(e.target.classList.contains("range-slider__thumb-left")){
          this.currentThumb = {el: e.target, direction: "left"}
        }
        else if(e.target.classList.contains("range-slider__thumb-right")){
          this.currentThumb = {el: e.target, direction: "right"}
        }
    }

    pointerupHandler = e =>
    {
      
      this.isPointerPressed = false;
      this.currentThumb = null;
      this.element.dispatchEvent(new CustomEvent("range-select", {detail: this.selected}));
    }

    render(){
        this.element = templateToElement(this.sliderTemplate())
        
    }

    remove(){
        this.element.remove()
    }

    destroy(){
        this.remove()
    }

}
