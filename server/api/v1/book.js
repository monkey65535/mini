const Router = require('koa-router');
const router = new Router();

router.get('/v1/book/book', async (ctx, next) => {
    ctx.body = {
        book: "book"
    }
})

module.exports = router;