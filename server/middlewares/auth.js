const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level = 1) {
        this.level = level
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }

    get m() {
        return async (ctx, next) => {
            // 检测用户的token
            const userToken = basicAuth(ctx.req);
            let decode;
            if (!userToken || !userToken.name) {
                // 没有获取到token,中断异常
                throw new global.errs.Forbbiden();
            }
            // 验证token
            try {
                decode = jwt.verify(userToken.name, global.config.security.secretKey)
            } catch (e) {
                if (e.name === 'TokenExpiredError') {
                    // 令牌过期
                    throw new global.errs.Forbbiden('token令牌已过期');
                } else {
                    throw new global.errs.Forbbiden('token不合法');
                }
            }
            if (decode.scope < this.level) {
                throw new global.errs.Forbbiden('权限不足');
            }
            // token包含uid,scope
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next()
        }
    }
}

module.exports = {Auth}