
export default class Field {

    get inline(): boolean {
        return this._inline;
    }
    set inline(value: boolean) {
        this._inline = value;
    }
    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    private _name : string
    private _value : string
    private _inline : boolean

    constructor(name : string, value : string)
    constructor(name : string, value : string, inline : boolean)
    constructor(name : string, value : string, inline? : boolean) {
        this._name = name
        this._value = value
        this._inline = inline
    }

    public getValues() {
        const obj : {[key : string] :  string | boolean} = {name : this._name, value : this._value}
        if(this._inline !== undefined)
            obj.inline = this._inline
        return obj
    }

}
