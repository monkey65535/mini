const requireDirectory = require('require-directory')
const path = require('path')
const Router = require('koa-router')

class InitManager {
    static initCore(app) {
        // 入口方法
        this.app = app;
        this.loadConfig();
        this.loadHttpExceptions();
        this.initLoadRouters()
    }

    static initLoadRouters() {
        const apiDirectory = path.join(process.cwd(), '/app/api')
        // 加载全部路由
        requireDirectory(module, apiDirectory, {
            visit: router => {
                // 自动注册路由
                if (router instanceof Router) {
                    this.app.use(router.routes())
                }
            }
        });
    }
    static loadHttpExceptions() {
        const errors = require('./http-exception');
        global.errs = errors;
    }
    static loadConfig(path = '') {
        const configPath = path || `${process.cwd()}/config/config.js`
        const config = require(configPath)
        global.config = config
    }
}

module.exports = InitManager;