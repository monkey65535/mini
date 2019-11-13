const {
    HttpException
} = require('../core/http-exception')

const catchError = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        // 开发环境
        // 生产环境
        if (global.config.environment === 'dev') {
            throw error;
        }

        if (error instanceof HttpException) {
            // 这里是已知错误
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.mathod}  ${ctx.path}`
            }
            ctx.status = error.code;
        } else {
            ctx.body = {
                msg: '出现了一个错误~',
                error_code: 99999,
                request: `${ctx.mathod}  ${ctx.path}`
            }
            ctx.status = 500;
        }
        // 返回给前端的信息
        // HTTP status code 2xx 4xx 5xx
        // message  表明文字化错误信息
        // error code 详细的错误状态码 前后端约定
        // request url  出现错误请求的接口URL
        // ctx.body = '服务器出现了一些问题'
    }
}

module.exports = catchError;