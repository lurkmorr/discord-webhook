export default class Url {
    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }

    private _value : string

    constructor(url : string) {
        if(url.includes('http://') || url.includes('https://')) {
            this._value = url
        }else {
            throw new Error('Url must include http:// or https://')
        }
    }
}
