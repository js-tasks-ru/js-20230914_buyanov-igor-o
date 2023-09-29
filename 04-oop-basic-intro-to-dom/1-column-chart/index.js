const defaultParams = {
    
}
export default class ColumnChart {
    constructor(cfg){
        this.link = cfg?.link
        this.data = cfg?.data
        this.value = cfg?.value
        this.label = cfg?.label
        this.formatHeadig_fn = cfg?.formatHeading

        this.chartHeight = 50
        this.element = document.createElement("div");
        this.render()
    }

    MakeChartBars(arr){
        let div = document.createElement('div');

        div.className = "column-chart__chart";
        div.setAttribute("data-element", "body")
        const maxValue = Math.max(...arr)
        const scale = this.chartHeight / maxValue
        for(let d of arr){
            let el = document.createElement("div")
            el.setAttribute("style", `--value: ${String(Math.floor(d * scale))}`)
            el.setAttribute("data-tooltip", `${(d/maxValue*100).toFixed(0)}%`)
            div.append(el)
        }
        return div;
    }

    MakeChartHeader(){
        let head_div = document.createElement("div");
        head_div.className = "column-chart__header"
        head_div.setAttribute("data-element", "header")

        if(this.formatHeadig_fn){
            head_div.innerHTML = this.formatHeadig_fn(this.value)
        } else {
            head_div.innerHTML = this.value
        }
        return head_div;
    }

    MakeChartContainer(){
        let container_div = document.createElement("div");
        container_div.append(this.MakeChartHeader())
        container_div.className = "column-chart__container";

        if(this.data){
            if(this.data.length > 0){
                container_div.append(this.MakeChartBars(this.data))
                this.element.classList.remove("column-chart_loading")
                return container_div
            }
        }
        return container_div
    }

    update(new_arr){
        this.element.classList.remove("column-chart_loading")
        let container_div = this.element.getElementsByClassName("column-chart__container")[0]
        let chart_div = this.element.getElementsByClassName("column-chart__chart")[0]
        chart_div.remove()
        container_div.append(this.MakeChartBars(new_arr))
    }

    render(){
        this.element.classList.add("column-chart", "column-chart_loading")

        let title_div = document.createElement("div")
        title_div.className = "column-chart__title"
        if (this.label){
            title_div.innerHTML = `Total ${this.label}`
        } else {
            title_div.innerHTML = "Unknown"
        }

        if(this.link)
        {
            let link = document.createElement("a")
            link.className = "column-chart__link"
            link.href = this.link
            link.innerHTML = "View all"
            title_div.append(link)
        }

        this.element.append(title_div)
        
        this.element.append(this.MakeChartContainer())
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
