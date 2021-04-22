export default class Title {
    get value(): string {
        return this._title;
    }

    set value(value: string) {
        this._title = value;
    }

    private _title : string

    constructor(title : string) {
        this._title = title
    }
}
