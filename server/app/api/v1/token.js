const Router = require('koa-router')
const router = new Router({
    prefix: "/api/v1/token"
})
const {TokenValidator} = require('../../validators/validator')
const {LoginType} = require('../../lib/enum')
const {User} = require('../../models/user')
router.post('/', async (ctx, next) => {
    const v = await new TokenValidator().validate(ctx);
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            emailLogin(v.get('body.account'), v.get('body.secret'));
            break;
        case LoginType.USER_MINI_PROGRAM:
            break;
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
            break;
    }
})

// 通过数据库匹配email和密码 如果通过匹配那么颁布一个token
async function emailLogin(account, secret) {
    const user = await User.verifyEmallPassword(account, secret)
}

module.exports = router