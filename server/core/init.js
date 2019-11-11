const requireDirectory = require('require-directory')
const path = require('path')
const Router = require('koa-router')

class InitManager {
    static initCore(app) {
        // 入口方法
        this.app = app;
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

}

module.exports = InitManager;