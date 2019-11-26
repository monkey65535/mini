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
    },
    wx: {
        appID: 'wx3a5c36291f3aac7f',
        appSecret: '251a6b6aafb05959d02f395c5a7dda96',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}