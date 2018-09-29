import { Content } from './content'

export class With{
    
    private _thing: string
    private _created: string
    private _content: Content
    private _date: string
    private _time: string

    constructor(thing: string, created: string, content: Content, date: string, time: string){
        this._thing = thing
        this._created = created
        this._content = content
        this._date = date
        this._time = time
    }
    public get thing(): string{
        return this._thing
    }
    public get created(): string{
        return this._created
    }
    public get content(): Content{
        return this._content
    }
    public get date(): string{
        return this._date
    }
    public get time(): string{
        return this._time
    }

    public set thing(value: string){
        this._thing = value
    }
    public set created(value: string){
        this._created = value;
    }
    public set content(value: Content){
        this._content = value
    }
    public set date(value: string){
        this._date = value
    }
    public set time(value: string){
        this._time = value
    }

}