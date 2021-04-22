import Author from "./author";
import Thumbnail from "./thumbnail";
import Field from "./field";
import Image from "./image";
import Footer from "./footer";
import EmbedParameters from "../../types/embedParameters";
import Color from "./color";
import Url from "./url";
import * as url from "url";

export default class Embed {

    private color : Color
    private title : string
    private url : Url
    private author : Author
    private description : string
    private thumbnail : Thumbnail
    private fields : Field[] = []
    private image : Image
    private timestamp : Date
    private footer : Footer

    constructor()
    constructor(data : EmbedParameters)
    constructor(data ? : EmbedParameters) {

        if(data) {

            data.color && this.setColor(data.color)
            data.title && this.setTitle(data.title)
            data.url && (this.url = typeof data.url === 'string' ? new Url(data.url) : data.url)
            data.author && (this.author = data.author)
            data.description && (this.description = data.description)
            data.thumbnail && (this.thumbnail = data.thumbnail)
            data.fields && (this.fields = data.fields)
            data.image && (this.image = data.image)
            data.timestamp && (this.timestamp = data.timestamp)
            data.footer && (this.footer = data.footer)
        }
    }




    public setColor(color : string | number | Color) : Embed {
        if(color instanceof Color) {
            this.color = color
        }else {
            this.color = new Color(color)
        }
        return this
    }

    public setTitle(title : string) : Embed {
        this.title = title
        return this
    }

    public setUrl (url : Url) : Embed
    public setUrl (url : string) : Embed
    public setUrl (url : string | Url) : Embed {
        this.url = typeof url === 'string' ? new Url(url) : url
        return this
    }

    public setAuthor(author : Partial<Author>): Embed
    public setAuthor(author : Author): Embed
    public setAuthor(name: string): Embed
    public setAuthor(name: string, iconUrl : string): Embed
    public setAuthor(name : string, iconUrl : string, url : string): Embed
    public setAuthor(name : string, iconUrl : Url, url : string): Embed
    public setAuthor(name : string, iconUrl : Url, url : Url): Embed
    public setAuthor(name : string, iconUrl : string, url : Url): Embed
    public setAuthor(name : string, iconUrl : string | Url, url : string | Url): Embed
    public setAuthor(author : Author | string | Partial<Author>, iconUrl? : string | Url, url? : string | Url) : Embed {
        if(typeof author === 'object') {
            if(author instanceof Author) {
                this.author = author
            }else {
                this.author = new Author(author.name, iconUrl, url)
            }
        }else {
            this.author = new Author(author, iconUrl, url)
        }

        return this
    }

    public setDescription(description : string) : Embed {
        this.description = String(description)
        return this
    }

    public setThumbnail(thumbnail : Thumbnail): Embed
    public setThumbnail(thumbnail : string): Embed
    public setThumbnail(thumbnail : Thumbnail | string) : Embed {
        if(typeof thumbnail === 'string') {
            this.thumbnail = new Thumbnail(thumbnail)
        }else {
            this.thumbnail = thumbnail
        }
        return this
    }

    public addField(field : Field): Embed
    public addField(name : string, value : string): Embed
    public addField(name : string, value : string, inline : boolean): Embed
    public addField(field : {name : string, value : string, inline? : boolean}): Embed
    public addField(field : Field | {name : string, value : string, inline? : boolean} | string, value? : string, inline? : boolean) : Embed {
        if(typeof field === 'object') {
            if(field instanceof Field) {
                this.fields.push(field)
            }else {
                this.fields.push(new Field(field.name, field.value, field.inline))
            }
        }else {
            this.fields.push(new Field(field, value, inline))
        }
        return this
    }

    public addImage(image : Image) : Embed
    public addImage(image : string) : Embed
    public addImage(image : Image | string) : Embed {
        if(typeof image === 'string') {
            this.image = new Image(image)
        }else {
            this.image = image
        }
        return this
    }


    public setTimestamp()
    public setTimestamp(timestamp : Date)
    public setTimestamp(timestamp? : Date) : Embed {
        if(timestamp) {
            this.timestamp = timestamp
        }else {
            this.timestamp = new Date()
        }
        return this
    }

    public setFooter(footer : Footer)
    public setFooter(text : string, iconUrl : string)
    public setFooter(footer : Footer | string, iconUrl? : string) : Embed {
        if(typeof footer === 'string') {
            this.footer = new Footer(footer, iconUrl)
        }else {
            this.footer = footer
        }
        return this
    }

    public getValues() {
        return {
            color : this.color?.value,
            title : this.title,
            url : this.url?.value,
            author : this.author?.getValues(),
            description : this.description,
            thumbnail : this.thumbnail?.getValues(),
            fields : this.fields?.map(el => el.getValues()),
            image : this.image?.getValues(),
            timestamp : this.timestamp || new Date(),
            footer : this.footer?.getValues()
        }
    }
}
