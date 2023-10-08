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
        this.config = config
        this.element;
        this.isPointerPressed = false;
        this.render();
        this.element.addEventListener("pointermove", this.movementHandler)
        this.element.addEventListener("pointerdown", this.pointerdownHandler)
        this.element.addEventListener("pointerup", this.pointerupHandler)
    }

    sliderTemplate(data){
        let min, max;
        if(data.selected){
            min = data.formatValue(data.selected.from)
            max = data.formatValue(data.selected.to)
        } else {
            min = data.formatValue(data.min)
            max = data.formatValue(data.max)
        }
        return `
        <div class="range-slider">
            <span data-element="from">${min}</span>
            <div class="range-slider__inner">
            <span class="range-slider__progress"></span>
            <span class="range-slider__thumb-left"></span>
            <span class="range-slider__thumb-right"></span>
            </div>
            <span data-element="to">${max}</span>
        </div>
        `
    }

    movementHandler = e =>
    {
        if(this.isPointerPressed)
        {
            console.log(e.clientX)
        }
    }

    pointerdownHandler = e =>
    {
        this.isPointerPressed = true;
    }

    pointerupHandler = e =>
    {
        this.isPointerPressed = false;
    }

    render(){
        this.element = templateToElement(this.sliderTemplate(this.config))
    }

    remove(){
        this.element.remove()
    }

    destroy(){
        this.remove()
    }

}
