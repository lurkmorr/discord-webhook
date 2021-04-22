"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var color_1 = require("../lib/classes/embed/color");
var assert = require('assert');
var lib_1 = require("../lib");
var dotenv_1 = require("dotenv");
var url_1 = require("../lib/classes/embed/url");
var WEBHOOK_URL = dotenv_1.config().parsed.WEBHOOK_URL;
describe('webhook', function () {
    describe('creation', function () {
        it('should create new instance with string param passed to constructor', function () {
            var wh = new lib_1.Webhook('');
            assert.strictEqual(wh instanceof lib_1.Webhook, true);
        });
        it('should create new instance with options param passed to constructor', function () {
            var wh = new lib_1.Webhook({
                webhookUrl: '',
                retryOnFail: true,
                userName: 'userName',
                avatar: 'avatar'
            });
            assert.strictEqual(wh instanceof lib_1.Webhook, true);
        });
        it('should check if properties from options are set', function () {
            var avatar = 'avatar:test';
            var userName = 'userName:test';
            var retryOnFail = true;
            var wh = new lib_1.Webhook({
                webhookUrl: WEBHOOK_URL,
                avatar: avatar,
                userName: userName,
                retryOnFail: retryOnFail
            });
            assert.strictEqual(wh.avatar === avatar &&
                userName === wh.userName &&
                wh.webhookUrl === WEBHOOK_URL &&
                wh.retryOnFail === retryOnFail, true);
        });
        it('should set properties after instance creation', function () {
            var wh = new lib_1.Webhook(WEBHOOK_URL), avatar = 'avatar:test', userName = 'userName:test';
            wh.avatar = avatar;
            wh.userName = userName;
            assert.strictEqual(wh.avatar === avatar && userName === wh.userName, true);
        });
    });
    describe('sending data', function () {
        it('should send embed to discord', function () {
            return __awaiter(this, void 0, void 0, function () {
                var author, color, title, url, description, thumbnail, image, timestamp, footer, embed, r;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            author = new lib_1.Author('test:author');
                            color = 'test:color';
                            title = 'test:title';
                            url = 'test:url';
                            description = 'test:desc';
                            thumbnail = new lib_1.Thumbnail('https://avatars.githubusercontent.com/u/53314392?s=48&v=4');
                            image = new lib_1.Image('https://i.imgur.com/9HvKtae.png');
                            timestamp = new Date();
                            footer = new lib_1.Footer('test:footer:text', 'https://i.imgur.com/mlKQw2M.jpeg');
                            embed = new lib_1.Embed({
                                title: title,
                                image: image,
                                author: author,
                                description: description,
                                timestamp: timestamp,
                                thumbnail: thumbnail,
                                footer: footer,
                                color: color
                            });
                            return [4 /*yield*/, new lib_1.Webhook(WEBHOOK_URL).send(embed)];
                        case 1:
                            r = _a.sent();
                            assert.strictEqual(r.statusCode, 204);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('should fail on sending embed to discord', function () {
            return __awaiter(this, void 0, void 0, function () {
                var author, color, title, url, description, thumbnail, image, timestamp, footer, embed;
                return __generator(this, function (_a) {
                    author = new lib_1.Author('test:author');
                    color = 'test:color';
                    title = 'test:title';
                    url = 'https://test:url';
                    description = 'test:desc';
                    thumbnail = new lib_1.Thumbnail('https://avatars.githubusercontent.com/u/53314392?s=48&v=4');
                    image = new lib_1.Image('https://i.imgur.com/9HvKtae.png');
                    timestamp = new Date();
                    footer = new lib_1.Footer('test:footer:text', 'https://i.imgur.com/mlKQw2M.jpeg');
                    embed = new lib_1.Embed({
                        title: title,
                        image: image,
                        author: author,
                        description: description,
                        timestamp: timestamp,
                        thumbnail: thumbnail,
                        footer: footer,
                        color: color,
                        url: url
                    });
                    return [2 /*return*/];
                });
            });
        });
        it('should send msg to discord', function () {
            return __awaiter(this, void 0, void 0, function () {
                var wh, r;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            wh = new lib_1.Webhook(WEBHOOK_URL);
                            return [4 /*yield*/, wh.send('testing')];
                        case 1:
                            r = _a.sent();
                            assert.strictEqual(r.statusCode, 204);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
describe('embed', function () {
    describe('creation', function () {
        it('should create new embed with no params', function () {
            var embed = new lib_1.Embed();
            assert.strictEqual(embed instanceof lib_1.Embed, true);
        });
        it('should create a new embed with all params', function () {
            var author = new lib_1.Author('author');
            var color = new color_1["default"]('test:color');
            var title = 'test:title';
            var url = new url_1["default"]('http://test:url');
            var description = 'test:desc';
            var thumbnail = new lib_1.Thumbnail('http://test:thumbnail');
            var image = new lib_1.Image('http://test:image');
            var timestamp = new Date();
            var footer = new lib_1.Footer('test:thumb:text', 'http://test:thumb:iconUrl');
            var embed = new lib_1.Embed({
                fields: [new lib_1.Field('test', 'field')],
                color: color,
                title: title,
                url: url,
                author: author,
                description: description,
                timestamp: timestamp,
                thumbnail: thumbnail,
                image: image,
                footer: footer
            });
            assert.strictEqual(embed.fields &&
                embed.author === author &&
                embed.color === color &&
                embed.title === title &&
                embed.url === url &&
                embed.author === author &&
                embed.description === description &&
                embed.timestamp === timestamp &&
                embed.thumbnail === thumbnail &&
                embed.image === image &&
                embed.footer === footer, true);
        });
        it('should create new embed with not all params', function () {
            var embed = new lib_1.Embed({
                fields: [
                    new lib_1.Field('test', 'field'),
                    new lib_1.Field('test', 'field'),
                    new lib_1.Field('test', 'field'),
                    new lib_1.Field('test', 'field'),
                    new lib_1.Field('test', 'field'),
                    new lib_1.Field('test', 'field'),
                    new lib_1.Field('test', 'field'),
                    new lib_1.Field('test', 'field'),
                    new lib_1.Field('test', 'field'),
                    new lib_1.Field('test', 'field'),
                ]
            });
            assert.strictEqual(embed.fields.length, 10);
        });
    });
});
