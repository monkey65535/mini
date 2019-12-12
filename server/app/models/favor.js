const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const {Art} = require('./art')

class Favor extends Model {
    //业务表
    static async like(art_id, type, uid) {
        // 添加记录
        // classic
        // 数据库事务,可以保证数据的一致性,如果有其中一个失败,那么就之前的数据操作会被回退
        const favour = Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if (favour) {
            // 如果存在,则是点过赞了
            throw new global.errs.LikeError()
        }

        return sequelize.transaction(async t => {
            await Favor.create({
                art_id,
                type,
                uid
            }, {
                transaction: t
            })
            const art = await Art.getData(art_id, type, false)
            await art.increment('fav_nums', {
                by: 1,
                transaction: t
            })
        })
    }

    static async dislike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if (!favor) {
            throw new global.errs.DisLikeError();
        }
        // Favor 表 favor 记录
        return sequelize.transaction(async t => {
            await favor.destroy({
                force: true,
                transaction: t
            })
            const art = await Art.getData(art_id, type, false)
            await art.decrement('fav_nums', {
                by: 1,
                transaction: t
            })
        })
    }

    static async userLikeIt(art_id, type, uid) {
        //查询在库中是否能招到一条记录,如果有,那么是已点赞
        const favor = await Favor.findOne({
            where: {
                uid,
                art_id,
                type
            }
        })
        return favor ? true : false
    }

    static async getMyClassicFavours(uid) {
        const arts = await Favor.findAll({
            where: {
                uid,
                // 判断type不等于400
                type: {
                    [Op.not]: 400
                }
            }
        })
        if (!arts) {
            throw new global.errs.NotFound();
        }
        // 一定不能循环去查询数据库
        return await Art.getList(arts)
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {sequelize, tableName: "favor"})

module.exports = {
    Favor
}