export default class NotificationMessage {
    static existingInstance;

    constructor(text, config){
        this.text = text
        this.duration = config?.duration
        this.type = config?.type
        if(NotificationMessage.existingInstance){
            NotificationMessage.existingInstance.destroy()
        }
        this.element = document.createElement("div")
        NotificationMessage.existingInstance = this
        this.insert(this.element)
    }

    innerTemplate(headElement){
        const rootElement = document.createElement("div")
        rootElement.className = "timer"
        const innerWrapperElement = document.createElement("div")
        innerWrapperElement.className = "inner-wrapper"

        innerWrapperElement.innerHTML = `<div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.text}
          </div>
        </div>`
        
        headElement.append(rootElement)
        headElement.append(innerWrapperElement)
    }

    insert(divElement){
        divElement.classList.add("notification")
        divElement.classList.add(this.type)
        divElement.setAttribute("style", `--value:${this.duration/1000}s`)
        this.innerTemplate(divElement)

    }

    show(customDivElement){

        if(customDivElement){
            this.insert(customDivElement)
            this.element = customDivElement
        }
        document.getElementsByTagName("body")[0].append(this.element)
        this.timer = setTimeout(() => {this.remove()}, this.duration)
    }

    remove(){
        this.element.remove()
    }

    destroy(){
        this.remove()
        this.timer = null
    }

}
