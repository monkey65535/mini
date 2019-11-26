const Router = require('koa-router');
const router = new Router({
    prefix: "/api/v1/book"
});

router.get('/book', async (ctx, next) => {
    ctx.body = {
        book: "book"
    }
})

module.exports = router;