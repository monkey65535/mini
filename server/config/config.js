module.exports = {
    // 开发环境 dev 生产环境 prod
    environment: 'dev',
    appkey: "DJKng2Ln0ZgNItbt",
    database: {
        host: 'localhost',
        user: 'root',
        password: '123',
        port: '3306',
        dbName: 'island'
    },
    security: {
        secretKey: "1qaz@wsx",
        expiresIn: 60 * 60 * 24 * 30      // 过期时间 1个小时
    }
}