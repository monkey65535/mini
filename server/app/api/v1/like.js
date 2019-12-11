const Router = require('koa-router');
const router = new Router({
    prefix: "/api/v1/like"
});
const {Auth} = require('../../../middlewares/auth')
const {LikeError, DisLikeError} = require('../../../core/http-exception')
const {LikeValidator} = require('../../validators/validator')
const {Favor} = require('../../models/favor')
const {success} = require('../../lib/helper')

router.post('/', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx, {
        id: 'art_id'
    })
    await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    success('点赞成功');
})

router.post('/cancel', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx, {
        id: 'art_id'
    })
    await Favor.dislike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    success('取消点赞');
})

module.exports = router