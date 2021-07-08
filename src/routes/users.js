const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

router.get('/profile/:userName',async function(ctx,next){
    const {userName} = ctx.params
    ctx.body = {
        title:'this is profile page',
        userName
    }
})

router.post('login',async (ctx,next)=>{
    const {userName,passWord} = ctx.request.body
    ctx.body = {
        userName,
        passWord
    }

})

module.exports = router
