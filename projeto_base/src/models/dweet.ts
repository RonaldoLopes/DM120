import { With } from './with'

export class Dweet{
    private _this: string
    private _by: string
    private _the: string
    private _with: Array<With>

    constructor(_this: string, by: string, the: string, _with: Array<With>){
        this._this = this._this
        this._by = by
        this._the = the
        this._with = _with
    }

    public get this(): string{
        return this._this
    }
    public get by(): string{
        return this._by
    }
    public get the(): string{
        return this._the
    }
    public get with(): Array<With>{
        return this._with
    }
    public set this(value: string){
        this._this = value
    }
    public set by(value: string){
        this._by = value
    }
    public set the(value: string){
        this._the = value
    }
    public set with(value: Array<With>){
        this._with = value
    }

}