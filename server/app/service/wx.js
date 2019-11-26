const util = require('util')
const axios = require('axios')
const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')

class WXManager {
    static async codeToToken(code) {
        const url = util.format(global.config.wx.loginUrl, global.config.wx.appID, global.config.wx.appSecret, code)
        const result = await axios.get(url)
        if (result.status !== 200) {
            throw new global.errs.AuthFailed('openID获取失败')
        }
        const {data} = result;
        if (data.errcode !== 0) {
            throw new global.errs.AuthFailed(`${data.errcode} openID获取失败`)
        }
        // 将openId写入到用户的user表中
        // 首先查询是否有对应openID的用户 如果没有就为新用户创建用户档案
        let user = User.getUserByOpenid(data.openid);
        // 没有从数据库中查询到user
        if (!user) {
            user = await User.registerUserByOpenid(data.openid);
        }
        // 返回token
        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    WXManager
}