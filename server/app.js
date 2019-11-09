const Koa = require("koa");
const InitManager = require('./core/init')

// 创建APP
const app = new Koa();
InitManager.initCore(app);
app.listen(3003, () => {
    console.log('App is running at port 3003')
})