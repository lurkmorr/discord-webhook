import Color from "../lib/classes/embed/color";

const assert = require('assert')
import {Webhook, Embed, Field, Author, Image, Footer, Thumbnail} from '../lib'
import {config} from 'dotenv'
import Url from "../lib/classes/embed/url";


const WEBHOOK_URL = config().parsed.WEBHOOK_URL





describe('webhook', () => {

    describe('creation', () => {
        it('should create new instance with string param passed to constructor', () => {
            const wh = new Webhook('')
            assert.strictEqual(wh instanceof Webhook, true)
        })
        it('should create new instance with options param passed to constructor', () => {
            const wh = new Webhook({
                webhookUrl : '',
                retryOnFail: true,
                userName : 'userName',
                avatar: 'avatar'
            })
            assert.strictEqual(wh instanceof Webhook, true)
        })
        it('should check if properties from options are set', () => {
            const avatar = 'avatar:test'
            const userName = 'userName:test'
            const retryOnFail = true

            const wh = new Webhook({
                webhookUrl: WEBHOOK_URL,
                avatar,
                userName,
                retryOnFail
            })
            assert.strictEqual(
                wh.avatar === avatar &&
                userName === wh.userName &&
                wh.webhookUrl === WEBHOOK_URL &&
                wh.retryOnFail === retryOnFail, true)
        })

        it('should set properties after instance creation', () => {
            const wh = new Webhook(WEBHOOK_URL), avatar = 'avatar:test', userName = 'userName:test';
            wh.avatar = avatar
            wh.userName = userName
            assert.strictEqual(wh.avatar === avatar && userName === wh.userName, true)
        })
    })

    describe('sending data', () => {


        it('should send embed to discord', async function () {
            const author = new Author('test:author')
            const color = 'test:color'
            const title = 'test:title'
            const url = 'test:url'
            const description = 'test:desc'
            const thumbnail = new Thumbnail('https://avatars.githubusercontent.com/u/53314392?s=48&v=4')
            const image = new Image('https://i.imgur.com/9HvKtae.png')
            const timestamp = new Date()
            const footer = new Footer('test:footer:text', 'https://i.imgur.com/mlKQw2M.jpeg')

            const embed = new Embed({
                title,
                image,
                author,
                description,
                timestamp,
                thumbnail,
                footer,
                color
            })

            const r = await new Webhook(WEBHOOK_URL).send(embed)
            assert.strictEqual(r.statusCode, 204)
        });

        it('should fail on sending embed to discord', async function () {
            const author = new Author('test:author')
            const color = 'test:color'
            const title = 'test:title'
            const url = 'https://test:url'
            const description = 'test:desc'
            const thumbnail = new Thumbnail('https://avatars.githubusercontent.com/u/53314392?s=48&v=4')
            const image = new Image('https://i.imgur.com/9HvKtae.png')
            const timestamp = new Date()
            const footer = new Footer('test:footer:text', 'https://i.imgur.com/mlKQw2M.jpeg')

            const embed = new Embed({
                title,
                image,
                author,
                description,
                timestamp,
                thumbnail,
                footer,
                color,
                url
            })

            // const r = await new Webhook(WEBHOOK_URL).send(embed)
            // assert.strictEqual(r.statusCode, 400)
        });

        it('should send msg to discord', async function () {
            const wh = new Webhook(WEBHOOK_URL)
            const r = await wh.send('testing')

            assert.strictEqual(r.statusCode, 204)
        });



    })

})

describe('embed', () => {

    describe('creation', () => {

        it('should create new embed with no params', function () {
            const embed = new Embed()
            assert.strictEqual(embed instanceof Embed, true)
        });

        it('should create a new embed with all params', function () {
            const author = new Author('author')
            const color = new Color('test:color')
            const title = 'test:title'
            const url = new Url('http://test:url')
            const description = 'test:desc'
            const thumbnail = new Thumbnail('http://test:thumbnail')
            const image = new Image('http://test:image')
            const timestamp = new Date()
            const footer = new Footer('test:thumb:text', 'http://test:thumb:iconUrl')

            const embed = new Embed({
                fields : [new Field('test', 'field')],
                color,
                title,
                url,
                author,
                description,
                timestamp,
                thumbnail,
                image,
                footer
            }) as any
            assert.strictEqual(
                embed.fields &&
                embed.author === author &&
                embed.color === color &&
                embed.title === title &&
                embed.url === url &&
                embed.author === author &&
                embed.description === description &&
                embed.timestamp === timestamp &&
                embed.thumbnail === thumbnail &&
                embed.image === image &&
                embed.footer === footer,
                true)
        });
        it('should create new embed with not all params', function () {

            const embed = new Embed({
                fields : [
                    new Field('test', 'field'),
                    new Field('test', 'field'),
                    new Field('test', 'field'),
                    new Field('test', 'field'),
                    new Field('test', 'field'),
                    new Field('test', 'field'),
                    new Field('test', 'field'),
                    new Field('test', 'field'),
                    new Field('test', 'field'),
                    new Field('test', 'field'),
                ],
            }) as any

            assert.strictEqual(
                embed.fields.length, 10)
        });


    })
})
