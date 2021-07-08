const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const index = require('./routes/index')
const users = require('./routes/users')
const {REDIS_CONF} = require('./conf/db')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
debugger
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// session配置
app.keys = ['UIsdf-234_555#k.ss']
app.use(session({
    key:'blog.sid',  // cookie name 
    prefix:'blog.sess:',  // redis key 的前缀
    cookie:{
        path:'/',
        httpOnly:true,
        maxAge:24*60*60*1000  //ms
    }, 
    // ttl:24*60*60*1000,   不写默认于maxAge 相同
    store:redisStore({
        all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
