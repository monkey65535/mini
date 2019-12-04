const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

class Favor extends Model {
    //业务表
    static async like(art_id,type,uid){
        // 添加记录
        // classic
        // 数据库事务,可以保证数据的一致性,如果有其中一个失败,那么就之前的数据操作会被回退
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {sequelize, tableName: "favor"})