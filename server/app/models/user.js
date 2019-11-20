const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 创建一个User表
class User extends Model {
    // 创建一个用户登录验证器
    static async verifyEmallPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        // 如果没有对应的用户
        if (!user) {
            // 抛出异常
            throw new global.errs.AuthFailed('账号不存在')
        }
        const corect = bcrypt.compareSync(plainPassword, user.password);
        if (!corect) {
            throw new global.errs.AuthFailed('密码错误');
        }
        return user;
    }
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
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            // 在入库前对val进行处理
            // 使用bcrypt给密码加盐
            // 生成加密密码
            // 数据库的密码不能是相同的
            // 而且相同密码加密后应该是不同的
            // 这就是加盐的功效
            // 防止彩虹攻击
            const salt = bcrypt.genSaltSync(10) // 这个10实际上指的式计算机生成这个salt的时候花费的成本(安全性更高)
            const pwd = bcrypt.hashSync(val, salt)
            this.setDataValue('password', pwd);
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true // 设置唯一值
    }
}, {
    sequelize,
    tableName: 'user'   //指定表名字
})


module.exports = {
    User
}