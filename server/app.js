const Koa = require("koa");
const bodyParser = require('koa-bodyparser');
const InitManager = require('./core/init')

// 创建APP
const app = new Koa();
app.use(bodyParser());
InitManager.initCore(app);
app.listen(3003, () => {
    console.log('App is running at port 3003')
})