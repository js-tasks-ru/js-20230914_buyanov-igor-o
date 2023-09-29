export default class ColumnChart {
    constructor(config){
        this.link = config?.link
        this.data = config?.data
        this.value = config?.value
        this.label = config?.label
        this.formatHeadig = config?.formatHeading

        this.chartHeight = 50
        this.element = document.createElement("div");
        this.render()
    }

    makeChartBarsElement(dataArr){
        const divElement = document.createElement('div');

        divElement.className = "column-chart__chart";
        divElement.setAttribute("data-element", "body")
        const maxValue = Math.max(...dataArr)
        const scale = this.chartHeight / maxValue

        for(let val of dataArr){
            let el = document.createElement("div")
            el.setAttribute("style", `--value: ${String(Math.floor(val * scale))}`)
            el.setAttribute("data-tooltip", `${(val/maxValue*100).toFixed(0)}%`)
            divElement.append(el)
        }
        return divElement;
    }

    makeChartHeaderElement(){
        const headElement = document.createElement("div");
        headElement.className = "column-chart__header"
        headElement.setAttribute("data-element", "header")

        headElement.innerHTML = this.formatHeadig ? this.formatHeadig(this.value) : this.value;
        return headElement;
    }

    makeChartContainerElement(){
        const containerElement = document.createElement("div");
        containerElement.append(this.makeChartHeaderElement())
        containerElement.className = "column-chart__container";

        if(this.data){
            if(this.data.length > 0){
                containerElement.append(this.makeChartBarsElement(this.data))
                this.element.classList.remove("column-chart_loading")
                return containerElement
            }
        }
        return containerElement
    }

    update(newDataArr){
        this.element.classList.remove("column-chart_loading")
        const container_div = this.element.getElementsByClassName("column-chart__container")[0]
        const chart_div = this.element.getElementsByClassName("column-chart__chart")[0]
        chart_div.remove()
        container_div.append(this.makeChartBarsElement(newDataArr))
    }

    render(){
        this.element.classList.add("column-chart", "column-chart_loading")

        const titleElement = document.createElement("div")
        titleElement.className = "column-chart__title"
        titleElement.innerHTML = this.label ? `Total ${this.label}` : "Unknown";

        if(this.link)
        {
            const link = document.createElement("a")
            link.className = "column-chart__link"
            link.href = this.link
            link.innerHTML = "View all"
            titleElement.append(link)
        }

        this.element.append(titleElement)
        this.element.append(this.makeChartContainerElement())
    }

    destroy(){
        this.remove()
    }

    remove(){
        if (this.element != null){
            this.element.remove()
        }
    }

}
