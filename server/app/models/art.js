const {Movie, Sentence, Music} = require('./classic')
const {Op} = require('sequelize')
const _ = require('lodash')

class Art {
    static async getData(art_id, type) {
        const finder = {
            where: {
                id: art_id
            }
        }
        let art = null;
        switch (type) {
            case 100:
                art = await Movie.findOne(finder)
                break;
            case 200:
                art = await Music.findOne(finder)
                break;
            case 300:
                art = await Sentence.findOne(finder)
                break;
            case 400:
                break;
            default:
                break;
        }
        return art
    }

    static async getList(artInfoList) {
        // 数据库批量查询的方法
        // 使用in查询
        // list中实际上有3种类型的内容,所以我们需要进行3次in查询
        const artInfoObj = {
            100: [],
            200: [],
            300: []
        }
        // 将查询到的list按照type进行区分
        for (let artInfo of artInfoList) {
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }
        let arts = [];
        // 进行in查询
        for (let key in artInfoObj) {
            const ids = artInfoObj[key]
            key = parseInt(key)
            if (ids && ids.length) {
                arts.push(await Art._getListByType(ids, key))
            }
        }
        return _.flatten(arts)
    }

    static async _getListByType(ids, type) {
        let arts = [];
        const finder = {
            where: {
                id: {
                    // 使用in查询
                    [Op.in]: ids
                }
            }
        }
        switch (type) {
            case 100:
                arts = await Movie.findOne(finder)
                break;
            case 200:
                arts = await Music.findOne(finder)
                break;
            case 300:
                arts = await Sentence.findOne(finder)
                break;
            case 400:
                break;
            default:
                break;
        }
        return arts
    }
}

module.exports = {
    Art
}