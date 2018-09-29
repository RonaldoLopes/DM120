export class Content{
    private temp: string = "0"

    private lux: string = "0"

    private status: string = ""

    private touch: string = ""

    private active: string = "false"


    constructor(temp: string, lux: string, status: string, touch: string, active: string ){
        this.temp = temp
        this.lux = lux
        this.status = status
        this.touch = touch
        this.active = active
    }

    public getActive():string{
        return this.active
    }

    public getTouch():string{
        return this.touch
    }

    public getStatus():string{
        return this.status
    }
    
    public getTemp():string{
        return this.temp
    }

    public getLux():string{
        return this.lux
    }

    public setStatus(status: string){
        this.status = status
    }

    public setActive(active: string){
        this.active = active
    }
    public setTouch(touch: string){
        this.touch = touch
    }

    public setTemp(temp: string){
        this.temp = temp
    }

    public setLux(lux: string){
        this.lux = lux
    }

}