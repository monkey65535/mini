const {
    sequelize
} = require('../../core/db')
const {
    Sequelize,
    Model
} = require('sequelize')

// 创建一个User表
class User extends Model {

}
// 初始化User表，设置表的字段
// 主键尽量使用Number 
//最好不要使用字符串，尤其不要使用随机字符串 
//数据库查询数字的速度是最快的
// 自定义ID 需要考虑高并发 
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, // 设置主键
        autoIncrement: true // 设置自增
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    openid: {
        type: Sequelize.STRING(64),
        unique: true // 设置唯一值
    }
}, {
    sequelize,
    tableName: 'user'   //指定表名字
})