const Router = require('koa-router')
const router = new Router({
    prefix: "/api/v1/user"
})
const {RegisterValidator} = require('../../validators/validator')
// 用户模型
const {User} = require('../../models/user')
const {success} = require('../../lib/helper')

//用户注册
router.post('/register', async (ctx, next) => {
    const v = await new RegisterValidator().validate(ctx);
    const userData = {
        email: v.get('body.email'),
        password: v.get('body.password1'),
        nickname: v.get('body.nickname')
    }
    User.create(userData);
    success();
})
module.exports = router;