const catchError = async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        // 全局处理异常
        ctx.body = '服务器出现了一些问题'
    }
}

module.exports = catchError;