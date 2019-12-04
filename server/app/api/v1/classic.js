const Router = require('koa-router');
const router = new Router({
    prefix: "/api/v1/classic"
});
const {HttpException, ParameterException} = require('../../../core/http-exception')
const {PositiveIntegerValidatorG} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth')
const {Flow} = require('../../models/flow')
const {Art} = require('../../models/art')
router.get('/latest', new Auth().m, async (ctx, next) => {
    // 查询最新一期的期刊
    const flow = await Flow.findOne({
        order: [['index', 'DESC']]
    })
    const art = await Art.getData(flow.art_id, flow.type);
    // 使用这种方法来修改数据库返回数据
    art.setDataValue('index', flow.index);
    ctx.body = art;
})

/* router.post('/api/v1/:id/lastest', async (ctx, next) => {
    const path = ctx.params; // 获取地址栏中传递的参数
    const query = ctx.request.query; // 获取地址栏中#后面的参数
    const headers = ctx.request.header; // 获取请求的headers
    const body = ctx.request.body; // 获取请求的payload  
    const v = await new PositiveIntegerValidator();
    v.validate(ctx);

    ctx.body = { 
        path,
        query,
        headers,
        body
    }
}) */

module.exports = router;