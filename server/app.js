const Koa = require("koa");
const requireDirectory = require('require-directory');
const path = require('path');
const Router = require('koa-router');
// 创建APP
const app = new Koa();
// 自动加载路由模块
const modules = requireDirectory(module, path.join(__dirname, '/app/api'), {
    visit: router => {
        // 自动注册路由
        if (router instanceof Router) {
            app.use(router.routes());
        }
    }
});

app.listen(3003, () => {
    console.log('App is running at port 3003')
})