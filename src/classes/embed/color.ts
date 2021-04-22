export default class Color {
    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

    private _value : number

    constructor(color : string | number) {
        if (typeof color === 'string' && color.startsWith("#")){
            const rawHex = color.replace('#', '');
            this._value = parseInt(rawHex, 16);
        }
        else {
            this._value = Number(color);
        }
    }

}
