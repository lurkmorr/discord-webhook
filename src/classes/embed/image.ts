import Url from "./url";

export default class Image{
    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    private _url : string

    constructor(url : Url)
    constructor(url : string)
    constructor(url : string | Url) {
        this._url = typeof url === 'string' ? new Url(url).value : url.value
    }

    public getValues() {
        return {url : this._url}
    }
}
