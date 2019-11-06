const Koa = require("koa");
const Router = require('koa-router');


const app = new Koa();
const router = new Router();

router.get('/classic/latest', (ctx, next) => {
    ctx.body = {
        key: 'classic'
    }
})

router.get('/classic/latest', (ctx, next) => {
    ctx.body = {
        key: 'classic'
    }
})

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3003, () => {
    console.log('App is running at port 3003')
})