const Router = require('koa-router');
const router = new Router();

router.get('/api/v1/book/book', async (ctx, next) => {
    ctx.body = {
        book: "book"
    }
})

module.exports = router;