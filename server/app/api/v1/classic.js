const Router = require('koa-router');
const router = new Router();

router.get('/api/v1/classic/lastest', async (ctx, next) => {
    ctx.body = {
        key: "classic"
    }
})

router.post('/api/v1/:id/lastest', async (ctx, next) => {
    const path = ctx.params;            // 获取地址栏中传递的参数
    const query = ctx.request.query;    // 获取地址栏中#后面的参数
    const headers = ctx.request.header; // 获取请求的headers
    const body = ctx.request.body;      // 获取请求的payload        
    ctx.body = {
        path,
        query,
        headers,
        body
    }
})

module.exports = router;