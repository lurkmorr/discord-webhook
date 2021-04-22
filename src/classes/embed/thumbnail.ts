
export default class Thumbnail{
    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    constructor(private _url : string) {}

    public getValues() {
        return {url : this._url}
    }
}
