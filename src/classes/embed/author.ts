import Url from "./url";

export default class Author {
    get iconUrl(): string {
        return this._icon_url;
    }

    set iconUrl(value: string) {
        this._icon_url = value;
    }
    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    private _name : string
    private _icon_url : string
    private _url : string



    constructor(name: string)
    constructor(name: string, iconUrl : string)
    constructor(name: string, iconUrl : Url)
    constructor(name: string, iconUrl : string)
    constructor(name : string, iconUrl : string, url : string)
    constructor(name : string, iconUrl : Url, url : string)
    constructor(name : string, iconUrl : string, url : Url)
    constructor(name : string, iconUrl : Url, url : Url)
    constructor(name: string, iconUrl: string | Url, url: string | Url)
    constructor(name? : string, iconUrl? : string | Url, url? : string | Url) {
        this._name = name
        this._icon_url = iconUrl ? typeof iconUrl === 'string' ? new Url(iconUrl).value : iconUrl.value : undefined
        this._url = url ? typeof url === 'string' ? new Url(url).value : url.value : undefined
    }

    public getValues() {
        const obj : {[key : string] : string} = {}
        if(this._name)
            obj.name = this._name

        if(this._icon_url)
            obj.iconUrl = this._icon_url

        if(this._url)
            obj.url = this._url

        return obj
    }

}
