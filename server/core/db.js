const Sequelize = require('sequelize')
const {
    host,
    user,
    password,
    port,
    dbName
} = global.config.database;

console.log(host, user, password, port, dbName);
const sequelize = new Sequelize(dbName, user, password, {
    dialect: "mysql",
    host,
    port,
    logging: true,
    timezone: "+08:00", // 设置时区
    define: {}
})
// 定义自动创建数据表
sequelize.sync();

module.exports = {
    sequelize
}