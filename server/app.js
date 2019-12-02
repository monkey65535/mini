const Koa = require("koa");
const bodyParser = require('koa-bodyparser');
const InitManager = require('./core/init')
const catchError = require('./middlewares/excption')

// 创建APP
const app = new Koa();
app.use(bodyParser());
app.use(catchError);
InitManager.initCore(app);

// require('./app/models/user')


app.listen(3010, () => {
    console.log('App is running at port 3010')
})