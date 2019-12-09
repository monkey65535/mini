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
    define: {
        timestapmps: true, //设置为false后就不会创建createAt和updateAt字段了
        paranoid: true,
        createAt: 'create_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,       // 修改数据库字段驼峰命名为下划线式命名
        scopes: {
            bh: {
                attributes: {
                    exclude: ['create_at', 'updated_at', 'deleted_at']
                }
            }
        }
    }
})
// 定义自动创建数据表
sequelize.sync({
    force: false // 如果修改为true的话，修改了数据表的时候，会先将原表删除在重新创建，千万不要在生产环境使用！！！
});

module.exports = {
    sequelize
}