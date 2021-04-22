
export default class Footer {
    get icon_url(): string {
        return this._icon_url;
    }

    set icon_url(value: string) {
        this._icon_url = value;
    }
    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }



    constructor(private _text : string,
                private _icon_url : string) {

    }

    public getValues () {
        return {text : this._text, icon_url : this._icon_url}
    }

}
