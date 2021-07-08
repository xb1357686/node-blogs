/**
 * @description 同步数据库
 */
const seq = require('./seq')

require('./model')

// 测试连接
seq.authenticate().then(()=>{
    console.log('ok')
}).catch(()=>{
    console.log('channel')
})
// {force:true} 覆盖
seq.sync().then(()=>{
    console.log('sync ok')
    process.exit()
})