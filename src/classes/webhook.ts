import WebhookOptions from "../types/WebhookOptions";
import Embed from "./embed/embed";
import axios, {AxiosResponse} from "axios";

export default class Webhook {

    get webhookUrl(): string {
        return this._webhookUrl;
    }
    get retryOnFail(): boolean {
        return this._retryOnFail;
    }

    set retryOnFail(value: boolean) {
        this._retryOnFail = value;
    }
    get avatar(): string {
        return this._avatar;
    }

    set avatar(value: string) {
        this._avatar = value;
    }

    get userName(): string {
        return this._userName;
    }

    set userName(value: string) {
        this._userName = value;
    }



    private _retryOnFail : boolean
    private _webhookUrl : string
    private _userName : string
    private _avatar : string | undefined

    constructor(webhookUrl : string)
    constructor(options : WebhookOptions)
    constructor(options : string | WebhookOptions) {
        if(typeof options === 'string') {
            this._webhookUrl = options
            this._retryOnFail = false
            this._userName = 'Discord Webhook'
        }else {
            this._webhookUrl = options.webhookUrl
            this._retryOnFail = options.retryOnFail
            this._userName = options.userName || 'Discord Webhook'
            options.avatar && (this._avatar = options.avatar )
        }
    }

    private async sendAgain(paramsStr : string, contentLength : number) : Promise<{statusCode: number, statusMessage: string }> {
        try {
            const r = await axios.post(this._webhookUrl, paramsStr, {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': contentLength
                }})
            return {statusCode : r.status, statusMessage : r.statusText}
        }catch (e) {
            if(e?.response?.statusCode === 429 && this._retryOnFail) {
                const timeout = (e.response.data.retry_after || 1000) + 100
                await new Promise(r => setTimeout(r, timeout))
                return this.sendAgain(paramsStr, contentLength)
            }else {
                return {statusCode : e?.response?.status, statusMessage : e?.response?.statusText}
            }
        }
    }

    async send(payload : Embed) : Promise<{statusCode: number, statusMessage: string }>
    async send(payload : Embed[]) : Promise<{statusCode: number, statusMessage: string }>
    async send(payload : string) : Promise<{statusCode: number, statusMessage: string }>
    async send(payload : string | Embed | Embed[]) : Promise<{statusCode: number, statusMessage: string }> {
        const params = {
            username : this._userName,
            avatar_url : this._avatar,
        } as {[key : string] : any}

        if(typeof payload === 'string') {
            params.content = payload
        }else if(Array.isArray(payload)) {
            params.embeds = payload.map(el => el.getValues())
        }else {
            params.embeds = [payload.getValues()]
        }

        const paramsStr = JSON.stringify(params)

        const contentLength = paramsStr.length

        return await this.sendAgain(paramsStr, contentLength)

    }


}
