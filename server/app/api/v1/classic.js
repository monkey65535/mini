const Router = require('koa-router');
const router = new Router();

router.get('/api/v1/classic/lastest', async (ctx, next) => {
    ctx.body = {
        key: "classic"
    }
})

module.exports = router;