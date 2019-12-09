const Router = require('koa-router');
const router = new Router({
    prefix: "/api/v1/classic"
});
const {HttpException, ParameterException} = require('../../../core/http-exception')
const {PositiveIntegerValidatorG} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth')
const {Flow} = require('../../models/flow')
const {Art} = require('../../models/art')
const {Favor} = require('../../models/favor')
router.get('/latest', new Auth().m, async (ctx, next) => {
    // 查询最新一期的期刊
    const flow = await Flow.findOne({
        order: [['index', 'DESC']]
    })
    const art = await Art.getData(flow.art_id, flow.type)
    // 获取是否已点赞
    const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    // 使用这种方法来修改数据库返回数据
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeLatest)
    ctx.body = art;
})


module.exports = router;