const Router = require('koa-router');
const router = new Router({
    prefix: "/api/v1/classic"
});
const {HttpException, ParameterException} = require('../../../core/http-exception')
const {PositiveIntegerValidator, ClassicValidator} = require('../../validators/validator')
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

// 查询下一期
router.get('/:index/next', new Auth().m, async (ctx, next) => {
    const v = new PositiveIntegerValidator().validate(ctx, {
        id: index
    });
    const index = v.get('path.index');
    const flow = await Flow.findOne({
        where: {
            index: index + 1
        }
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    // 获取是否已点赞
    const likeNext = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    // 使用这种方法来修改数据库返回数据
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeNext)
    ctx.body = art;
})
// 查询上一期
router.get('/:index/previos', new Auth().m, async (ctx, next) => {
    const v = new PositiveIntegerValidator().validate(ctx, {
        id: index
    });
    const index = v.get('path.index');
    const flow = await Flow.findOne({
        where: {
            index: index - 1
        }
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    // 获取是否已点赞
    const likePrev = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    // 使用这种方法来修改数据库返回数据
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likePrev)
    ctx.body = art;
})

router.get('/:type/:id', new Auth().m, async (ctx, next) => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = v.get('path.type')
    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
    ctx.body = {
        art: artDetail.art,
        like_status: artDetail.like_status
    }
})

router.get('/:type/:id/faovr', new Auth().m, async (ctx, next) => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = v.get('path.type')
    const art = await Art.getData(id, type)
    if (!art) {
        throw new global.errs.NotFound()
    }
    const like = await Favor.userLikeIt(id, type, ctx.auth.uid)
    ctx.body = {
        fav_nums: art.fav_nums,
        like_status: like
    }
})

router.get('favor', new Auth().m, async (ctx, next) => {
    ctx.body = await Favor.getMyClassicFavours(ctx.auth.uid)
})

module.exports = router;