const Router = require('koa-router')
const router = new Router({
    prefix: "/api/v1/token"
})
const {TokenValidator} = require('../../validators/validator')
const {LoginType} = require('../../lib/enum')
const {User} = require('../../models/user')
const {generateToken} = require('../../../core/util')
const {Auth} = require('../../../middlewares/auth')
const {WXManager} = require('../../service/wx')
router.post('/', async (ctx, next) => {
    const v = await new TokenValidator().validate(ctx);
    let token = '';
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            //  email登录
            token = await emailLogin(v.get('body.account'), v.get('body.secret'));
            break;
        case LoginType.USER_MINI_PROGRAM:
            // 小程序登录
            token = await new WXManager.codeToToken(v.get('body.account'))
            break;
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
            break;
    }
    ctx.body = {token};
})

// 通过数据库匹配email和密码 如果通过匹配那么颁布一个token
async function emailLogin(account, secret) {
    const user = await User.verifyEmallPassword(account, secret)
    return generateToken(user.id, Auth.USER)
}

module.exports = router