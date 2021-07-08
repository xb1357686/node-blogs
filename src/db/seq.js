/**
 * @description Sequelize 实例
 */
const Sequelize = require('sequelize')
const {MYSQL_CONF:{host,user,password,database}} = require('../conf/db')
const {isProd,isTest} = require('../utils/env')


const config = {
    host,
    dialect:'mysql'
}

if(isTest){
    config.logging = ()=>{}
}

if(!isProd){
    config.pool= {
        max:5,
        min:0,
        idle:10000, //如果一个连接池10秒内没有被使用，就释放
    }
}

 
const seq = new Sequelize(database,user,password,config)

module.exports = seq


